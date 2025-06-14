<?php

namespace App\Repositories\Interfaces\Product;

use App\Models\Unit;

interface UnitInterface
{
    /**
     * Retrieve a unit by its ID.
     */
    public function get(int $id): ?Unit;

    /**
     * Store a new unit.
     */
    public function store($request): Unit;

    /**
     * Update an existing unit.
     */
    public function update(Unit $unit, $request): bool;

    /**
     * Delete a unit.
     */
    public function delete(Unit $unit): bool;

    /**
     * Get paginated list of units.
     */
    public function paginate(int $perPage = 10);

    public function baseData();
    // public function all();

    // public function allUnit();
    // public function ajaxUnitFilter($term);

    // public function paginate($limit,$request);

    // public function update($request);

    // public function getUnits($id);

    // public function statusChange($request);
    // public function featureChange($request);

    // public function homePageUnit();

    // public function shopUnit($user_id=null);

    // public function unitPage();

    // public function mobileUnit($limit);

    // public function unitByIds($top_unit,$take = null);

    // public function unit($slug);

    // //API for apps
    // public function units($limit);

}
