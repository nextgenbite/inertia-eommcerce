<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Str;
use App\Models\Category;
use App\Models\Product;
use App\Traits\ImageUploadTrait;
use Illuminate\Http\UploadedFile;
use Haruncpi\LaravelIdGenerator\IdGenerator;

class JsonDataSeeder extends Seeder
{
    use ImageUploadTrait;
    /**
     * Run the database seeds.
     *
     * @return void
     */
public function run()
{
    $response = Http::get('https://dummyjson.com/products/categories');
    $data = $response->json();

    foreach ($data as $item) {
        $categoryName = is_array($item) ? ($item['name'] ?? $item[0] ?? '') : $item;

        $category = Category::firstOrCreate(
            ['title' => $categoryName],
            ['slug' => Str::slug($categoryName)]
        );

        // Generate 3 sub-categories per category
        for ($i = 1; $i <= 3; $i++) {
            $subCatTitle = "$categoryName Sub $i";

            $subCat = DB::table('sub_categories')->where('title', $subCatTitle)->first();
            if (!$subCat) {
                $subCatId = DB::table('sub_categories')->insertGetId([
                    'category_id' => $category->id,
                    'title' => $subCatTitle,
                    'slug' => Str::slug($subCatTitle),
                    'status' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            } else {
                $subCatId = $subCat->id;
            }

            // Generate 2 sub-sub-categories per sub-category
            for ($j = 1; $j <= 2; $j++) {
                $subSubCatTitle = "$subCatTitle SubSub $j";

                $exists = DB::table('sub_sub_categories')->where('title', $subSubCatTitle)->exists();
                if (!$exists) {
                    DB::table('sub_sub_categories')->insert([
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

    // Seed products
    $response = Http::get('https://dummyjson.com/products?limit=10');
    $data = $response->json();
    $products = $data['products'];

    foreach ($products as $item) {
        $productExists = Product::where('title', $item['title'])->exists();
        if ($productExists) {
            continue; // Skip duplicate
        }

        $thumbnailUrl = $item['thumbnail'];
        $smallImagePath = $this->storeImageFromUrl($thumbnailUrl, 'uploads/product', 500, 500);

        $category = Category::where('title', $item['category'])->first();
        if (!$category) {
            Log::error("Category not found: " . $item['category']);
            continue;
        }

        $subCategoryId = DB::table('sub_categories')
            ->where('category_id', $category->id)
            ->inRandomOrder()
            ->value('id');

        if (!$subCategoryId) {
            Log::error("No sub-category found for category: " . $category->title);
            continue;
        }

        $randomSku = IdGenerator::generate([
            'table' => 'products',
            'field' => 'sku',
            'length' => 6,
            'prefix' => 'PC'
        ]);

        $randomBarcode = IdGenerator::generate([
            'table' => 'products',
            'field' => 'barcode',
            'length' => 13,
            'prefix' => '25632490'
        ]);

        Product::create([
            'category_id' => $category->id,
            'sub_category_id' => $subCategoryId,
            'sku' => $randomSku,
            'barcode' => $randomBarcode,
            'title' => $item['title'],
            'price' => $item['price'],
            'discount_price' => ($item['price'] / 100) * $item['discountPercentage'],
            'description' => $item['description'],
            'thumbnail' => $smallImagePath,
        ]);
    }
}



    public function storeImageFromUrl($imageUrl, $destinationPath = 'images', $width, $height)
    {
        $client = new Client();

        try {
            $response = $client->get($imageUrl);
            $fileContents = $response->getBody()->getContents();
            $tempFilePath = sys_get_temp_dir() . '/' . Str::random(40);
            file_put_contents($tempFilePath, $fileContents);

            $uploadedFile = new UploadedFile(
                $tempFilePath,
                basename($imageUrl),
                mime_content_type($tempFilePath),
                null,
                true
            );

            $filePath =  $this->uploadImage($uploadedFile, $destinationPath, $width, $height);

            unlink($tempFilePath);

            return $filePath;
        } catch (RequestException $e) {
            // Handle request exception
            // For example, you can log the error or return null
            Log::error($e->getMessage());
            return null;
        }
    }
}
