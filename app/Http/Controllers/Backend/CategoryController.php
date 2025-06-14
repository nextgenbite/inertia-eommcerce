<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\{IndexCategoryRequest, StoreCategoryRequest, UpdateCategoryRequest};
use Illuminate\Http\Request;
use App\Models\Category;
use App\Repositories\Interfaces\Product\CategoryInterface;
use App\Traits\ApiReturnFormatTrait;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    use ApiReturnFormatTrait;
    protected $category;
    public $title = ['Categories', 'category'];

    public function __construct(CategoryInterface $category)
    {
        $this->category = $category;

        $this->middleware('permission:category.create', ['only' => ['create', 'store']]);
        $this->middleware('permission:category.view', ['only' => ['index', 'show']]);
        $this->middleware('permission:category.edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:category.delete', ['only' => ['destroy', 'destroyBulk']]);
    }


    public function index(IndexCategoryRequest $request)
    {
        $data = Category::query();
        if ($request->has('search')) {
            $data->where('title', 'LIKE', "%" . $request->search . "%");
        }
        if ($request->has(['field', 'order'])) {
            $data->orderBy($request->field, $request->order);
        }
        $data =   array_merge([
            'filters'       => $request->all(['search', 'field', 'order']),
            'getData'         => $data->paginate(10)

        ], $this->category->baseData());

        return $this->responseWithInertia("Backend/Common/Index", $data);
    }

    public function store(StoreCategoryRequest $request)
    {
     if (isDemoMode()) {
        return redirect()->back();
    }

        DB::beginTransaction();
        try {
            $category = $this->category->store($request);
            DB::commit();
            return back()->with('success', "{$category->title} created successfully.");
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error', "Error creating {$request->title}: " . $th->getMessage());
        }
    }

    public function update(Category $category, UpdateCategoryRequest $request)
    {
        if ($this->isDemoMode()) {
            return back();
        }

        DB::beginTransaction();
        try {
            $this->category->update($category, $request);
            DB::commit();
            return back()->with('success', "{$category->title} updated successfully.");
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error', "Error updating {$category->title}: " . $th->getMessage());
        }
    }

    public function destroy(Category $category)
    {
        try {
            $this->category->delete($category);
            return back()->with('success', "{$category->title} deleted successfully.");
        } catch (\Throwable $th) {
            return back()->with('error', "Error deleting {$category->title}: " . $th->getMessage());
        }
    }

       public function allCategories(Request $request)
    {
        $data = Category::query();
        if ($request->has('search')) {
            $data->where('title', 'LIKE', "%" . $request->search . "%");
        }
        if ($request->has(['field', 'order'])) {
            $data->orderBy($request->field, $request->order);
        }

        $data =   array_merge([
            'filters'       => $request->all(['search', 'field', 'order']),
            'getData'         => $data->with(['subCategories.subSubCategories'])->paginate(10),

        ], $this->category->baseData());

        return $this->responseWithInertia("Backend/AllCategories/Index",  $data);
    }

}
