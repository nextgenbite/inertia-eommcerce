<?php

namespace App\Repositories\Interfaces\Product;

use App\Models\Brand;

interface BrandInterface
{
    /**
     * Retrieve a brand by its ID.
     */
    public function get(int $id): ?Brand;

    /**
     * Store a new brand.
     */
    public function store($request): Brand;

    /**
     * Update an existing brand.
     */
    public function update(Brand $brand, $request): bool;

    /**
     * Delete a brand.
     */
    public function delete(Brand $brand): bool;

    /**
     * Get paginated list of brands.
     */
    public function paginate(int $perPage = 10);

    public function baseData();
    // public function all();

    // public function allBrand();
    // public function ajaxBrandFilter($term);

    // public function paginate($limit,$request);

    // public function update($request);

    // public function getBrands($id);

    // public function statusChange($request);
    // public function featureChange($request);

    // public function homePageBrand();

    // public function shopBrand($user_id=null);

    // public function brandPage();

    // public function mobileBrand($limit);

    // public function brandByIds($top_brand,$take = null);

    // public function brand($slug);

    // //API for apps
    // public function brands($limit);

}
