<?php

namespace App\Repositories\Interfaces\Product;

use App\Models\Product;

interface ProductInterface
{
/**
     * Retrieve a category by its ID.
     */
    public function get(int $id): ?Product;

    /**
     * Store a new Product.
     */
    public function store($request): Product;

    /**
     * Update an existing Product.
     */
    public function update(Product $product, $request): bool;

    /**
     * Delete a Product.
     */
    public function delete(Product $product): bool;

     /**
     * Get paginated list of categories.
     */
    public function paginate(int $perPage = 10);

    public function baseData();
    // public function all();

    // public function allCategory();
    // public function ajaxCategoryFilter($term);

    // public function paginate($limit,$request);

    // public function update($request);

    // public function getCategories($id);

    // public function statusChange($request);
    // public function featureChange($request);

    // public function homePageCategory();

    // public function shopCategory($user_id=null);

    // public function categoryPage();

    // public function mobileCategory($limit);

    // public function categoryByIds($top_category,$take = null);

    // public function category($slug);

    // //API for apps
    // public function categories($limit);

}
