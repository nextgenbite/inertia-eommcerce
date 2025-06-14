<?php

namespace App\Repositories\Product;

use App\Http\Resources\CategoryCollection;
use App\Models\Category;
use App\Repositories\Interfaces\Product\CategoryInterface;
use App\Traits\ImageUploadTrait;
use Illuminate\Support\Str;
class CategoryRepository implements CategoryInterface
{
    use ImageUploadTrait;
    private $imagePath = 'uploads/category';

    /**
     * Retrieve a category by its ID.
     */
    public function get(int $id): ?Category
    {
        return Category::find($id);
    }

    /**
     * Store a new Category.
     */
    public function store($request): Category
    {
        if ($request->thumbnail && $request->thumbnail !== null) {
            $thumbnail = $this->uploadImage($request->file('thumbnail'), $this->imagePath, 300, 300);
        }
        return Category::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'thumbnail' => $thumbnail ?? null,

            // 'status' => $request->status,
        ]);
    }

    /**
     * Update an existing Category.
     */
    public function update(Category $category, $request): bool
    {
        if ($request->hasFile('thumbnail')) {
            $this->deleteImage($category->thumbnail);
            $thumbnail = $this->uploadImage($request->file('thumbnail'), $this->imagePath, 300, 300);
        }

        return $category->update([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'thumbnail' => $thumbnail ?? $category->thumbnail,

            // 'status' => $request->status,
        ]);
    }

    /**
     * Delete a Category.
     */
    public function delete(Category $category): bool
    {
        $this->deleteImage($category->thumbnail);
        return $category->delete();
    }
    /**
     * Get paginated list of categories with API Resources.
     */
    public function paginate(int $perPage = 10)
    {
        $categories = Category::paginate($perPage);
        return new CategoryCollection($categories); // Return the API Resource Collection
    }

    public function baseData(): array
    {
        $title = ['Categories', 'category'];
        $columns = [
            ['key' => 'image', 'label' => 'Thumbnail', 'path' => 'thumbnail', 'sort' => true],
            ['key' => 'title', 'label' => 'Title', 'path' => 'title', 'sort' => true],
            ['key' => 'created_date', 'label' => 'Created', 'path' => 'created_date', 'sort' => true],
            ['key' => 'updated_date', 'label' => 'Updated', 'path' => 'updated_date', 'sort' => true],
            ['key' => 'status', 'label' => 'Status', 'path' => 'status', 'sort' => true],
            // Add more columns as needed
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
            'create' => 'category.create',
            'read' => 'category.read',
            'update' => 'category.update',
            'delete' => 'category.delete'
        ];
        return array('route' => 'categories', 'title' => $title, 'columns' => $columns, 'form' => $form, 'permissions' => $permissions);
    }
}
