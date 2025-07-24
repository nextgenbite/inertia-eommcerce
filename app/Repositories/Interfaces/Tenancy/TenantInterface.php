<?php

namespace App\Repositories\Interfaces\Tenancy;

use App\Models\Tenant;

interface TenantInterface
{
    /**
     * Retrieve a tenant by its ID.
     */
    public function get(int $id): ?Tenant;

    /**
     * Store a new tenant.
     */
    public function store($request): Tenant;

    /**
     * Update an existing tenant.
     */
    public function update(Tenant $tenant, $request): bool;

    /**
     * Delete a tenant.
     */
    public function delete(Tenant $tenant): bool;

    /**
     * Get paginated list of tenants.
     */
    public function paginate(int $perPage = 10);

    public function baseData();
    // public function all();

    // public function allTenant();
    // public function ajaxTenantFilter($term);

    // public function paginate($limit,$request);

    // public function update($request);

    // public function getTenants($id);

    // public function statusChange($request);
    // public function featureChange($request);

    // public function homePageTenant();

    // public function shopTenant($user_id=null);

    // public function tenantPage();

    // public function mobileTenant($limit);

    // public function tenantByIds($top_tenant,$take = null);

    // public function tenant($slug);

    // //API for apps
    // public function tenants($limit);

}
