<?php

namespace App\Repositories\Product;

use App\Http\Resources\SubCategoryCollection;
use App\Models\Category;
use App\Models\SubCategory;
use App\Repositories\Interfaces\Product\SubCategoryInterface;
use App\Traits\ImageUploadTrait;
use Illuminate\Support\Str;

class SubCategoryRepository implements SubCategoryInterface
{
    use ImageUploadTrait;
    private $imagePath = 'uploads/category';
    /**
     * Retrieve a sub-category by its ID.
     */
    public function get(int $id): ?SubCategory
    {
        return SubCategory::find($id);
    }

    /**
     * Store a new sub-category.
     */
    public function store($request): SubCategory
    {
        if ($request->thumbnail && $request->thumbnail !== null) {
            $thumbnail = $this->uploadImage($request->file('thumbnail'), $this->imagePath, 300, 300);
        }
        return SubCategory::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'category_id' => $request->category_id,
            'thumbnail' => $thumbnail ?? null,

            // 'status' => $request->status,
        ]);
    }

    /**
     * Update an existing sub-category.
     */
    public function update(SubCategory $subCategory, $request): bool
    {
        if ($request->hasFile('thumbnail')) {
            $this->deleteImage($subCategory->thumbnail);
            $thumbnail = $this->uploadImage($request->file('thumbnail'), $this->imagePath, 300, 300);
        }

        return $subCategory->update([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'category_id' => $request->category_id,
            'thumbnail' => $thumbnail ?? $subCategory->thumbnail,

            // 'status' => $request->status,
        ]);
    }

    /**
     * Delete a sub-category.
     */
    public function delete(SubCategory $subCategory): bool
    {
        $this->deleteImage($subCategory->thumbnail);
        return $subCategory->delete();
    }

    /**
     * Get paginated list of sub-categories with API Resources.
     */
    public function paginate(int $perPage = 10)
    {
        $subCategories = SubCategory::paginate($perPage);
        return new SubCategoryCollection($subCategories);
    }

    public function baseData(): array
    {
        $title = ['Sub Categories', 'sub_category'];
        $columns = [
            ['key' => 'image', 'label' => 'Thumbnail', 'path' => 'thumbnail', 'sort' => true],
            ['key' => 'title', 'label' => 'Title', 'path' => 'title', 'sort' => true],
            ['key' => 'category', 'label' => 'Category', 'path' => 'category.title', 'sort' => true],
            ['key' => 'created_date', 'label' => 'Created', 'path' => 'created_date', 'sort' => true],
            ['key' => 'updated_date', 'label' => 'Updated', 'path' => 'updated_date', 'sort' => true],
            ['key' => 'status', 'label' => 'Status', 'path' => 'status', 'sort' => true],
            // Add more columns as needed
        ];

        $form = [
            ['key' => 'title', 'label' => 'Title', 'path' => 'title', 'type' => 'text'],
            ['key' => 'category_id', 'label' => 'Category', 'path' => 'category_id', 'type' => 'select', 'class' => ' col-span-6', 'optionLabel' => 'title', 'optionValue' => 'id', 'options' => Category::select('id', 'title', 'created_at', 'updated_at')->get()],
            ['key' => 'thumbnail', 'label' => 'Thumbnail', 'type' => 'image', 'path' => 'thumbnail'],
            ['key' => 'description', 'label' => 'Description', 'path' => 'description', 'type' => 'textarea'],
            ['key' => 'status', 'label' => 'Status', 'path' => 'status', 'type' => 'select', 'optionLabel' => 'name', 'optionValue' => 'code',  'options' => [
                ['name' => 'Active', 'code' => '1'],
                ['name' => 'Deactive', 'code' => '0'],
            ]],
            // Add more columns as needed
        ];
     $permissions = [
            'create' => 'sub_category.create',
            'read' => 'sub_category.read',
            'update' => 'sub_category.update',
            'delete' => 'sub_category.delete'
        ];
        return array('route' => 'sub_categories', 'title' => $title, 'columns' => $columns, 'form' => $form, 'permissions' => $permissions);
    }
}
