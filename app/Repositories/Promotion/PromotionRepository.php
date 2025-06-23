<?php

namespace App\Repositories\Promotion;

use App\Http\Resources\PromotionCollection;
use App\Models\Product;
use App\Models\Promotion;
use App\Repositories\Interfaces\Promotion\PromotionInterface;
use App\Traits\ImageUploadTrait;
use Carbon\Carbon;

class PromotionRepository implements PromotionInterface
{
    use ImageUploadTrait;
    private $imagePath = 'uploads/promotion';

    /**
     * Retrieve a promotion by its ID.
     */
    public function get(int $id): ?Promotion
    {
        return Promotion::find($id);
    }

    /**
     * Store a new promotion.
     */
    public function store($request): Promotion
    {

        if ($request['thumbnail'] && $request['thumbnail'] !== null) {
            $thumbnail = $this->uploadImage($request['thumbnail'], $this->imagePath, 300, 300);
        }

        $promotion = Promotion::create([
            'title' => $request['title'],
            'type' => $request['type'],
            'thumbnail' => $thumbnail ?? null,
            'description' => $request['description'],
            'start_time' => $request['start_time'] ? Carbon::parse($request['start_time'])->setTimezone(config('app.timezone'))->format('Y-m-d H:i:s') : null,
            'end_time' => $request['end_time'] ? Carbon::parse($request['end_time'])->setTimezone(config('app.timezone'))->format('Y-m-d H:i:s') : null,
            'status' => $request['status'],

        ]);
        $promotion->products()->attach($request['products']);
        return  $promotion;
    }

    /**
     * Update an existing promotion.
     */
    public function update(Promotion $promotion, $request): bool
    {
        if ($request->hasFile('thumbnail')) {
            $this->deleteImage($promotion->thumbnail);
            $thumbnail = $this->uploadImage($request->file('thumbnail'), $this->imagePath, 300, 300);
        }
        $updated = $promotion->update([
            'title' => $request['title'],
            'type' => $request['type'],
            'description' => $request['description'],
            'thumbnail' => $thumbnail ?? $promotion->thumbnail,
            'start_time' => $request['start_time'] ? Carbon::parse($request['start_time'])->setTimezone(config('app.timezone'))->format('Y-m-d H:i:s') : null,
            'end_time' => $request['end_time'] ? Carbon::parse($request['end_time'])->setTimezone(config('app.timezone'))->format('Y-m-d H:i:s') : null,
            'status' => $request['status'],
        ]);

        if ($updated) {
            $promotion->products()->sync($request['products']);
        }

        return $updated;
    }

    /**
     * Delete a promotion.
     */
    public function delete(Promotion $promotion): bool
    {
        $this->deleteImage($promotion->thumbnail);
        return $promotion->delete();
    }

    /**
     * Get paginated list of promotions with API Resources.
     */
    public function paginate(int $perPage = 10)
    {
        $promotions = Promotion::paginate($perPage);
        return new PromotionCollection($promotions);
    }

    public function baseData(): array
    {
        $title = ['Promotions', 'promotion'];
        $columns = [
                 ['key' => 'title', 'label' => 'Title', 'path' => 'title', 'sort' => true],
            // ['key' => 'type', 'label' => 'Type', 'path' => 'type', 'sort' => true],
            ['key' => 'start_time', 'label' => 'Start Time', 'path' => 'start_time', 'sort' => true],
            ['key' => 'end_time', 'label' => 'End Time', 'path' => 'end_time', 'sort' => true],
            ['key' => 'status', 'label' => 'Status', 'path' => 'status', 'sort' => true],
        ];

        $form = [
            ['key' => 'title', 'label' => 'Title', 'path' => 'title', 'type' => 'text', 'class' => ' lg:col-span-6'],
            ['key' => 'type', 'label' => 'Type', 'path' => 'type', 'type' => 'select', 'optionLabel' => 'name', 'class' => ' lg:col-span-6', 'optionValue' => 'code',  'options' => [
                ['name' => 'Flash Sale', 'code' => 'flash_sale'],
                ['name' => 'Top Deal', 'code' => 'top_deal'],
                ['name' => 'Featured Promotion', 'code' => 'featured_promotion'],
                ['name' => 'Seasonal Sale', 'code' => 'seasonal_sale'],
                ['name' => 'Clearance Sale', 'code' => 'clearance_sale'],
                ['name' => 'Limited Time Offer', 'code' => 'limited_time_offer'],
                ['name' => 'Loyalty Reward', 'code' => 'loyalty_reward'],
                ['name' => 'Discount', 'code' => 'discount'],
                ['name' => 'Buy One Get One', 'code' => 'bogo'],
                ['name' => 'Seasonal Sale', 'code' => 'seasonal_sale'],
                ['name' => 'Clearance Sale', 'code' => 'clearance_sale'],
                ['name' => 'Limited Time Offer', 'code' => 'limited_time_offer'],
                ['name' => 'Loyalty Reward', 'code' => 'loyalty_reward'],
                ['name' => 'Discount', 'code' => 'discount'],
                ['name' => 'Buy One Get One', 'code' => 'bogo'],
            ]],
            ['key' => 'thumbnail', 'label' => 'Thumbnail', 'type' => 'image', 'path' => 'thumbnail', 'class' => ' lg:col-span-6'],
            ['key' => 'description', 'label' => 'Description', 'path' => 'description', 'type' => 'textarea', 'class' => ' lg:col-span-6'],
            ['key' => 'start_time', 'label' => 'Start Time', 'path' => 'start_time', 'type' => 'date_time', 'class' => ' lg:col-span-6'],
            ['key' => 'end_time', 'label' => 'End Time', 'path' => 'end_time', 'type' => 'date_time', 'class' => ' lg:col-span-6'],

            ['key' => 'products', 'label' => 'Product', 'path' => 'products', 'type' => 'multi_select', 'class' => ' lg:col-span-6', 'optionLabel' => 'title', 'optionValue' => 'id', 'options' => Product::select('id', 'title')->get()],

            ['key' => 'status', 'label' => 'Status', 'path' => 'status', 'type' => 'select', 'class' => ' lg:col-span-6', 'optionLabel' => 'name', 'optionValue' => 'code',  'options' => [
                ['name' => 'Active', 'code' => '1'],
                ['name' => 'Deactive', 'code' => '0'],
            ]],
        ];
        $permissions = [
            'create' => 'promotion.create',
            'read' => 'promotion.read',
            'update' => 'promotion.update',
            'delete' => 'promotion.delete'
        ];
        return array('route' => 'promotions', 'title' => $title, 'columns' => $columns, 'form' => $form, 'permissions' => $permissions);
    }
}
