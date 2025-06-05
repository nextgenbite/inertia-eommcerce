<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\{Inventory, Product, Purchase, PurchaseItem, Supplier, Warehouse};
use Illuminate\Http\Request;
use Carbon\Carbon;
use Haruncpi\LaravelIdGenerator\IdGenerator;


class PurchaseController extends Controller
{
    public $title = ['Purchase', 'purchase'];

    public function index()
    {

        $title = $this->title;
        $data = Purchase::latest()->get();
        return view('backend.purchase.index', compact('data', 'title'));
    } // End Method

    public function create(Request $request)
    {
        $title = $this->title;

        $suppliers = Supplier::latest()->get();
        $warehouses = Warehouse::latest()->get();
        return view('backend.purchase.create', compact('title', 'suppliers', 'warehouses'));
    } // End Method

    public function store(Request $request)
    {
        // Validate the form data
        $request->validate([
            'warehouse_id' => 'required',
            'product_id' => 'required|array',
            'product_id.*' => 'exists:products,id', // Assuming products table and 'id' is the column name
            'quantity' => 'required|array',
            'quantity.*' => 'numeric|min:1',
            'buying_price' => 'required|array',
            'buying_price.*' => 'numeric|min:0',
            'selling_price' => 'required|array',
            'selling_price.*' => 'numeric|min:0',
            'item_note' => 'array', // Adjust validation rules as per your requirements
        ]);

        // Process the form data
        // Here you can save the submitted data to your database or perform any other operations

        $purchaseCode = IdGenerator::generate(['table' => 'purchases', 'field' => 'code', 'length' => 8, 'prefix' => 'pr-']);

        //  $request->all();
        $purchase =    Purchase::insertGetId([
            'supplier_id' => $request->supplier_id,
            'warehouse_id' => $request->warehouse_id,
            'code' => $purchaseCode,
            'date' => $request->date,
            'total_price' => $request->total_price,
            'total_product' => $request->total_quantity,
            'missing_product' => $request->total_quantity,
            'note' => $request->note,
            'created_at' => Carbon::now(),
        ]);

        // // Example: Saving products to database
        foreach ($request->product_id as $key => $productId) {
            PurchaseItem::insert([
                'purchase_id' => $purchase,
                'product_id' => $productId,
                'quantity' => $request->quantity[$key],
                'buying_price' => $request->buying_price[$key],
                'selling_price' => $request->selling_price[$key],
                'note' => $request->note[$key] ?? null,

            ]);
        }


        $notification = array(
            'message' => 'Data Inserted Successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('all.purchase')->with($notification);
    } // End Method


    public function show($id)
    {
        $title = $this->title;
        $data = Purchase::findOrFail($id);
        return view('backend.purchase.show', compact('data', 'title'));
    } // End Method
    public function edit($id)
    {
        $title = $this->title;
        $data = Purchase::with('purchaseItem', 'supplier')->findOrFail($id);
        $suppliers = Supplier::latest()->get();
        $warehouses = Warehouse::latest()->get();

        return view('backend.purchase.edit', compact('data', 'title', 'suppliers', 'warehouses'));
    } // End Method


    public function update(Request $request)
    {

        $data_id = $request->id;

        // return $request->all();

        Purchase::findOrFail($data_id)->update([
            'supplier_id' => $request->supplier_id,
            'warehouse_id' => $request->warehouse_id,
            'code' => $request->code,
            'date' => $request->date,
            'total_price' => $request->total_price,
            'total_product' => $request->total_quantity,
            'missing_product' => $request->total_quantity,
            'note' => $request->note,
        ]);

        // // Example: Saving products to database
        foreach ($request->product_id as $key => $productId) {
            PurchaseItem::wherePurchase_id($data_id)->update([
                'product_id' => $productId,
                'quantity' => $request->quantity[$key],
                'buying_price' => $request->buying_price[$key],
                'selling_price' => $request->selling_price[$key],
                'note' => $request->note[$key] ?? null,

            ]);
        }

        $notification = array(
            'message' => 'Data Updated Successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('all.purchase')->with($notification);
    } // End Method


    public function destroy($id)
    {

        Purchase::findOrFail($id)->delete();

        $notification = array(
            'message' => 'Data Deleted Successfully',
            'alert-type' => 'success'
        );

        return redirect()->back()->with($notification);
    }
    public function cancel($id)
    {
        $title = $this->title;
        $data = Purchase::findOrFail($id);

        return view('backend.purchase.cancel', compact('data', 'title'));
    }
    public function cancelStore(Request $request)
    {
        $request->validate([
            'date' => 'required',
            'note' => 'required|min:5',
        ]);
        $data_id = $request->id;
        Purchase::findOrFail($data_id)->update([
            'status' => 2,
            'return_date' => $request->date,
            'return_note' => $request->note,
        ]);

        $notification = array(
            'message' => 'Data Canceled Successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('all.purchase')->with($notification);
    }
    public function request($id)
    {

        Purchase::findOrFail($id)->update(['status' => 0]);


        $notification = array(
            'message' => 'Data Request Successfully',
            'alert-type' => 'success'
        );

        return redirect()->back()->with($notification);
    }
    public function receive($id)
    {
        $title = $this->title;
        $data = Purchase::findOrFail($id);


        return view('backend.purchase.receive', compact('data', 'title'));
    }
    public function receiveStore(Request $request)
    {
        $request->validate([
            'receive_quantity' => 'required|array',
            'receive_quantity.*' => 'required|numeric',
            'receive_buying_price' => 'required|array',
            'receive_buying_price.*' => 'required|numeric',
        ]);
        // return $request->all();
    
        $data_id = $request->id;
        $data =  Purchase::with('purchaseitem')->findOrFail($data_id);
        $receive_price = array_sum($request->receive_buying_price);
        // Update missing product and set status to 1
        $totalReceiveQuantity = array_sum($request->receive_quantity);
        $missing_product = $data->missing_product - $totalReceiveQuantity;
        $data->update([
            'missing_product' =>  $missing_product,
            'receive_total_price' =>  $receive_price,
            'status' =>  $data->missing_product ==  $totalReceiveQuantity  ? 1 : 2,
        ]);
    
        // Update receive quantity and buying price for each item and insert into inventory
 
        foreach ($data->purchaseitem as  $index => $item) {
            $item->update([
                'receive_quantity' => $item->receive_quantity + $request->receive_quantity[$index],
                'receive_buying_price' =>  $item->receive_buying_price + $request->receive_buying_price[$index],
            ]);
            $product = Product::with('inventory')->findOrFail($item->product_id);
            $product->update([
                'price'=> $item->selling_price,
                'buying_price'=> $item->buying_price,
            ]);
            // $inventory = Inventory::whereProduct_id($item->product_id)->first();

            if ($product->inventory) {
                $product->inventory->update([
                    // 'product_id' => $item->product_id,
                    'warehouse_id' =>  $data->warehouse_id,
                    'quantity' =>  $request->receive_quantity[$index],
                ]);
            } else {
                Inventory::create([
                     'product_id' => $item->product_id,
                    'warehouse_id' =>  $data->warehouse_id,
                    'quantity' =>  $request->receive_quantity[$index],
                ]);
            }
            

        }
    
        $notification = array(
            'message' => 'Data Received Successfully',
            'alert-type' => 'success'
        );
    
        return redirect()->route('all.purchase')->with($notification);
    }
    public function returnIndex()
    {

        $title = $this->title;
        $data = Purchase::where('return_product', '>', 1)->latest()->get();
        return view('backend.purchase.return_index', compact('data', 'title'));
    } // End Method
    public function return($id)
    {
        $title = $this->title;
        $data = Purchase::findOrFail($id);


        return view('backend.purchase.return', compact('data', 'title'));
    }
    public function returnStore(Request $request)
    {
        $request->validate([
            'return_date' => 'required',
            'return_quantity' => 'required|array',
            'return_quantity.*' => 'required|numeric',
            'return_price' => 'required|array',
            'return_price.*' => 'required|numeric',
        ]);
    
        $data_id = $request->id;
        $data =  Purchase::with('purchaseitem')->findOrFail($data_id);
        $return_price = array_sum($request->return_price);
        // Update missing product and set status to 1
        $totalReturnQuantity = array_sum($request->return_quantity);
        $data->update([
            'return_date' =>  $request->return_date,
            'return_note' =>  $request->return_note,
            'return_total_price' => $data->return_total_price + $return_price,
            'return_product' => $data->return_product + $totalReturnQuantity,
        ]);
    
        // Update return quantity and buying price for each item and insert into inventory
 
        foreach ($data->purchaseitem as  $index => $item) {
            $item->update([
                'return_quantity' => $item->return_quantity + $request->return_quantity[$index],
                'return_price' =>  $item->return_price + $request->return_price[$index],
            ]);
            $product = Product::with('inventory')->findOrFail($item->product_id);
       
  

            $product->inventory->update([
                'quantity' => $product->inventory->quantity - $request->return_quantity[$index],
            ]);
        }
    
        $notification = array(
            'message' => 'Data Returnd Successfully',
            'alert-type' => 'success'
        );
    
        return redirect()->route('all.purchase')->with($notification);
    }
    
}
