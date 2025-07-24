<?php

namespace App\Repositories\Tenancy;

use App\Http\Resources\TenantCollection;
use App\Models\Tenant;
use App\Repositories\Interfaces\Tenancy\TenantInterface;
use App\Traits\ImageUploadTrait;

class TenantRepository implements TenantInterface
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
            ['key' => 'name', 'label' => 'Name', 'path' => 'name', 'sort' => true],
            ['key' => 'email', 'label' => 'Email', 'path' => 'email', 'sort' => true],
            ['key' => 'domain', 'label' => 'Domain', 'path' => 'domain', 'sort' => true],
        ];

        $form = [
            ['key' => 'name', 'label' => 'Name', 'type' => 'text', 'required' => true],
            ['key' => 'email', 'label' => 'Email', 'type' => 'email', 'required' => true],
            ['key' => 'domain', 'label' => 'Domain', 'type' => 'text', 'required' => true],
            ['key' => 'thumbnail', 'label' => 'Thumbnail', 'type' => 'file', 'required' => false],
            ['key' => 'password', 'label' => 'Password', 'type' => 'password', 'required' => true],
            ['key' => 'password_confirmation', 'label' => 'Confirm Password', 'type' => 'password', 'required' => true],

        ];
        $permissions = [
            'create' => '',
            'read' => '',
            'update' => '',
            'delete' => ''
        ];
        return array('route'=> 'tenants', 'title'=>$title,'columns'=>$columns,'form'=> $form, 'permissions' => $permissions);
    }
}
