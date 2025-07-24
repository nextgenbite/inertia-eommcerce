<?php

namespace App\Http\Controllers\Tenant\Backend;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Purchase;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    // public function expenseReport(Request $request)
    // {

    //     $title = ['Expenes', 'expenes'];
    //     if ($request->ajax()) {
    //         // Construct query for expenses
    //         $query = Expense::query();

    //         // Apply date range filter if provided
    //         $dateRange = $request->input('date_range');
    //         if ($dateRange && strpos($dateRange, ' to ') !== false) {
    //             $dateRange = explode(' to ', $dateRange);
    //             $query->whereBetween('created_at', [$dateRange[0], $dateRange[1]]);
    //         }

    //         // Return data as JSON for DataTables
    //         return datatables()->of($query)->toJson();
    //     }
    //     $data = Expense::latest()->get();
    //     return view('backend.report.expenes_report', compact('data', 'title'));

    // }
    public function expenseReport(Request $request)
{
    $title = ['Expenes', 'expenes'];
    // Check if it's an Ajax request
    if ($request->ajax()) {
        // Construct query for expenses
        $query = Expense::query();
        $query->with('user:id,name', 'expenseCategory');
        // Apply date range filter if provided
        $dateRange = $request->input('date_range');
        if ($dateRange && strpos($dateRange, ' to ') !== false) {
            $dateRange = explode(' to ', $dateRange);
            $query->whereBetween('created_at', [$dateRange[0], $dateRange[1]]);
        }

        // Return data as JSON for DataTables
        return datatables()->of($query)
        ->editColumn('created_at', function ($expense) {
            return $expense->created_at->format('Y-m-d');
        })
        ->toJson();
    }
    $columns =[
        [ 'data'=> 'created_at', 'name'=> 'created_at' ],
        [ 'data'=> 'title', 'name'=> 'title' ],
        [ 'data'=> 'user.name', 'name'=> 'user.name' ],
        [ 'data'=> 'expense_category.title', 'name'=> 'expense_category.title' ],
        [ 'data'=> 'total', 'name'=> 'total' ],
        [ 'data'=> 'description', 'name'=> 'description' ]
        // Add more columns as needed
    ];

    // If it's not an Ajax request, render the view
            $data = Expense::latest()->get();
    return view('backend.report.expenes_report' , compact('data', 'title', 'columns' ));
}


    public function salesReport(Request $request)
    {

        $title = ['Sales', 'invoice'];
        $data = Order::latest()->get();
        return view('backend.report.sales_report', compact('data', 'title'));

    }
    public function reportPayment(Request $request)
    {

        $title = ['Payment', 'payment'];
        $data = Payment::latest()->get();
        return view('backend.report.payment_report', compact('data', 'title'));

    }
    public function reportPurchase(Request $request)
    {

        $title = ['Purchase', 'purchase'];
        $data = Purchase::latest()->get();
        return view('backend.report.purchase_report', compact('data', 'title'));

    }
    public function saleReturn(Request $request)
    {

        $title = ['Sales', 'invoice'];
        $data = Order::latest()->get();
        return view('backend.report.sale_return', compact('data', 'title'));

    }
    public function profitLoss(Request $request)
    {

        $title = ['Sales', 'invoice'];
        $data = Order::latest()->get();
        return view('backend.report.profit_loss', compact('data', 'title'));

    }
}
