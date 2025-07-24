<?php

namespace App\Repositories\Tenancy;

use App\Http\Resources\TenantCollection;
use App\Models\Tenant;
use Stancl\Tenancy\Database\Models\Domain;
use App\Repositories\Interfaces\Tenancy\TenantInterface;
use App\Traits\ImageUploadTrait;

class DomainRepository implements TenantInterface
{
    use ImageUploadTrait;

    /**
     * Retrieve a tenant by its ID.
     */
    public function get(int $id): ?Tenant
    {
        return Tenant::find($id);
    }

    /**
     * Store a new tenant.
     */
    public function store($request): Tenant
    {
        $data = $request->validated();

        if ($request->hasFile('thumbnail')) {
            $data['thumbnail'] = $this->uploadImage($request->file('thumbnail'), 'uploads/tenants', 300, 300);
        }

        return Tenant::create($data);
    }

    /**
     * Update an existing tenant.
     */
    public function update(Tenant $tenant, $request): bool
    {
        $data = $request->validated();

        if ($request->hasFile('thumbnail') && !empty($request->hasFile('thumbnail'))) {
            $this->deleteImage($tenant->thumbnail);
            $data['thumbnail'] = $this->uploadImage($request->file('thumbnail'), 'uploads/tenants', 300, 300);
        }
        return $tenant->update($data);
    }

    /**
     * Delete a tenant.
     */
    public function delete(Tenant $tenant): bool
    {
        $this->deleteImage($tenant->thumbnail);
        return $tenant->delete();
    }

    /**
     * Get paginated list of tenants with API Resources.
     */
    public function paginate(int $perPage = 10)
    {
        $tenants = Tenant::paginate($perPage);
        return new TenantCollection($tenants);
    }

    public function baseData(): array
    {
        $title = ['Tenants', 'tenant'];
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
            'create' => 'tenant.create',
            'read' => 'tenant.read',
            'update' => 'tenant.update',
            'delete' => 'tenant.delete'
        ];
        return array('route'=> 'tenants', 'title'=>$title,'columns'=>$columns,'form'=> $form, 'permissions' => $permissions);
    }
}
