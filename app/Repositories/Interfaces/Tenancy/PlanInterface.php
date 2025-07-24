<?php

namespace App\Repositories\Interfaces\Tenancy;

use App\Models\Plan;

interface PlanInterface
{
    /**
     * Retrieve a plan by its ID.
     */
    public function get(int $id): ?Plan;

    /**
     * Store a new plan.
     */
    public function store($request): Plan;

    /**
     * Update an existing plan.
     */
    public function update(Plan $plan, $request): bool;

    /**
     * Delete a plan.
     */
    public function delete(Plan $plan): bool;

    /**
     * Get paginated list of plans.
     */
    public function paginate(int $perPage = 10);

    public function baseData();
    // public function all();

    // public function allPlan();
    // public function ajaxPlanFilter($term);

    // public function paginate($limit,$request);

    // public function update($request);

    // public function getPlans($id);

    // public function statusChange($request);
    // public function featureChange($request);

    // public function homePagePlan();

    // public function shopPlan($user_id=null);

    // public function planPage();

    // public function mobilePlan($limit);

    // public function planByIds($top_plan,$take = null);

    // public function plan($slug);

    // //API for apps
    // public function plans($limit);

}
