<?php

namespace App\Repositories\Interfaces\Promotion;

use App\Models\Promotion;

interface PromotionInterface
{
    /**
     * Retrieve a promotion by its ID.
     */
    public function get(int $id): ?Promotion;

    /**
     * Store a new Promotion.
     */
    public function store($request): Promotion;

    /**
     * Update an existing promotion.
     */
    public function update(Promotion $promotion, $request): bool;

    /**
     * Delete a promotion.
     */
    public function delete(Promotion $promotion): bool;

    /**
     * Get paginated list of promotions.
     */
    public function paginate(int $perPage = 10);

    public function baseData();
    // public function all();

    // public function allPromotion();
    // public function ajaxPromotionFilter($term);

    // public function paginate($limit,$request);

    // public function update($request);

    // public function getPromotions($id);

    // public function statusChange($request);
    // public function featureChange($request);

    // public function homePagePromotion();

    // public function shopPromotion($user_id=null);

    // public function promotionPage();

    // public function mobilePromotion($limit);

    // public function promotionByIds($top_promotion,$take = null);

    // public function promotion($slug);

    // //API for apps
    // public function promotions($limit);

}
