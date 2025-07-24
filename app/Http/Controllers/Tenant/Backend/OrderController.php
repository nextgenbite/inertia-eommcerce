<?php

namespace App\Http\Controllers\Tenant\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\IndexOrderRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Customer;
use App\Models\Order;
use App\Models\Orderdetails;
use App\Models\Payment;
use App\Models\Warehouse;
use App\Repositories\Interfaces\Order\OrderInterface;
use App\Traits\ApiReturnFormatTrait;
use Carbon\Carbon;
use Gloudemans\Shoppingcart\Facades\Cart;
use DB;
use Barryvdh\DomPDF\Facade\Pdf;
use Haruncpi\LaravelIdGenerator\IdGenerator;

class OrderController extends Controller
{


    public $title = ['Invoice', 'invoice'];


    use ApiReturnFormatTrait;
    protected  $order;

    public function __construct(OrderInterface $order)
    {
        $this->order = $order;

        // $this->middleware('permission:product.create', ['only' => ['create', 'store']]);
        // $this->middleware('permission:product.view', ['only' => ['index', 'show']]);
        // $this->middleware('permission:product.edit', ['only' => ['edit', 'update']]);
        // $this->middleware('permission:product.delete', ['only' => ['destroy', 'destroyBulk']]);

    }
    public function index(IndexOrderRequest $request)
    {
        $data = Order::query();
        if ($request->has('search')) {
            $data->where('invoice_no', 'LIKE', "%" . $request->search . "%");
        }
        if ($request->has(['field', 'order'])) {
            $data->orderBy($request->field, $request->order);
        }
        $data =   array_merge([
            'filters'       => $request->all(['search', 'field', 'order']),
            'getData'         => $data->with('warehouse', 'customer')->paginate(10)

        ], $this->order->baseData());

        return $this->responseWithInertia("Backend/{$this->title[0]}/Index",  $data);
    }
    public function store(Request $request)
    {
        $data = $request->validate([
            'product_id' => 'required|array',
            'product_id.*' => 'exists:products,id',
            'subtotal' => 'required|numeric',
            'total' => 'required|numeric',
            'customer_id' => 'required|numeric',
            'invoice_no' => 'required',
        ]);

        $orderData = [
            'customer_id' => $request->customer_id,
            'order_date' => now()->toDateString(),
            'invoice_no' => $request->invoice_no,
            'sub_total' => $request->subtotal,
            'total_discount' => $request->total_discount ?? 0,
            'vat' => config('cart.tax'),
            'total' => $request->total,
            'billing_address' => json_encode($this->getAddressData($request, 'billing_info')),
            'shipping_address' => json_encode($this->getAddressData($request, 'shipping_info')),
            'payment_status' => $this->calculatePaymentStatus($request->total_paid, $request->total),
            'delivery_status' => $request->filled('is_delivered') ? 'DELIVERED' : 'PENDING', // Changed to filled method for checking the checkbox
            'paid' => $request->total_paid,
            'due' => $request->total - $request->total_paid,
            'note' => $request->note,
        ];

        $order = Order::create($orderData);

        $this->createOrderDetails($order, $request->product_id, $request->quantity, $request->discount_price);

        $this->createPayment($order, $request);
        return response()->json($order, 200);
    } // End Method

    private function getAddressData(Request $request, $type)
{
    return [
        'name' => $request->input($type . '_name'), // Using input method for consistency
        'email' => $request->input($type . '_email'),
        'phone' => $request->input($type . '_phone'),
        'address' => $request->input($type . '_address'),
    ];
}

private function calculatePaymentStatus($totalPaid, $total)
{
    if ($totalPaid == $total) {
        return 'PAID';
    } elseif ($totalPaid > 0 && $totalPaid < $total) {
        return 'PARTIAL';
    } else {
        return 'UNPAID';
    }
}

private function createOrderDetails($order, $productIds, $quantities, $discountPrices)
{
    foreach ($productIds as $key => $productId) {
        $product = Product::findOrFail($productId);
        $order->orderdetails()->create([
            'product_id' => $productId,
            'quantity' => $quantities[$key],
            'discount' => $discountPrices[$key],
            'unitcost' => $product->price,
            'total' => $product->price * $quantities[$key],
        ]);
    }
}

private function createPayment(Order $order, Request $request)
{

    if (!$order) {
        // Handle the case where the order doesn't exist
        return; // Or throw an exception, log an error, etc.
    }

    $bankInfo = [
        'account_number' => $request->input('account_number'),
        'transaction_no' => $request->input('transaction_no'),
        'transaction_date' => $request->input('transaction_date'),
    ];

    $order->payments()->create([
      'customer_id' => $request->customer_id,
      'amount' => $request->total_paid,
      'payment_method' => $request->payment_method,
      'bank_info' => count($bankInfo) > 0 ? json_encode($bankInfo) : null,
    ]);

}
    public function FinalInvoice(Request $request)
    {

        $rtotal = $request->total;
        $rpay = $request->pay;
        $mtotal = $rtotal - $rpay;

        $data = array();
        $data['customer_id'] = $request->customer_id;
        $data['order_date'] = $request->order_date;
        $data['order_status'] = $request->order_status;
        $data['total_products'] = $request->total_products;
        $data['sub_total'] = $request->sub_total;
        $data['vat'] = $request->vat;

        $data['invoice_no'] = 'EPOS' . mt_rand(10000000, 99999999);
        $data['total'] = $request->total;
        $data['payment_status'] = $request->payment_status;
        $data['pay'] = $request->pay;
        $data['due'] = $mtotal;
        $data['created_at'] = Carbon::now();

        $order_id = Order::insertGetId($data);
        $contents = Cart::content();

        $pdata = array();
        foreach ($contents as $content) {
            $pdata['order_id'] = $order_id;
            $pdata['product_id'] = $content->id;
            $pdata['quantity'] = $content->qty;
            $pdata['unitcost'] = $content->price;
            $pdata['total'] = $content->total;

            $insert = Orderdetails::insert($pdata);
        } // end foreach


        $notification = array(
            'message' => 'Order Complete Successfully',
            'alert-type' => 'success'
        );

        Cart::destroy();

        return redirect()->route('dashboard')->with($notification);
    } // End Method


    // public function index()
    // {

    //     $title = $this->title;
    //     $orders = Order::latest()->get();
    //     return view('backend.order.index', compact('orders', 'title'));
    // } // End Method
    public function PendingOrder()
    {

        $orders = Order::where('order_status', 'pending')->get();
        return view('backend.order.create', compact('orders'));
    } // End Method
    function create(Request $request)
    {

        $invoice_number = IdGenerator::generate(['table' => 'orders', 'field' => 'invoice_no', 'length' => 13, 'prefix' => 'EPOS']);

        $customers = Customer::latest()->get();
        $products = Product::latest()->get();
        $warehouses = Warehouse::latest()->get();
        $categories = Category::with('product')->latest()->get();
        return view("backend.order.create", compact('invoice_number', 'warehouses', 'categories', 'products', 'customers'));
    }

    public function CompleteOrder()
    {

        $orders = Order::where('order_status', 'complete')->get();
        return view('backend.order.complete_order', compact('orders'));
    } // End Method


    public function OrderDetails($order_id)
    {
        $title = $this->title;
        $data = Order::findOrFail($order_id);

        $orderItem = Orderdetails::with('product')->where('order_id', $order_id)->orderBy('id', 'DESC')->get();
        return view('backend.order.show', compact('title','data', 'orderItem'));
    } // End Method


    public function OrderStatusUpdate(Request $request)
    {

        $order_id = $request->id;


        $product = Orderdetails::where('order_id', $order_id)->get();
        foreach ($product as $item) {
            Product::where('id', $item->product_id)
                ->update(['product_store' => DB::raw('product_store-' . $item->quantity)]);
        }

        Order::findOrFail($order_id)->update(['order_status' => 'complete']);

        $notification = array(
            'message' => 'Order Done Successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('pending.order')->with($notification);
    } // End Method


    public function StockManage()
    {

        $product = Product::latest()->get();
        return view('backend.stock.all_stock', compact('product'));
    } // End Method


    public function OrderInvoice($order_id)
    {
        // Retrieve the order with the provided order ID
        $order = Order::where('id', $order_id)->first();

        // Retrieve order details along with related product information
        $orderItem = Orderdetails::with('product')
                        ->where('order_id', $order_id)
                        ->orderBy('id', 'DESC')
                        ->get();

        // Generate PDF using DomPDF facade
        $pdf = Pdf::loadView('backend.order.order_invoice', compact('order', 'orderItem'))
                    ->setPaper('a4') // Set paper size to A4
                    ->setOption([
                        'tempDir' => public_path(), // Set temporary directory
                        'chroot' => public_path(), // Set the chroot directory
                    ]);

        // Download the generated PDF with the filename 'invoice.pdf'
        return $pdf->download( $order->invoice_no.'-invoice.pdf');
    }



    public function PendingDue()
    {

        $alldue = Order::where('due', '>', '0')->orderBy('id', 'DESC')->get();
        return view('backend.order.pending_due', compact('alldue'));
    } // End Method


    public function OrderDueAjax($id)
    {

        $order = Order::findOrFail($id);
        return response()->json($order);
    } // End Method


    public function UpdateDue(Request $request)
    {

        $order_id = $request->id;
        $due_amount = $request->due;
        $pay_amount = $request->pay;

        $allorder = Order::findOrFail($order_id);
        $maindue = $allorder->due;
        $maindpay = $allorder->pay;

        $paid_due = $maindue - $due_amount;
        $paid_pay = $maindpay + $due_amount;

        Order::findOrFail($order_id)->update([
            'due' => $paid_due,
            'paid' => $paid_pay,
        ]);

        $notification = array(
            'message' => 'Due Amount Updated Successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('pending.due')->with($notification);
    } // End Method




}
