<?php

namespace App\Http\Controllers\Tenant\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SubSubCategory;
use App\Repositories\Interfaces\Product\SubSubCategoryInterface;
use Illuminate\Support\Facades\DB;
use App\Traits\ApiReturnFormatTrait;

class SubSubCategoryController extends Controller
{
    use ApiReturnFormatTrait;
    protected $subSubCategory;
    public $title = ['SubSubCategories', 'sub_sub_category'];

    public function __construct(SubSubCategoryInterface $subSubCategory)
    {
        $this->subSubCategory = $subSubCategory;

        $this->middleware('permission:sub_sub_category.create', ['only' => ['create', 'store']]);
        $this->middleware('permission:sub_sub_category.read', ['only' => ['index', 'show']]);
        $this->middleware('permission:sub_sub_category.updated', ['only' => ['edit', 'update']]);
        $this->middleware('permission:sub_sub_category.delete', ['only' => ['destroy', 'destroyBulk']]);
    }

    public function index(Request $request)
    {
        $data = SubSubCategory::query();
        if ($request->has('search')) {
            $data->where('title', 'LIKE', "%" . $request->search . "%");
        }
        if ($request->has(['field', 'order'])) {
            $data->orderBy($request->field, $request->order);
        }
        $data = array_merge([
            'filters'   => $request->all(['search', 'field', 'order']),
            'getData'   => $data->with('subCategory', 'subCategory.category')->paginate(10)
        ], $this->subSubCategory->baseData());

        return $this->responseWithInertia("Backend/Common/Index", $data);
    }

    public function store(Request $request)
    {
        if ($this->isDemoMode()) {
            return back();
        }

        DB::beginTransaction();
        try {
            $subSubCategory = $this->subSubCategory->store($request);
            DB::commit();
            return back()->with('success', "{$subSubCategory->title} created successfully.");
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error', "Error creating {$request->title}: " . $th->getMessage());
        }
    }

    public function update(SubSubCategory $subSubCategory, Request $request)
    {
        if ($this->isDemoMode()) {
            return back();
        }

        DB::beginTransaction();
        try {
            $this->subSubCategory->update($subSubCategory, $request);
            DB::commit();
            return back()->with('success', "{$subSubCategory->title} updated successfully.");
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error', "Error updating {$subSubCategory->title}: " . $th->getMessage());
        }
    }

    public function destroy(SubSubCategory $subSubCategory)
    {
        try {
            $this->subSubCategory->delete($subSubCategory);
            return back()->with('success', "{$subSubCategory->title} deleted successfully.");
        } catch (\Throwable $th) {
            return back()->with('error', "Error deleting {$subSubCategory->title}: " . $th->getMessage());
        }
    }
    /**
     * Handle demo mode restriction.
     */
    protected function isDemoMode(): bool
    {
        if (config('app.demo_mode')) {
            session()->flash('error', 'This function is disabled in demo server.');
            return true;
        }
        return false;
    }
}
