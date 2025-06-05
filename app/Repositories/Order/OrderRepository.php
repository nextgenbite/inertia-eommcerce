<?php

namespace App\Repositories\Order;

use App\Http\Resources\OrderCollection;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Order;
use App\Models\Unit;
use App\Repositories\Interfaces\Order\OrderInterface;
use App\Traits\ImageUploadTrait;

class OrderRepository implements OrderInterface
{
    use ImageUploadTrait;
    private $imagePath = 'uploads/order/';
    /**
     * Retrieve a category by its ID.
     */
    public function get(int $id): ?Order
    {
        return Order::find($id);
    }

    /**
     * Store a new category.
     */
    public function store($request): Order
    {
        // Assuming $request is a validated request with necessary data
        $data = $request->validated();

        // If a thumbnail file exists, handle the upload and add it to the data array
        if ($request->hasFile('thumbnail')) {
            $data['thumbnail'] = $this->uploadImage($request->file('thumbnail'), $this->imagePath, 300, 300);
        }

        // Create the Order and return the result
        return Order::create($data);
    }

    /**
     * Update an existing Order.
     */
    public function update(Order $data, $request): bool
    {
        $data = $request->validated();

        // If a thumbnail file exists, handle the upload and add it to the data array
        if ($request->hasFile('thumbnail') && !empty($request->hasFile('thumbnail'))) {
            $this->deleteImage($data->thumbnail);
            $data['thumbnail'] = $this->uploadImage($request->file('thumbnail'), $this->imagePath, 300, 300);
        }
        return $data->update($data);
    }

    /**
     * Delete a Order.
     */
    public function delete(Order $data): bool
    {
        $this->deleteImage($data->thumbnail);
        return $data->delete();
    }
    /**
     * Get paginated list of Orders with API Resources.
     */
    public function paginate(int $perPage = 10)
    {
        $data = Order::paginate($perPage);
        return new OrderCollection($data); // Return the API Resource Collection
    }

    public function baseData(): array
    {
        $title = ['Orders', 'order'];
        $columns = [
            // ['key' => 'thumbnail', 'label' => 'Thumbnail', 'path' => 'thumbnail', 'sort' => true],
            ['key' => 'invoice_no', 'label' => 'Invoice no.', 'path' => 'invoice_no', 'sort' => true],
            ['key' => 'created_at', 'label' => 'Created', 'path' => 'created_at', 'sort' => true],
            ['key' => 'updated_at', 'label' => 'Updated', 'path' => 'updated_at', 'sort' => true],
            ['key' => 'status', 'label' => 'Status', 'path' => 'status', 'sort' => true],
        ];

        $form = [
            ['key' => 'title', 'label' => 'Title', 'path' => 'title', 'type' => 'text'],
            // ['key' => 'category_id', 'label' => 'Category', 'path' => 'category_id', 'type' => 'select', 'class' => ' col-span-6', 'optionLabel' => 'title', 'optionValue' => 'id', 'options' => Category::select('id', 'title')->get()],
            ['key' => 'brand_id', 'label' => 'Brand', 'path' => 'brand_id', 'type' => 'select', 'class' => ' col-span-6', 'optionLabel' => 'title', 'optionValue' => 'id', 'options' => Brand::select('id', 'title')->get()],
            ['key' => 'weight', 'label' => 'Weight', 'path' => 'weight', 'type' => 'number', 'value' => '6', 'class' => ' col-span-6'],
            ['key' => 'unit_id', 'label' => 'Weight Unit', 'path' => 'unit_id', 'type' => 'select', 'class' => ' col-span-6', 'optionLabel' => 'title', 'optionValue' => 'id', 'options' => Unit::select('id', 'title')->get()],
            // ['key' => 'image', 'label' => 'Thumbnail', 'path' => 'thumbnail'],
            ['key' => 'description', 'label' => 'Description', 'path' => 'description', 'type' => 'textarea'],
            ['key' => 'status', 'label' => 'Status', 'path' => 'status', 'type' => 'select', 'optionLabel' => 'name', 'optionValue' => 'code', 'options' => [
                ['name' => 'Active', 'code' => '1'],
                ['name' => 'Deactive', 'code' => '0'],
            ]],
        ];

        return array('route' => 'orders', 'title' => $title, 'columns' => $columns, 'form' => $form);
    }
}
