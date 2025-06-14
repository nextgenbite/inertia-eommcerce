<?php

namespace App\Repositories\Product;

use App\Http\Resources\BrandCollection;
use App\Models\Brand;
use App\Repositories\Interfaces\Product\BrandInterface;
use App\Traits\ImageUploadTrait;
use Illuminate\Support\Str;


class BrandRepository implements BrandInterface
{
    use ImageUploadTrait;
    private $imagePath = 'uploads/brand';


    /**
     * Retrieve a brand by its ID.
     */
    public function get(int $id): ?Brand
    {
        return Brand::find($id);
    }

    /**
     * Store a new brand.
     */
    public function store($request): Brand
    {
        if ($request->thumbnail && $request->thumbnail !== null) {
            $thumbnail = $this->uploadImage($request->file('thumbnail'), $this->imagePath, 300, 300);
        }
        return Brand::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'thumbnail' => $thumbnail ?? null,

            // 'status' => $request->status,
        ]);
    }

    /**
     * Update an existing brand.
     */
    public function update(Brand $brand, $request): bool
    {
        if ($request->hasFile('thumbnail')) {
            $this->deleteImage($brand->thumbnail);
            $thumbnail = $this->uploadImage($request->file('thumbnail'), $this->imagePath, 300, 300);
        }

        return $brand->update([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'thumbnail' => $thumbnail ?? $brand->thumbnail,

            // 'status' => $request->status,
        ]);
    }

    /**
     * Delete a brand.
     */
    public function delete(Brand $brand): bool
    {
        $this->deleteImage($brand->thumbnail);
        return $brand->delete();
    }

    /**
     * Get paginated list of brands with API Resources.
     */
    public function paginate(int $perPage = 10)
    {
        $brands = Brand::paginate($perPage);
        return new BrandCollection($brands);
    }

    public function baseData(): array
    {
        $title = ['Brands', 'brand'];
        $columns = [
            ['key' => 'image', 'label' => 'Thumbnail', 'path' => 'thumbnail', 'sort' => true],
            ['key' => 'title', 'label' => 'Title', 'path' => 'title', 'sort' => true],
            ['key' => 'created_date', 'label' => 'Created', 'path' => 'created_date', 'sort' => true],
            ['key' => 'updated_date', 'label' => 'Updated', 'path' => 'updated_date', 'sort' => true],
            ['key' => 'status', 'label' => 'Status', 'path' => 'status', 'sort' => true],
        ];

        $form = [
            ['key' => 'title', 'label' => 'Title', 'path' => 'title', 'type' => 'text'],
            ['key' => 'thumbnail', 'label' => 'Thumbnail', 'type' => 'image', 'path' => 'thumbnail'],
            ['key' => 'description', 'label' => 'Description', 'path' => 'description', 'type' => 'textarea'],
            ['key' => 'status', 'label' => 'Status', 'path' => 'status', 'type' => 'select', 'optionLabel' => 'name', 'optionValue' => 'code',  'options' => [
                ['name' => 'Active', 'code' => '1'],
                ['name' => 'Deactive', 'code' => '0'],
            ]],
        ];
     $permissions = [
            'create' => 'brand.create',
            'read' => 'brand.read',
            'update' => 'brand.update',
            'delete' => 'brand.delete'
        ];
        return array('route' => 'brands', 'title' => $title, 'columns' => $columns, 'form' => $form, 'permissions' => $permissions);
    }
}
