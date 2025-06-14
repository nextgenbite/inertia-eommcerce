<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\IndexExpenseCategoryRequest;
use App\Models\ExpenseCategory;
use App\Repositories\Interfaces\Expense\CategoryInterface;
use App\Traits\ApiReturnFormatTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class ExpenseCategoryController extends Controller
{
    use ApiReturnFormatTrait;

    public $title = ['Expense Category', 'expense.category'];
    public $keyword = 'expense.category';
    public $category;

    public function __construct(CategoryInterface $category)
    {
        $this->category = $category;

        // $this->middleware('permission:category.create', ['only' => ['create', 'store']]);
        // $this->middleware('permission:category.view', ['only' => ['index', 'show']]);
        // $this->middleware('permission:category.edit', ['only' => ['edit', 'update']]);
        // $this->middleware('permission:category.delete', ['only' => ['destroy', 'destroyBulk']]);

    }
    public function index(IndexExpenseCategoryRequest $request)
    {
        $data = ExpenseCategory::query();
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

        return $this->responseWithInertia("Backend/Expenses/Index",  $data);
    }
    // public function index(){

    //     $title= $this->title;
    //     $data = ExpenseCategory::latest()->get();
    //     return view('backend.'.strtolower($title[1]).'.index',compact('data', 'title'));

    // }// End Method


    public function store(Request $request)
    {
  if (isDemoMode()) {
            return back();
        }
        ExpenseCategory::insert([
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->status,
            'created_at' => Carbon::now(),
        ]);

        $notification = array(
            'message' => 'Data Inserted Successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('all.' . strtolower($this->keyword))->with($notification);
    } // End Method



    public function update(Request $request)
    {

        $category_id = $request->id;

        ExpenseCategory::findOrFail($category_id)->update([
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->status,
            'created_at' => Carbon::now(),
        ]);

        $notification = array(
            'message' => 'Data Updated Successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('all.' . strtolower($this->keyword))->with($notification);
    } // End Method


    public function destroy($id)
    {
          if (isDemoMode()) {
            return back();
        }

        ExpenseCategory::findOrFail($id)->delete();

        $notification = array(
            'message' => 'Data Deleted Successfully',
            'alert-type' => 'success'
        );

        return redirect()->back()->with($notification);
    } // End Method
}
