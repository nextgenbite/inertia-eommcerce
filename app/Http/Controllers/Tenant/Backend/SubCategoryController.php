<?php

namespace App\Http\Controllers\Tenant\Backend;

use App\Http\Controllers\Controller;
use App\Models\SubCategory;
use App\Repositories\Interfaces\Product\SubCategoryInterface;
use App\Traits\ApiReturnFormatTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SubCategoryController extends Controller
{
    use ApiReturnFormatTrait;
    protected $sub_category;
    public $title = ['SubCategories', 'sub_category'];

    public function __construct(SubCategoryInterface $sub_category)
    {
        $this->sub_category = $sub_category;

        $this->middleware('permission:sub_category.create', ['only' => ['create', 'store']]);
        $this->middleware('permission:sub_category.read', ['only' => ['index', 'show']]);
        $this->middleware('permission:sub_category.updated', ['only' => ['edit', 'update']]);
        $this->middleware('permission:sub_category.delete', ['only' => ['destroy', 'destroyBulk']]);
    }

    public function index(Request $request)
    {
        $data = SubCategory::query();
        if ($request->has('search')) {
            $data->where('title', 'LIKE', "%" . $request->search . "%");
        }
        if ($request->has(['field', 'order'])) {
            $data->orderBy($request->field, $request->order);
        }
        $data = array_merge([
            'filters'   => $request->all(['search', 'field', 'order']),
            'getData'   => $data->with('category')->paginate(10)
        ], $this->sub_category->baseData());

        return $this->responseWithInertia("Backend/Common/Index", $data);
    }

    public function store(Request $request)
    {
        if ($this->isDemoMode()) {
            return back();
        }

        DB::beginTransaction();
        try {
            $sub_category = $this->sub_category->store($request);
            DB::commit();
            return back()->with('success', "{$sub_category->title} created successfully.");
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error', "Error creating {$request->title}: " . $th->getMessage());
        }
    }

    public function update(SubCategory $sub_category, Request $request)
    {
        if ($this->isDemoMode()) {
            return back();
        }

        DB::beginTransaction();
        try {
            $this->sub_category->update($sub_category, $request);
            DB::commit();
            return back()->with('success', "{$sub_category->title} updated successfully.");
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error', "Error updating {$sub_category->title}: " . $th->getMessage());
        }
    }

    public function destroy(SubCategory $sub_category)
    {
        try {
            $this->sub_category->delete($sub_category);
            return back()->with('success', "{$sub_category->title} deleted successfully.");
        } catch (\Throwable $th) {
            return back()->with('error', "Error deleting {$sub_category->title}: " . $th->getMessage());
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
