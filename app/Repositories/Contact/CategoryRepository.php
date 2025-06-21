<?php

namespace App\Repositories\Contact;

use App\Http\Resources\CategoryCollection;
use App\Models\Category;
use App\Repositories\Interfaces\Expense\CategoryInterface;
use App\Traits\ImageUploadTrait;

class CategoryRepository implements CategoryInterface
{
    use ImageUploadTrait;

    /**
     * Retrieve a category by its ID.
     */
    public function get(int $id): ?Category
    {
        return Category::find($id);
    }

    /**
     * Store a new category.
     */
    public function store($request): Category
    {
        // Assuming $request is a validated request with necessary data
        $data = $request->validated();

        // If a thumbnail file exists, handle the upload and add it to the data array
        if ($request->hasFile('thumbnail')) {
            $data['thumbnail'] = $this->uploadImage($request->file('thumbnail'), 'uploads/categories', 300, 300);
        }

        // Create the category and return the result
        return Category::create($data);
    }

    /**
     * Update an existing category.
     */
    public function update(Category $category, $request): bool
    {
        $data = $request->validated();

        // If a thumbnail file exists, handle the upload and add it to the data array
        if ($request->hasFile('thumbnail') && !empty($request->hasFile('thumbnail'))) {
            $this->deleteImage($category->thumbnail);
            $data['thumbnail'] = $this->uploadImage($request->file('thumbnail'), 'uploads/categories', 300, 300);
        }
        return $category->update($data);
    }

    /**
     * Delete a category.
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
         $title = ['Expense Categories', 'Expense Category'];
        $columns = [
            ['key' => 'title', 'label' => 'Title', 'path' => 'title', 'sort' => true],
            ['key' => 'created_at', 'label' => 'Created', 'path' => 'created_at', 'sort' => true],
            ['key' => 'updated_at', 'label' => 'Updated', 'path' => 'updated_at', 'sort' => true],
            ['key' => 'status', 'label' => 'Status', 'path' => 'status', 'sort' => true],
            // Add more columns as needed
        ];

        $form = [
            ['key' => 'title', 'label' => 'Title', 'path' => 'title', 'type' => 'text'],
            ['key' => 'description', 'label' => 'Description', 'path' => 'description', 'type' => 'textarea'],
            ['key' => 'status', 'label' => 'Status', 'path' => 'status', 'type' => 'select', 'options' => [
                ['name' => 'Active', 'code' => '1'],
                ['name' => 'Deactive', 'code' => '0'],
            ]],

            // Add more columns as needed
        ];

        return array( 'route'=> 'categories', 'title'=>$title,'columns'=>$columns,'form'=> $form);
    }
}
