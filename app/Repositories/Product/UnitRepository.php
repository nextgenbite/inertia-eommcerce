<?php

namespace App\Repositories\Product;

use App\Http\Resources\UnitCollection;
use App\Models\Unit;
use App\Repositories\Interfaces\Product\UnitInterface;
use App\Traits\ImageUploadTrait;

class UnitRepository implements UnitInterface
{
    use ImageUploadTrait;

    /**
     * Retrieve a unit by its ID.
     */
    public function get(int $id): ?Unit
    {
        return Unit::find($id);
    }

    /**
     * Store a new unit.
     */
    public function store($request): Unit
    {
        $data = $request->validated();

        if ($request->hasFile('thumbnail')) {
            $data['thumbnail'] = $this->uploadImage($request->file('thumbnail'), 'uploads/units', 300, 300);
        }

        return Unit::create($data);
    }

    /**
     * Update an existing unit.
     */
    public function update(Unit $unit, $request): bool
    {
        $data = $request->validated();

        if ($request->hasFile('thumbnail') && !empty($request->hasFile('thumbnail'))) {
            $this->deleteImage($unit->thumbnail);
            $data['thumbnail'] = $this->uploadImage($request->file('thumbnail'), 'uploads/units', 300, 300);
        }
        return $unit->update($data);
    }

    /**
     * Delete a unit.
     */
    public function delete(Unit $unit): bool
    {
        $this->deleteImage($unit->thumbnail);
        return $unit->delete();
    }

    /**
     * Get paginated list of units with API Resources.
     */
    public function paginate(int $perPage = 10)
    {
        $units = Unit::paginate($perPage);
        return new UnitCollection($units);
    }

    public function baseData(): array
    {
        $title = ['Units', 'unit'];
        $columns = [
            ['key' => 'image', 'label' => 'Thumbnail', 'path' => 'thumbnail', 'sort' => true],
            ['key' => 'title', 'label' => 'Title', 'path' => 'title', 'sort' => true],
            ['key' => 'created_date', 'label' => 'Created', 'path' => 'created_date', 'sort' => true],
            ['key' => 'updated_date', 'label' => 'Updated', 'path' => 'updated_date', 'sort' => true],
            ['key' => 'status', 'label' => 'Status', 'path' => 'status', 'sort' => true],
        ];

        $form = [
            ['key' => 'title', 'label' => 'Title', 'path' => 'title', 'type' => 'text'],
            ['key' => 'image', 'label' => 'Thumbnail', 'path' => 'thumbnail'],
            ['key' => 'description', 'label' => 'Description', 'path' => 'description', 'type' => 'textarea'],
            ['key' => 'status', 'label' => 'Status', 'path' => 'status', 'type' => 'select', 'optionLabel'=> 'name','optionValue'=> 'code',  'options' => [
                ['name' => 'Active', 'code' => '1'],
                ['name' => 'Deactive', 'code' => '0'],
            ]],
        ];
     $permissions = [
            'create' => 'unit.create',
            'read' => 'unit.read',
            'update' => 'unit.update',
            'delete' => 'unit.delete'
        ];
        return array('route'=> 'units', 'title'=>$title,'columns'=>$columns,'form'=> $form, 'permissions' => $permissions);
    }
}
