<?php

namespace App\Repositories\Interfaces\Slider;

use App\Models\Slider;

interface SliderInterface
{
    /**
     * Retrieve a slider by its ID.
     */
    public function get(int $id): ?Slider;

    /**
     * Store a new Slider.
     */
    public function store($request): Slider;

    /**
     * Update an existing slider.
     */
    public function update(Slider $slider, $request): bool;

    /**
     * Delete a slider.
     */
    public function delete(Slider $slider): bool;

    /**
     * Get paginated list of sliders.
     */
    public function paginate(int $perPage = 10);

    public function baseData();
    // public function all();

    // public function allSlider();
    // public function ajaxSliderFilter($term);

    // public function paginate($limit,$request);

    // public function update($request);

    // public function getSliders($id);

    // public function statusChange($request);
    // public function featureChange($request);

    // public function homePageSlider();

    // public function shopSlider($user_id=null);

    // public function sliderPage();

    // public function mobileSlider($limit);

    // public function sliderByIds($top_slider,$take = null);

    // public function slider($slug);

    // //API for apps
    // public function sliders($limit);

}
