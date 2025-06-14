<?php

namespace App\Repositories\Expense;

use App\Http\Resources\CategoryCollection;
use App\Models\Expense;
use App\Models\ExpenseCategory;
use App\Models\User;
use App\Models\Warehouse;
use App\Repositories\Interfaces\Expense\ExpenseInterface;
use App\Traits\ImageUploadTrait;

class ExpenseRepository implements ExpenseInterface
{
    use ImageUploadTrait;

    /**
     * Retrieve a category by its ID.
     */
    public function show(int $id): ?Expense
    {
        return Expense::find($id);
    }

    /**
     * Store a new category.
     */
    public function store($request): Expense
    {
        // Assuming $request is a validated request with necessary data
        $data = $request->validated();

        if ($request->hasFile('files')) {
            $files = [];
            $files = $this->storeFiles($request->file('files'), 'uploads/expense');
            $data['document'] = count($files) > 0 ? json_encode($files) : null;
        }

        // Prepare expense items

        $items = [];
        foreach ($request->name as $key => $name) {
            $items[] = [
                'name' => $name,
                'quantity' => $request->quantity[$key],
                'amount' => $request->amount[$key],
                'note' => $request->note[$key],
            ];
        }
        // Create the category and return the result
        return Expense::create($data);
    }

    /**
     * Update an existing category.
     */
    public function update(Expense $category, $request): bool
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
    public function delete(Expense $category): bool
    {
        $this->deleteImage($category->thumbnail);
        return $category->delete();
    }
    /**
     * Get paginated list of categories with API Resources.
     */
    public function paginate(int $perPage = 10)
    {
        $categories = Expense::paginate($perPage);
        return new CategoryCollection($categories); // Return the API Resource Collection
    }

    public function baseData(): array
    {
        $title = ['Expenses', 'Expense'];
        $columns = [
            ['key' => 'title', 'label' => 'Title', 'path' => 'title', 'sort' => true],
            ['key' => 'expenseCategory', 'label' => 'Category', 'path' => 'expense_category.title', 'sort' => true],
            ['key' => 'user', 'label' => 'Expense User', 'path' => 'user.name', 'sort' => true],
            ['key' => 'warehouse', 'label' => 'Warehouse', 'path' => 'warehouse.name', 'sort' => true],
            ['key' => 'total', 'label' => 'Total Price', 'path' => 'total', 'sort' => true],
            ['key' => 'date', 'label' => 'Date', 'path' => 'date', 'sort' => true],
        ];

        $form = [
            ['key' => 'expense_category_id', 'label' => 'Category', 'path' => 'expense_category_id', 'type' => 'select', 'class' => 'col-span-6', 'optionLabel' => 'title', 'optionValue' => 'id', 'options' => ExpenseCategory::all()],
            ['key' => 'date', 'label' => 'Date', 'path' => 'date', 'type' => 'date', 'class' => 'col-span-6'],
            ['key' => 'warehouse_id', 'label' => 'Warehouse', 'path' => 'warehouse_id', 'type' => 'select', 'class' => 'col-span-6', 'optionLabel' => 'name', 'optionValue' => 'id', 'options' => Warehouse::select('id', 'name')->get()],
            ['key' => 'user_id', 'label' => 'Expense User', 'path' => 'user_id', 'type' => 'select', 'class' => 'col-span-6', 'optionLabel' => 'name', 'optionValue' => 'id', 'options' => User::select('id', 'name')->get()],
            ['key' => 'title', 'label' => 'Title', 'path' => 'title', 'type' => 'text'],
            ['key' => 'attribute', 'label' => 'Attribute', 'path' => 'attribute', 'type' => 'attribute', 'items' => [['name' => '', 'quantity' => '', 'amount' => '']]],

            ['key' => 'file', 'label' => 'File', 'path' => 'file', 'type' => 'file'],
            ['key' => 'description', 'label' => 'Note', 'path' => 'description', 'type' => 'textarea'],

        ];
        $permissions = ['create' => 'product.create', 'read' => 'product.view', 'update' => 'product.edit', 'delete' => 'product.delete'];


        return [
            'route' => 'expense',
            'title' => $title,
            'columns' => $columns,
            'form' => $form,
            'modal_width' => '60rem',
            'permissions' => $permissions
        ];
    }
}
