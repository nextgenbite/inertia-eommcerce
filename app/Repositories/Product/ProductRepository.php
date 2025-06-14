<?php

namespace App\Repositories\Product;

use App\Http\Resources\ProductCollection;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\Unit;
use App\Repositories\Interfaces\Product\ProductInterface;
use App\Traits\ImageUploadTrait;
use Illuminate\Support\Str;

class ProductRepository implements ProductInterface
{
    use ImageUploadTrait;
    private $imagePath = 'uploads/product/';
    /**
     * Retrieve a category by its ID.
     */
    public function get(int $id): ?Product
    {
        return Product::find($id);
    }

    /**
     * Store a new category.
     */
    public function store($request): Product
    {
        if ($request->thumbnail && $request->thumbnail !== null) {
            $thumbnail = $this->uploadImage($request->file('thumbnail'), $this->imagePath, 300, 300);
        }
        return Product::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'category_id' => $request->category_id,
            'sub_category_id' => $request->sub_category_id,
            'sub_sub_category_id' => $request->sub_sub_category_id,
            'brand_id' => $request->brand_id,
            'unit_id' => $request->unit_id,
            'sku' => $request->sku,
            'barcode' => $request->barcode,
            'weight' => $request->weight,
            'thumbnail' => $thumbnail ?? null,
            'description' => $request->description,
            'buying_date' => $request->buying_date,
            'expire_date' => $request->expire_date,
            'buying_price' => $request->buying_price,
            'discount_price' => $request->discount_price,
            'price' => $request->price,
            'status' => $request->status,

            // 'status' => $request->status,
        ]);
    }

    /**
     * Update an existing Product.
     */
    public function update(Product $product, $request): bool
    {
        if ($request->hasFile('thumbnail')) {
            $this->deleteImage($product->thumbnail);
            $thumbnail = $this->uploadImage($request->file('thumbnail'), $this->imagePath, 300, 300);
        }

        return $product->update([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'category_id' => $request->category_id,
            'sub_category_id' => $request->sub_category_id,
            'sub_sub_category_id' => $request->sub_sub_category_id,
            'brand_id' => $request->brand_id,
            'unit_id' => $request->unit_id,
            'sku' => $request->sku,
            'barcode' => $request->barcode,
            'weight' => $request->weight,
            'thumbnail' => $thumbnail ?? $product->thumbnail,
            'description' => $request->description,
            'buying_date' => $request->buying_date,
            'expire_date' => $request->expire_date,
            'buying_price' => $request->buying_price,
            'discount_price' => $request->discount_price,
            'price' => $request->price,
            'status' => $request->status,
        ]);
    }

    /**
     * Delete a Product.
     */
    public function delete(Product $data): bool
    {
        $this->deleteImage($data->thumbnail);
        return $data->delete();
    }
    /**
     * Get paginated list of products with API Resources.
     */
    public function paginate(int $perPage = 10)
    {
        $data = Product::paginate($perPage);
        return new ProductCollection($data); // Return the API Resource Collection
    }

    public function baseData(): array
    {
        $title = ['Products', 'product'];
        $columns = [
            ['key' => 'image', 'label' => 'Thumbnail', 'path' => 'thumbnail', 'sort' => true],
            ['key' => 'title', 'label' => 'Title', 'path' => 'title', 'sort' => true],
            ['key' => 'category', 'label' => 'Category', 'path' => 'category.title', 'sort' => true],

            // ['key' => 'created_date', 'label' => 'Created', 'path' => 'created_date', 'sort' => true],
            // ['key' => 'updated_date', 'label' => 'Updated', 'path' => 'updated_date', 'sort' => true],
            ['key' => 'status', 'label' => 'Status', 'path' => 'status', 'sort' => true],
        ];

        $form = [
            ['key' => 'title', 'label' => 'Title', 'path' => 'title', 'type' => 'text'],
            ['key' => 'category_id', 'label' => 'Category', 'path' => 'category_id', 'type' => 'select', 'class' => ' col-span-6', 'optionLabel' => 'title', 'optionValue' => 'id', 'options' => Category::select('id', 'title', 'created_at', 'updated_at')->get()],
            ['key' => 'brand_id', 'label' => 'Brand', 'path' => 'brand_id', 'type' => 'select', 'class' => ' col-span-6', 'optionLabel' => 'title', 'optionValue' => 'id', 'options' => Brand::select('id', 'title')->get()],
            ['key' => 'weight', 'label' => 'Weight', 'path' => 'weight', 'type' => 'number', 'value' => '6', 'class' => ' col-span-6'],
            ['key' => 'unit_id', 'label' => 'Weight Unit', 'path' => 'unit_id', 'type' => 'select', 'class' => ' col-span-6', 'optionLabel' => 'title', 'optionValue' => 'id', 'options' => Unit::select('id', 'title')->get()],
            ['key' => 'thumbnail', 'label' => 'Thumbnail', 'type' => 'image', 'path' => 'thumbnail'],
            ['key' => 'description', 'label' => 'Description', 'path' => 'description', 'type' => 'textarea'],
            ['key' => 'status', 'label' => 'Status', 'path' => 'status', 'type' => 'select', 'optionLabel' => 'name', 'optionValue' => 'code', 'options' => [
                ['name' => 'Active', 'code' => '1'],
                ['name' => 'Deactive', 'code' => '0'],
            ]],
        ];

        $permissions = [
            'create' => 'product.create',
            'read' => 'product.read',
            'update' => 'product.update',
            'delete' => 'product.delete'
        ];

        return array('route' => 'products', 'title' => $title, 'columns' => $columns, 'form' => $form, 'permissions' => $permissions);
    }
}
