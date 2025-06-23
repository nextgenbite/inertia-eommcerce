<?php

namespace App\Repositories\Slider;

use App\Http\Resources\SliderCollection;
use App\Models\Slider;
use App\Repositories\Interfaces\Slider\SliderInterface;
use App\Traits\ImageUploadTrait;

class SliderRepository implements SliderInterface
{
    use ImageUploadTrait;
    private $imagePath = 'uploads/slider';

    /**
     * Retrieve a slider by its ID.
     */
    public function get(int $id): ?Slider
    {
        return Slider::find($id);
    }

    /**
     * Store a new slider.
     */
    public function store($request): Slider
    {
        if ($request['image'] && $request['image'] !== null) {
            $image = $this->uploadImage($request['image'], $this->imagePath, 900, 350);
        }

        $slider = Slider::create([
            'title' => $request['title'],
            'subtitle' => $request['subtitle'],
            'image' => $image ?? null,
            'link' => $request['link'],
            'status' => $request['status'],
        ]);
        // Remove products() if not relevant for sliders
        return $slider;
    }

    /**
     * Update an existing slider.
     */
    public function update(Slider $slider, $request): bool
    {
        if ($request->hasFile('image')) {
            $this->deleteImage($slider->image);
            $image = $this->uploadImage($request->file('image'), $this->imagePath, 900, 350);
        }
        $updated = $slider->update([
            'title' => $request['title'],
            'subtitle' => $request['subtitle'],
            'image' => $image ?? $slider->image,
            'link' => $request['link'],
            'status' => $request['status'],
        ]);

        // Remove products() if not relevant for sliders

        return $updated;
    }

    /**
     * Delete a slider.
     */
    public function delete(Slider $slider): bool
    {
        $this->deleteImage($slider->image);
        return $slider->delete();
    }

    /**
     * Get paginated list of sliders with API Resources.
     */
    public function paginate(int $perPage = 10)
    {
        $sliders = Slider::paginate($perPage);
        return new SliderCollection($sliders);
    }

    public function baseData(): array
    {
        $title = ['Sliders', 'slider'];
        $columns = [
                   ['key' => 'image', 'label' => 'Image', 'path' => 'image'],
            ['key' => 'title', 'label' => 'Title', 'path' => 'title', 'sort' => true],
            ['key' => 'status', 'label' => 'Status', 'path' => 'status', 'sort' => true],
        ];

        $form = [
            ['key' => 'title', 'label' => 'Title', 'path' => 'title', 'type' => 'text', 'class' => ' lg:col-span-6'],
            ['key' => 'subtitle', 'label' => 'Subtitle', 'path' => 'subtitle', 'type' => 'text', 'class' => ' lg:col-span-6'],
            ['key' => 'link', 'label' => 'Link', 'path' => 'link', 'type' => 'url', 'class' => ' lg:col-span-6'],

            ['key' => 'image', 'label' => 'image', 'type' => 'image', 'path' => 'image', 'class' => ' lg:col-span-6'],
            ['key' => 'status', 'label' => 'Status', 'path' => 'status', 'type' => 'select', 'class' => ' lg:col-span-6', 'optionLabel' => 'name', 'optionValue' => 'code',  'options' => [
                ['name' => 'Active', 'code' => '1'],
                ['name' => 'Deactive', 'code' => '0'],
            ]],
        ];
        $permissions = [
            'create' => 'slider.create',
            'read' => 'slider.read',
            'update' => 'slider.update',
            'delete' => 'slider.delete'
        ];
        return array('route' => 'sliders', 'title' => $title, 'columns' => $columns, 'form' => $form, 'permissions' => $permissions);
    }
}
