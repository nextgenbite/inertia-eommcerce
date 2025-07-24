<?php

namespace App\Http\Controllers\Tenant\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\{Category, Product, Customer, Order};

class Pos_2_Controller extends Controller
{
    public function index()
    {
        //get last record
        $sell = Order::latest()->first();



        $customers = Customer::latest()->get();
        $products = Product::latest()->get();
        $categories = Category::with('product')->latest()->get();
        return view("backend.pos_2.index", compact('categories', 'products', 'customers', 'sell'));
    }
    public function searchProduct()
    {
        if (request()->ajax()) {

            $data = Product::where("title", "Like", "%" . request()->search . "%")
            ->orwhere('sku',request()->search)
            ->orWhere('barcode', request()->search)
            ->first();
            return  response()->json(["data" => $data], 200);
        }
    }
    public function searchCustomer()
    {
        if (request()->ajax()) {

            $data = Customer::where("name", "Like", "%" . request()->search . "%")->first();
            return  response()->json(["data" => $data], 200);
        }
    }
    public function productShow($id)
    {
        if (request()->ajax()) {

            $data = Product::findOrFail($id);
            return  response()->json(["data" => $data], 200);
        }
    }

    public function Posinvoice($id)
    {
        return view("backend.pos_2.miniinvoice
        ");
    }

    public function  store(Request $request)
    {
        return $request->all();

        $data = $request->validate([
            // 'order_type' => 'required',
            'product_id' => 'required|array',
            'product_id.*' => 'exists:products,id',
            'final_amount' => 'required|numeric',
            'customer_id' => 'required|numeric',
            'discount_amount' => 'nullable|numeric',
            // 'tax_amount'=> 'nullable|numeric',
            // 'tax'=> 'nullable|numeric',
            // 'invoice_no'=> '',
        ]);


        $data["user_id"] = auth()->user()->id;
        $data["sell_date"] = date("Y-m-d");
        $data["invoice_no"] = $request->invoice_no;
        // $sell = Order::create($data);
        $sell = Order::create([
            'total' =>$data['final_amount'],
            'customer_id' =>$data['customer_id'],
        ]);
        foreach ($request->product_id as $key => $product) {
            $qty = $request->quantity[$key];
            $dataProducts = [
                'product_id' => $product,
                'quantity' => $qty,
                'unit_price' => $request->unit_price[$key],
                'discount' => $request->discount[$key],
            ];

            $sell->sellitem()->create($dataProducts);
        };
        return response()->json($sell, 200);
    }
}
