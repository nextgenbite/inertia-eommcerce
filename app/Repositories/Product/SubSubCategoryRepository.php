<?php

namespace App\Repositories\Product;

use App\Http\Resources\SubSubCategoryCollection;
use App\Models\Category;
use App\Models\SubSubCategory;
use App\Repositories\Interfaces\Product\SubSubCategoryInterface;
use App\Traits\ImageUploadTrait;
use Illuminate\Support\Str;


class SubSubCategoryRepository implements SubSubCategoryInterface
{
    use ImageUploadTrait;
    private $imagePath = 'uploads/category';


    /**
     * Retrieve a sub-sub-category by its ID.
     */
    public function get(int $id): ?SubSubCategory
    {
        return SubSubCategory::find($id);
    }

    /**
     * Store a new sub-sub-category.
     */
    public function store($request): SubSubCategory
    {
        if ($request->thumbnail && $request->thumbnail !== null) {
            $thumbnail = $this->uploadImage($request->file('thumbnail'), $this->imagePath, 300, 300);
        }
        return SubSubCategory::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'category_id' => $request->category_id,
            'sub_category_id' => $request->sub_category_id,
            'thumbnail' => $thumbnail ?? null,

            // 'status' => $request->status,
        ]);
    }

    /**
     * Update an existing sub-sub-category.
     */
    public function update(SubSubCategory $subSubCategory, $request): bool
    {
   if ($request->hasFile('thumbnail')) {
            $this->deleteImage($subSubCategory->thumbnail);
            $thumbnail = $this->uploadImage($request->file('thumbnail'), $this->imagePath, 300, 300);
        }

        return $subSubCategory->update([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'sub_category_id' => $request->sub_category_id,
            'thumbnail' => $thumbnail ?? $subSubCategory->thumbnail,

            // 'status' => $request->status,
        ]);
    }

    /**
     * Delete a sub-sub-category.
     */
    public function delete(SubSubCategory $subSubCategory): bool
    {
        $this->deleteImage($subSubCategory->thumbnail);
        return $subSubCategory->delete();
    }

    /**
     * Get paginated list of sub-sub-categories with API Resources.
     */
    public function paginate(int $perPage = 10)
    {
        $subSubCategories = SubSubCategory::paginate($perPage);
        return new SubSubCategoryCollection($subSubCategories);
    }

    public function baseData(): array
    {
        $title = ['Sub Sub Categories', 'sub_sub_category'];
        $columns = [
            ['key' => 'image', 'label' => 'Thumbnail', 'path' => 'thumbnail', 'sort' => true],
            ['key' => 'title', 'label' => 'Title', 'path' => 'title', 'sort' => true],
            ['key' => 'category', 'label' => 'Category', 'path' => 'sub_category.category.title', 'sort' => true],
            ['key' => 'sub_category', 'label' => 'Sub Category', 'path' => 'sub_category.title', 'sort' => true],
            ['key' => 'created_date', 'label' => 'Created', 'path' => 'created_date', 'sort' => true],
            ['key' => 'updated_date', 'label' => 'Updated', 'path' => 'updated_date', 'sort' => true],
            ['key' => 'status', 'label' => 'Status', 'path' => 'status', 'sort' => true],
            // Add more columns as needed
        ];

        $form = [
            ['key' => 'title', 'label' => 'Title', 'path' => 'title', 'type' => 'text'],
            // ['key' => 'category_id', 'label' => 'Category', 'path' => 'category_id', 'type' => 'select', 'class' => ' lg:col-span-6', 'optionLabel' => 'title', 'optionValue' => 'id', 'options' => Category::select('id', 'title')->get()],
            ['key' => 'sub_category_id', 'label' => 'Sub Category', 'path' => 'sub_category_id', 'type' => 'select', 'class' => ' lg:col-span-6', 'optionLabel' => 'title', 'optionValue' => 'id', 'options' => \App\Models\SubCategory::select('id', 'title')->get()],
            ['key' => 'thumbnail', 'label' => 'Thumbnail', 'type' => 'image', 'path' => 'thumbnail', 'class' => ' lg:col-span-6'],
            ['key' => 'description', 'label' => 'Description', 'path' => 'description', 'type' => 'textarea'],
            ['key' => 'status', 'label' => 'Status', 'path' => 'status', 'type' => 'select', 'optionLabel' => 'name', 'optionValue' => 'code',  'options' => [
                ['name' => 'Active', 'code' => '1'],
                ['name' => 'Deactive', 'code' => '0'],
            ]],
            // Add more columns as needed
        ];

           $permissions = [
            'create' => 'sub_sub_category.create',
            'read' => 'sub_sub_category.read',
            'update' => 'sub_sub_category.update',
            'delete' => 'sub_sub_category.delete'
        ];
        return array('route' => 'sub_sub_categories', 'title' => $title, 'columns' => $columns, 'form' => $form, 'permissions' => $permissions);
    }
}
