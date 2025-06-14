<?php

namespace App\Repositories\Interfaces\Product;

use App\Models\SubCategory;

interface SubCategoryInterface
{
    /**
     * Retrieve a sub-category by its ID.
     */
    public function get(int $id): ?SubCategory;

    /**
     * Store a new sub-category.
     */
    public function store($request): SubCategory;

    /**
     * Update an existing sub-category.
     */
    public function update(SubCategory $subCategory, $request): bool;

    /**
     * Delete a sub-category.
     */
    public function delete(SubCategory $subCategory): bool;

    /**
     * Get paginated list of sub-categories.
     */
    public function paginate(int $perPage = 10);

    public function baseData();
    // public function all();

    // public function allSubCategory();
    // public function ajaxSubCategoryFilter($term);

    // public function paginate($limit,$request);

    // public function update($request);

    // public function getSubCategories($id);

    // public function statusChange($request);
    // public function featureChange($request);

    // public function homePageSubCategory();

    // public function shopSubCategory($user_id=null);

    // public function subCategoryPage();

    // public function mobileSubCategory($limit);

    // public function subCategoryByIds($top_sub_category,$take = null);

    // public function subCategory($slug);

    // //API for apps
    // public function subCategories($limit);

}
