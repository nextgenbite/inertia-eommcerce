<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Promotion;
use Illuminate\Http\Request;
use App\Repositories\Interfaces\Promotion\PromotionInterface;
use App\Traits\ApiReturnFormatTrait;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class PromotionController extends Controller
{
    use ApiReturnFormatTrait;
    protected $promotion;
    public $title = ['Promotion', 'promotion'];

    public function __construct(PromotionInterface $promotion)
    {
        $this->promotion = $promotion;

        $this->middleware('permission:promotion.create', ['only' => ['create', 'store']]);
        $this->middleware('permission:promotion.read', ['only' => ['index', 'show']]);
        // $this->middleware('permission:promotion.updated', ['only' => ['edit', 'update']]);
        $this->middleware('permission:promotion.delete', ['only' => ['destroy', 'destroyBulk']]);
    }
    public function index(Request $request)
    {
        $data = Promotion::query();
        if ($request->has('search')) {
            $data->where('title', 'LIKE', "%" . $request->search . "%");
        }
        if ($request->has(['field', 'order'])) {
            $data->orderBy($request->field, $request->order);
        }
        $data =   array_merge([
            'filters'       => $request->all(['search', 'field', 'order']),
            'getData'         => $data->with('products')->paginate(10)

        ], $this->promotion->baseData());

        return $this->responseWithInertia("Backend/Common/Index", $data);
    }

    public function store(Request $request)
    {
        $validate = $request->validate([
        'title' => 'required|string',
        'type' => 'required|in:flash_sale,top_deal,new_arrival',
        'thumbnail' => 'nullable|string',
        'description' => 'nullable|string',
        'start_time' => 'nullable|date',
        'end_time' => 'nullable|date|required_with:start_time|after:start_time',
        'products' => 'nullable|array',
        'status' => 'nullable|boolean',
    ]);


        if (isDemoMode()) {
            return back();
        }

        DB::beginTransaction();
        try {
            $promotion = $this->promotion->store($validate);
            DB::commit();
            return back()->with('success', "{$promotion->title} created successfully.");
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error', "Error creating {$request->title}: " . $th->getMessage());
        }
    }

    public function update(Promotion $promotion, Request $request)
    {
        if (isDemoMode()) {
            return back();
        }

        DB::beginTransaction();
        try {
            $this->promotion->update($promotion, $request);
            DB::commit();
            return back()->with('success', "{$promotion->title} updated successfully.");
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error', "Error updated promotion {$promotion->title}: " . $th->getMessage());
        }
    }

    public function destroy(Promotion $promotion)
    {
        if (isDemoMode()) {
            return back();
        }
        try {
            $this->promotion->delete($promotion);
            return back()->with('success', "{$promotion->title} deleted successfully.");
        } catch (\Throwable $th) {
            return back()->with('error', "Error deleting {$promotion->title}: " . $th->getMessage());
        }
    }
}
