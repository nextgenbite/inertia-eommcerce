<?php

namespace App\Repositories\Interfaces\Product;

use App\Models\SubSubCategory;

interface SubSubCategoryInterface
{
    /**
     * Retrieve a sub-sub-category by its ID.
     */
    public function get(int $id): ?SubSubCategory;

    /**
     * Store a new sub-sub-category.
     */
    public function store($request): SubSubCategory;

    /**
     * Update an existing sub-sub-category.
     */
    public function update(SubSubCategory $subSubCategory, $request): bool;

    /**
     * Delete a sub-sub-category.
     */
    public function delete(SubSubCategory $subSubCategory): bool;

    /**
     * Get paginated list of sub-sub-categories.
     */
    public function paginate(int $perPage = 10);

    public function baseData();
    // public function all();

    // public function allSubSubCategory();
    // public function ajaxSubSubCategoryFilter($term);

    // public function paginate($limit,$request);

    // public function update($request);

    // public function getSubSubCategories($id);

    // public function statusChange($request);
    // public function featureChange($request);

    // public function homePageSubSubCategory();

    // public function shopSubSubCategory($user_id=null);

    // public function subSubCategoryPage();

    // public function mobileSubSubCategory($limit);

    // public function subSubCategoryByIds($top_sub_sub_category,$take = null);

    // public function subSubCategory($slug);

    // //API for apps
    // public function subSubCategories($limit);

}
