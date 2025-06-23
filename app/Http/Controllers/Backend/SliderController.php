<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Slider;
use App\Repositories\Interfaces\Slider\SliderInterface;
use App\Traits\ApiReturnFormatTrait;
use Illuminate\Support\Facades\DB;

class SliderController extends Controller
{
    use ApiReturnFormatTrait;
    protected $slider;
    public $title = ['Slider', 'slider'];

    public function __construct(SliderInterface $slider)
    {
        $this->slider = $slider;

        $this->middleware('permission:slider.create', ['only' => ['create', 'store']]);
        $this->middleware('permission:slider.read', ['only' => ['index', 'show']]);
        $this->middleware('permission:slider.updated', ['only' => ['edit', 'update']]);
        $this->middleware('permission:slider.delete', ['only' => ['destroy', 'destroyBulk']]);
    }

    public function index(Request $request)
    {
        $data = Slider::query();
        if ($request->has('search')) {
            $data->where('title', 'LIKE', "%" . $request->search . "%");
        }
        if ($request->has(['field', 'order'])) {
            $data->orderBy($request->field, $request->order);
        }
        $data = array_merge([
            'filters' => $request->all(['search', 'field', 'order']),
            'getData' => $data->paginate(10)
        ], $this->slider->baseData());

        return $this->responseWithInertia("Backend/Common/Index", $data);
    }

    public function store(Request $request)
    {
        if (isDemoMode()) {
            return back();
        }

        DB::beginTransaction();
        try {
            $slider = $this->slider->store($request);
            DB::commit();
            return back()->with('success', "{$slider->title} created successfully.");
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error', "Error creating {$request->title}: " . $th->getMessage());
        }
    }

    public function update(Slider $slider, Request $request)
    {
        if (isDemoMode()) {
            return back();
        }

        DB::beginTransaction();
        try {
            $this->slider->update($slider, $request);
            DB::commit();
            return back()->with('success', "{$slider->title} updated successfully.");
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error', "Error updating {$slider->title}: " . $th->getMessage());
        }
    }

    public function destroy(Slider $slider)
    {
        if (isDemoMode()) {
            return back();
        }
        try {
            $this->slider->delete($slider);
            return back()->with('success', "{$slider->title} deleted successfully.");
        } catch (\Throwable $th) {
            return back()->with('error', "Error deleting {$slider->title}: " . $th->getMessage());
        }
    }
}
