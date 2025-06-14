<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\IndexExpenseRequest;
use Illuminate\Http\Request;
use App\Models\Expense;
use App\Models\ExpenseCategory;
use App\Models\User;
use App\Models\Warehouse;
use App\Repositories\Interfaces\Expense\ExpenseInterface;
use App\Traits\ApiReturnFormatTrait;
use Carbon\Carbon;

class ExpenseController extends Controller
{
    use ApiReturnFormatTrait;
    public $title = ['Expenses', 'expense'];
    public $expense;

    public function __construct(ExpenseInterface $expense)
    {
        $this->expense = $expense;

        // $this->middleware('permission:category.create', ['only' => ['create', 'store']]);
        // $this->middleware('permission:category.view', ['only' => ['index', 'show']]);
        // $this->middleware('permission:category.edit', ['only' => ['edit', 'update']]);
        // $this->middleware('permission:category.delete', ['only' => ['destroy', 'destroyBulk']]);

    }

    public function index(IndexExpenseRequest $request)
    {
        $data = Expense::query();

        if ($request->has('search')) {
            $data->where('title', 'LIKE', "%" . $request->search . "%");
        }

        if ($request->has(['field', 'order'])) {
            $data->orderBy($request->field, $request->order);
        }


        $data = array_merge([
            'filters' => $request->only(['search', 'field', 'order']),
            'getData' =>  $data->with(['user', 'expenseCategory', 'warehouse'])->paginate(10),
        ], $this->expense->baseData());

        return $this->responseWithInertia("Backend/Common/Index", $data);
    }




    public function expenseReport(Request $request)
    {

        $title = $this->title;
        $data = Expense::latest()->get();
        return view('backend.' . strtolower($title[1]) . '.report', compact('data', 'title'));

    }
    public function dateFilter(Request $request)
    {
        $title = $this->title;
        $dateRange = $request->input('date_range');
        if (strpos( $dateRange, ' to ') !== false) {
        $dateRange = explode(' to ',  $dateRange);
        // return $dateRange;
        $data = Expense::whereBetween('created_at', [$dateRange[0], $dateRange[1]])->get();

        $html = view('backend.partials.expense_index_row', compact('data', 'title'))->render();


        return response()->json(['html' => $html]);
    }
    }

    public function create()
    {
        $title = $this->title;
        $categories = ExpenseCategory::latest()->get(['id', 'title']);
        $users = User::latest()->get(['id', 'name']);
        $warehouses = Warehouse::latest()->get(['id', 'name']);

        return view('backend.expense.create', compact('categories', 'title', 'users', 'warehouses'));
    } // End Method


    public function store(Request $request)
    {

          if (isDemoMode()) {
            return back();
        }
        $request->validate([
            'files.*' => 'file|mimes:xls,xlsx,pdf,jpg,jpeg,png|max:1024', // Adjust max size as needed
            'attribute' => 'array',
            'attribute.*.name' => 'nullable|string|max:255',
            'attribute.*.quantity' => 'nullable|integer',
            'attribute.*.amount' => 'nullable|numeric',
            'expense_category_id' => 'required|exists:expense_categories,id',
            'date' => 'required|date',
            'title' => 'required|string|max:255',
            'user_id' => 'required|exists:users,id',
            'warehouse_id' => 'required|exists:warehouses,id',
            'description' => 'nullable|string',
            // 'total' => 'required|numeric',
        ]);


        // Store uploaded files
        $files = [];
        // if ($request->hasFile('files')) {
        //     $files = $this->storeFiles($request->file('files'), 'upload/expense');
        // }

        // Prepare expense items
        $total = 0;
        foreach ($request->attribute as $attribute) {

            $total += $attribute['quantity']  * $attribute['amount'];
        }


        // Create Expense record
        $expense = Expense::create([
            'expense_category_id' => $request->expense_category_id,
            'date' => $request->date,
            'title' => $request->title,
            'user_id' => $request->user_id,
            'warehouse_id' => $request->warehouse_id,
            'attribute' => count($request->attribute) > 0 ? json_encode($request->attribute) : null,
            // 'document' => count($files) > 0 ? json_encode($files) : null,
            'description' => $request->description,
            'total' =>  $total,
        ]);

        // Redirect back with success message
        return back()->with('success', "{$expense->title} Inserted successfully.");
    }

    public function show($id)
    {
        $title = $this->title;
        $data = Expense::findOrFail($id);;

        return view('backend.expense.show', compact('data', 'title'));
    } // End Method



    public function update(Request $request, $id)
    {

          if (isDemoMode()) {
            return back();
        }

        $request->validate([
            'files.*' => 'file|mimes:xls,xlsx,pdf,jpg,jpeg,png|max:1024', // Adjust max size as needed
            'attribute' => 'array',
            'attribute.*.name' => 'nullable|string|max:255',
            'attribute.*.quantity' => 'nullable|integer',
            'attribute.*.amount' => 'nullable|numeric',
            'expense_category_id' => 'required|exists:expense_categories,id',
            'date' => 'required|date',
            'title' => 'required|string|max:255',
            'user_id' => 'required|exists:users,id',
            'warehouse_id' => 'required|exists:warehouses,id',
            'description' => 'nullable|string',
            // 'total' => 'required|numeric',
        ]);


        $data = Expense::findOrFail($id);
        // Store uploaded files
        $files = [];
        if ($request->hasFile('files')) {
            if ($data->document) {
                $this->deleteFiles(json_decode($data->document));
            }
            $files = $this->storeFiles($request->file('files'), 'upload/expense');
        }

        // Prepare expense items
          $total = 0;
        foreach ($request->attribute as $attribute) {

            $total += $attribute['quantity']  * $attribute['amount'];
        }


        // Update Expense record
        $data->update([
            'expense_category_id' => $request->expense_category_id,
            'date' => $request->date,
            'title' => $request->title,
            'user_id' => $request->user_id,
            'warehouse_id' => $request->warehouse_id,
            'attribute' => count($request->attribute) > 0 ? json_encode($request->attribute) : null,
            'document' => count($files) > 0 ? json_encode($files) : null,
            'description' => $request->description,
            'total' => $total,
        ]);

        // Redirect back with success message
        $notification = [
            'message' => 'Expense Update Successfully',
            'alert-type' => 'success'
        ];
        return back()->with('success', "{$data->title} updated successfully.");
        // return redirect()->route('all.' . strtolower($this->title[1]))->with($notification);
    }
    public function destroy($id)
    {
          if (isDemoMode()) {
            return back();
        }

        $data = Expense::findOrFail($id);
        if ($data->document) {
            $this->deleteFiles(json_decode($data->document));
        }

        $data->delete();

        $notification = array(
            'message' => 'Data Deleted Successfully',
            'alert-type' => 'success'
        );

        return redirect()->back()->with($notification);
    } // End Method


    public function StoreExpense(Request $request)
    {

        Expense::insert([

            'details' => $request->details,
            'amount' => $request->amount,
            'month' => $request->month,
            'year' => $request->year,
            'date' => $request->date,
            'created_at' => Carbon::now(),
        ]);


        $notification = array(
            'message' => 'Expense Inserted Successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('all.' . strtolower($this->title[1]))->with($notification);
    } // End Method



    public function TodayExpense()
    {

        $date = date("d-m-Y");
        $today = Expense::where('date', $date)->get();
        return view('backend.expense.today_expense', compact('today'));
    } // End Method


    public function EditExpense($id)
    {

        $expense = Expense::findOrFail($id);
        return view('backend.expense.edit_expense', compact('expense'));
    } // End Method


    public function UpdateExpense(Request $request)
    {

        $expense_id = $request->id;

        Expense::findOrFail($expense_id)->update([

            'details' => $request->details,
            'amount' => $request->amount,
            'month' => $request->month,
            'year' => $request->year,
            'date' => $request->date,
            'created_at' => Carbon::now(),
        ]);


        $notification = array(
            'message' => 'Expense Updated Successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('today.expense')->with($notification);
    } // End Method


    public function MonthExpense()
    {

        $month = date("F");
        $monthexpense = Expense::where('month', $month)->get();
        return view('backend.expense.month_expense', compact('monthexpense'));
    } // End Method


    public function YearExpense()
    {

        $year = date("Y");
        $yearexpense = Expense::where('year', $year)->get();
        return view('backend.expense.year_expense', compact('yearexpense'));
    } // End Method


}
