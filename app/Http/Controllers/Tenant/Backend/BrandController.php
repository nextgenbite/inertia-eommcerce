<?php

namespace App\Http\Controllers\Tenant\Backend;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Repositories\Interfaces\Product\BrandInterface;
use Illuminate\Http\Request;
use App\Traits\ApiReturnFormatTrait;
use Illuminate\Support\Facades\DB;

class BrandController extends Controller
{
    use ApiReturnFormatTrait;
    protected $brand;
    public $title = ['Brand', 'brand'];

    public function __construct(BrandInterface $brand)
    {
        $this->brand = $brand;

        $this->middleware('permission:category.create', ['only' => ['create', 'store']]);
        $this->middleware('permission:category.read', ['only' => ['index', 'show']]);
        $this->middleware('permission:category.updated', ['only' => ['edit', 'update']]);
        $this->middleware('permission:category.delete', ['only' => ['destroy', 'destroyBulk']]);
    }
    public function index(Request $request)
    {
        $data = Brand::query();
        if ($request->has('search')) {
            $data->where('title', 'LIKE', "%" . $request->search . "%");
        }
        if ($request->has(['field', 'order'])) {
            $data->orderBy($request->field, $request->order);
        }
        $data =   array_merge([
            'filters'       => $request->all(['search', 'field', 'order']),
            'getData'         => $data->paginate(10)

        ], $this->brand->baseData());

        return $this->responseWithInertia("Backend/Common/Index", $data);
    }

    public function store(Request $request)
    {
        if (isDemoMode()) {
            return back();
        }

        DB::beginTransaction();
        try {
            $category = $this->brand->store($request);
            DB::commit();
            return back()->with('success', "{$category->title} created successfully.");
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error', "Error creating {$request->title}: " . $th->getMessage());
        }
    }

    public function update(Brand $brand, Request $request)
    {
        if (isDemoMode()) {
            return back();
        }

        DB::beginTransaction();
        try {
            $this->brand->update($brand, $request);
            DB::commit();
            return back()->with('success', "{$brand->title} updated successfully.");
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error', "Error updbrandating {$brand->title}: " . $th->getMessage());
        }
    }

    public function destroy(Brand $brand)
    {
        if (isDemoMode()) {
            return back();
        }
        try {
            $this->brand->delete($brand);
            return back()->with('success', "{$brand->title} deleted successfully.");
        } catch (\Throwable $th) {
            return back()->with('error', "Error deleting {$brand->title}: " . $th->getMessage());
        }
    }
}
