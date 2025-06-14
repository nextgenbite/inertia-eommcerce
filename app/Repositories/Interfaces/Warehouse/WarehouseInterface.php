<?php

namespace App\Repositories\Interfaces\Warehouse;

use App\Models\Warehouse;

interface WarehouseInterface
{
    /**
     * Retrieve a warehouse by its ID.
     */
    public function get(int $id): ?Warehouse;

    /**
     * Store a new warehouse.
     */
    public function store($request): Warehouse;

    /**
     * Update an existing warehouse.
     */
    public function update(Warehouse $warehouse, $request): bool;

    /**
     * Delete a warehouse.
     */
    public function delete(Warehouse $warehouse): bool;

    /**
     * Get paginated list of warehouses.
     */
    public function paginate(int $perPage = 10);

    public function baseData();
    // public function all();

    // public function allWarehouse();
    // public function ajaxWarehouseFilter($term);

    // public function paginate($limit,$request);

    // public function update($request);

    // public function getWarehouses($id);

    // public function statusChange($request);
    // public function featureChange($request);

    // public function homePageWarehouse();

    // public function shopWarehouse($user_id=null);

    // public function warehousePage();

    // public function mobileWarehouse($limit);

    // public function warehouseByIds($top_warehouse,$take = null);

    // public function warehouse($slug);

    // //API for apps
    // public function warehouses($limit);

}
