<?php

namespace App\Repositories\Warehouse;

use App\Http\Resources\WarehouseCollection;
use App\Models\Warehouse;
use App\Repositories\Interfaces\Warehouse\WarehouseInterface;
use Illuminate\Support\Str;

class WarehouseRepository implements WarehouseInterface
{
    /**
     * Retrieve a warehouse by its ID.
     */
    public function get(int $id): ?Warehouse
    {
        return Warehouse::find($id);
    }

    /**
     * Store a new warehouse.
     */
    public function store($request): Warehouse
    {
        return Warehouse::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'status' => $request->status,
        ]);
    }

    /**
     * Update an existing warehouse.
     */
    public function update(Warehouse $warehouse, $request): bool
    {
        return $warehouse->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'status' => $request->status,
        ]);
    }

    /**
     * Delete a warehouse.
     */
    public function delete(Warehouse $warehouse): bool
    {
        return $warehouse->delete();
    }

    /**
     * Get paginated list of warehouses with API Resources.
     */
    public function paginate(int $perPage = 10)
    {
        $warehouses = Warehouse::paginate($perPage);
        return new WarehouseCollection($warehouses);
    }

    public function baseData(): array
    {
        $title = ['Warehouses', 'warehouse'];
        $columns = [
            ['key' => 'name', 'label' => 'Branch Name', 'path' => 'name', 'sort' => true],
            ['key' => 'address', 'label' => 'Address', 'path' => 'address', 'sort' => true],
            ['key' => 'created_date', 'label' => 'Created', 'path' => 'created_date', 'sort' => true],
            ['key' => 'updated_date', 'label' => 'Updated', 'path' => 'updated_date', 'sort' => true],
            ['key' => 'status', 'label' => 'Status', 'path' => 'status', 'sort' => true],
        ];

        $form = [
            ['key' => 'name', 'label' => 'Branch Name', 'path' => 'name', 'type' => 'text'],
            ['key' => 'email', 'label' => 'Branch Email', 'path' => 'email', 'type' => 'email'],
            ['key' => 'phone', 'label' => 'Branch Phone', 'path' => 'phone', 'type' => 'tel'],
            ['key' => 'address', 'label' => 'address', 'path' => 'address', 'type' => 'text'],
            ['key' => 'status', 'label' => 'Status', 'path' => 'status', 'type' => 'select', 'optionLabel' => 'name', 'optionValue' => 'code',  'options' => [
                ['name' => 'Active', 'code' => '1'],
                ['name' => 'Deactive', 'code' => '0'],
            ]],
        ];
        $permissions = [
            'create' => 'warehouse.create',
            'read' => 'warehouse.read',
            'update' => 'warehouse.update',
            'delete' => 'warehouse.delete'
        ];
        return array('route' => 'warehouses', 'title' => $title, 'columns' => $columns, 'form' => $form, 'permissions' => $permissions);
    }
}
