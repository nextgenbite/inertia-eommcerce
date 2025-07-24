<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductAttributeImage;
use App\Models\ProductVariant;
use App\Models\VariantAttributeValue;
use App\Models\Attribute;
use App\Models\AttributeValue;
use App\Models\Brand;
use App\Traits\ImageUploadTrait;
use Illuminate\Http\UploadedFile;
use Haruncpi\LaravelIdGenerator\IdGenerator;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

class JsonDataSeeder extends Seeder
{
    use ImageUploadTrait;

    public function run()
    {
        // Dummy Attributes
        $color = Attribute::firstOrCreate(['name' => 'Color', 'tenant_id'=> 1]);
        $size = Attribute::firstOrCreate(['name' => 'Size', 'tenant_id'=> 1]);

        $colors = ['Red', 'Blue', 'Green'];
        $sizes = ['S', 'M', 'L'];

        $colorValues = collect($colors)->map(function ($val) use ($color) {
            return AttributeValue::firstOrCreate([
                'tenant_id'=> 1,
                'attribute_id' => $color->id,
                'value' => $val
            ]);
        });

        $sizeValues = collect($sizes)->map(function ($val) use ($size) {
            return AttributeValue::firstOrCreate([
                'tenant_id'=> 1,
                'attribute_id' => $size->id,
                'value' => $val
            ]);
        });

        $response = Http::get('https://dummyjson.com/products/categories');
        $data = $response->json();

        foreach ($data as $item) {
            $categoryName = is_array($item) ? ($item['name'] ?? $item[0] ?? '') : $item;


            $category = Category::firstOrCreate(
                [
                    'tenant_id' => 'tenant1',
                    'title' => $categoryName,
                    'slug' => Str::slug($categoryName)
                ]
            );
            for ($i = 1; $i <= 2; $i++) {
                $subCatTitle = "$categoryName Sub $i";
                $subCat = DB::table('sub_categories')->where('title', $subCatTitle)->first();
                if (!$subCat) {
                    $subCatId = DB::table('sub_categories')->insertGetId([
                        'tenant_id'=> 1,
                        'category_id' => $category->id,
                        'title'       => $subCatTitle,
                        'slug'        => Str::slug($subCatTitle),
                        'status'      => true,
                        'created_at'  => now(),
                        'updated_at'  => now(),
                    ]);
                } else {
                    $subCatId = $subCat->id;
                }


                for ($j = 1; $j <= 2; $j++) {
                    $subSubCatTitle = "$subCatTitle SubSub $j";
                    $subSubCat = DB::table('sub_sub_categories')->where('title', $subCatTitle)->first();
                    if ($subSubCat) {
                        DB::table('sub_sub_categories')->insert([
                            'tenant_id'=> 1,
                            'sub_category_id' => $subCatId,
                            'title' => $subSubCatTitle,
                            'slug' => Str::slug($subSubCatTitle),
                            'status' => true,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ]);
                    }
                }
            }
        }

        $response = Http::get('https://dummyjson.com/products?limit=100');
        $products = $response['products'];

        foreach ($products as $item) {
if (isset($item['brand'])) {
    $brand = Brand::firstOrCreate(
      ['tenant_id' => 'tenant1', 'title' => $item['brand']],
    ['slug' => Str::slug($item['brand'])]
    );
}
            if (Product::where('title', $item['title'])->exists()) continue;

            $thumbnail = $this->storeImageFromUrl($item['thumbnail'], 'uploads/product', 500, 500);
            $images = collect($item['images'] ?? [])->map(fn($img) => $this->storeImageFromUrl($img, 'uploads/product', 500, 500))->toArray();

            $category = Category::where('title', $item['category'])->first();
            if (!$category) continue;

            $subCategoryId = DB::table('sub_categories')
                ->where('category_id', $category->id)
                ->inRandomOrder()
                ->value('id');

            $sku = IdGenerator::generate([
                'table' => 'products',
                'field' => 'sku',
                'length' => 15,
                'prefix' => 'PC-' . now()->format('Ymd') . '-',
                'reset_on_prefix_change' => true
            ]);

            do {
                $code12 = str_pad(mt_rand(0, 999999999999), 12, '0', STR_PAD_LEFT);
                $checkDigit = $this->calculateEAN13CheckDigit($code12);
                $barcode = $code12 . $checkDigit;
            } while (Product::where('barcode', $barcode)->exists());

            $product = Product::create([
                'tenant_id' => 'tenant1',
                'category_id' => $category->id,
                'sub_category_id' => $subCategoryId,
                'brand_id' => $brand->id,
                'sku' => $sku,
                'barcode' => $barcode,
                'title' => $item['title'],
                'slug' => Str::slug($item['title']),
                'price' => $item['price'],
                'discount_price' => ($item['price'] * $item['discountPercentage']) / 100,
                'description' => $item['description'],
                'thumbnail' => $thumbnail,
                'images' => json_encode($images),
                'has_variants'=> true
            ]);

            $variant = ProductVariant::create([
                'tenant_id' => 'tenant1',
                'product_id' => $product->id,
                'sku' => $sku . '-V',
                'price' => $item['price'],
                'quantity' => $item['stock'] ?? 0,
            ]);

            $valueId = $colorValues->random()->id;
            VariantAttributeValue::create([
                'tenant_id' => 'tenant1',
                'product_variant_id' => $variant->id,
                'attribute_value_id' => $valueId,
            ]);
            $sizeValueId = $sizeValues->random()->id;
            VariantAttributeValue::create([
                'tenant_id' => 'tenant1',
                'product_variant_id' => $variant->id,
                'attribute_value_id' => $sizeValueId,
            ]);

            ProductAttributeImage::create([
                'tenant_id' => 'tenant1',
                'product_id' => $product->id,
                'attribute_value_id' => $sizeValueId,
                'image_path' => $thumbnail,
            ]);
        }
    }

    public function storeImageFromUrl($imageUrl, $destinationPath = 'images', $width, $height)
    {
        $client = new Client();
        try {
            $response = $client->get($imageUrl);
            $tempPath = sys_get_temp_dir() . '/' . Str::random(40);
            file_put_contents($tempPath, $response->getBody()->getContents());

            $uploadedFile = new UploadedFile($tempPath, basename($imageUrl), mime_content_type($tempPath), null, true);
            $storedPath = $this->uploadImage($uploadedFile, $destinationPath, $width, $height);
            unlink($tempPath);

            return $storedPath;
        } catch (RequestException $e) {
            Log::error($e->getMessage());
            return null;
        }
    }

    private function calculateEAN13CheckDigit(string $code12): string
    {
        $sum = 0;
        for ($i = 0; $i < 12; $i++) {
            $digit = (int) $code12[$i];
            $sum += ($i % 2 === 0) ? $digit : $digit * 3;
        }
        return (string)((10 - ($sum % 10)) % 10);
    }
}
