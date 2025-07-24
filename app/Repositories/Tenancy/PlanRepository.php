<?php

namespace App\Repositories\Tenancy;

use App\Http\Resources\PlanCollection;
use App\Models\Plan;
use App\Repositories\Interfaces\Tenancy\PlanInterface;
use App\Traits\ImageUploadTrait;

class PlanRepository implements PlanInterface
{
    use ImageUploadTrait;

    /**
     * Retrieve a plan by its ID.
     */
    public function get(int $id): ?Plan
    {
        return Plan::find($id);
    }

    /**
     * Store a new plan.
     */
    public function store($request): Plan
    {
        $data = $request->validated();

        if ($request->hasFile('thumbnail')) {
            $data['thumbnail'] = $this->uploadImage($request->file('thumbnail'), 'uploads/plans', 300, 300);
        }

        return Plan::create($data);
    }

    /**
     * Update an existing plan.
     */
    public function update(Plan $plan, $request): bool
    {
        $data = $request->validated();

        if ($request->hasFile('thumbnail') && !empty($request->hasFile('thumbnail'))) {
            $this->deleteImage($plan->thumbnail);
            $data['thumbnail'] = $this->uploadImage($request->file('thumbnail'), 'uploads/plans', 300, 300);
        }
        return $plan->update($data);
    }

    /**
     * Delete a plan.
     */
    public function delete(Plan $plan): bool
    {
        $this->deleteImage($plan->thumbnail);
        return $plan->delete();
    }

    /**
     * Get paginated list of plans with API Resources.
     */
    public function paginate(int $perPage = 10)
    {
        $plans = Plan::paginate($perPage);
        return new PlanCollection($plans);
    }

    public function baseData(): array
    {
        $title = ['Plans', 'plan'];

        $form = [
            ['key' => 'name', 'label' => 'Name', 'path' => 'name', 'type' => 'text', 'class' => ' lg:col-span-6',],
            ['key' => 'price', 'label' => 'Price', 'path' => 'price', 'type' => 'text', 'class' => ' lg:col-span-6',],
            ['key' => 'billing_period', 'label' => 'Billing Period', 'class' => ' lg:col-span-6', 'path' => 'billing_period', 'type' => 'select', 'optionLabel'=> 'name','optionValue'=> 'code',  'options' => [
                ['name' => 'Monthly', 'code' => 'monthly'],
                ['name' => 'Yearly', 'code' => 'yearly'],
                ]],
                ['key' => 'attribute', 'label' => 'Features', 'class' => ' lg:col-span-6', 'path' => 'attribute', 'type' => 'attribute', 'items' => [['name' => '', 'value' => '']]],

                ['key' => 'max_products', 'label' => 'Max Products', 'path' => 'max_products', 'type' => 'text', 'class' => ' lg:col-span-6',],
                ['key' => 'custom_domain', 'label' => 'Custom Domain', 'path' => 'custom_domain', 'type' => 'text', 'class' => ' lg:col-span-6',],

            ['key' => 'status', 'label' => 'Status', 'class' => ' lg:col-span-6', 'path' => 'status', 'type' => 'select', 'optionLabel'=> 'name','optionValue'=> 'code',  'options' => [
                ['name' => 'Active', 'code' => '1'],
                ['name' => 'Deactive', 'code' => '0'],
            ]],
        ];

        return array('route'=> 'plans', 'title'=>$title,'formData'=> $form);
    }
}
