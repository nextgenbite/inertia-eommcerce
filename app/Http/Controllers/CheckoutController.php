<?php

namespace App\Http\Controllers;

use App\Http\Resources\CartResource;
use App\Http\Resources\GuestCartResource;
use App\Models\Order;
use App\Models\ShippingCost;
use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function index(Request $request)
    {
        $dummyCart = [
            [
                'id' => 1,
                'name' => 'Product 1',
                'price' => 100,
                'quantity' => 2,
                'image' => 'https://placeholder.co/150',
            ],
            [
                'id' => 2,
                'name' => 'Product 2',
                'price' => 200,
                'quantity' => 1,
                'image' => 'https://placeholder.co/150',
            ],
        ];
        $total = collect($dummyCart)->sum(function ($item) {
            return $item['price'] * $item['quantity'];
        });
        $cartCount = collect($dummyCart)->sum('quantity');
        return Inertia::render('Checkout', [
            'cart' => $dummyCart,
            'total' => $total,
            'cartCount' => $cartCount,
            'shipping'=> ShippingCost::all()
        ]);
    }

    public function store(Request $request)
    {
        // Validate request data
        $validated = $request->validate([
            'customer_id' => 'nullable|integer|exists:customers,id',
            'warehouse_id' => 'nullable|integer|exists:warehouses,id',
            // 'order_type' => 'required|in:online,offline',
            // 'order_date' => 'required|date',
            'billing_address' => 'nullable|array',
            'shipping_address' => 'nullable|array',
            'note' => 'nullable|string',
            // 'delivery_method' => 'nullable|in:COD,PICKUP,COURIER',
        ]);

        // Get cart data
        if (auth()->check()) {
              $cartModel = auth()->user()->cart()->with('items.variant.product')->first();
            $cart = new CartResource($cartModel);
        } else {
            $cart = new GuestCartResource(session('cart', []));
        }
        if (empty($cart) || count($cart->items) === 0) {
            return response()->json(['message' => 'Your cart is empty. Please add items before checking out.'], 422);
        }

        // Calculate totals
        $totalProducts = collect($cart->items)->sum('quantity');

        // Generate invoice number (simple example)
        $invoiceNo =  IdGenerator::generate([
            'table' => 'orders',
            'field' => 'invoice_no',
            'length' => 15,
            'prefix' => 'EPOS-' . now()->format('Ymd') . '-',
            'reset_on_prefix_change' => true
        ]);

        // Create order
        $order = Order::create([
            'user_id' => auth()->id(),
            'customer_id' => $validated['customer_id'] ?? null,
            'warehouse_id' => $validated['warehouse_id'] ?? null,
            'order_type' => $validated['order_type'] ?? 'online',
            'order_date' =>  now()->toDateString(),
            'order_status' => 0,
            'total_products' => $totalProducts,
            'subtotal' => $cart->subtotal,
            'shipping_cost' => $cart->shipping_cost,
            'total_discount' => $cart->discount,
            'tax' => $cart->tax,
            'invoice_no' => $invoiceNo,
            'total' => $cart->total,
            'payment_status' => 'UNPAID',
            'billing_address' => $validated['billing_address'] ?  json_encode($validated['billing_address']) : null,
            'shipping_address' => $validated['billing_address'] ?  json_encode($validated['billing_address']) : null,
            'delivery_method' => $validated['delivery_method'] ?? 'COD',
            'delivery_status' => 'PENDING',
            'paid' => 0,
            'due' => $cart->total,
            'note' => $validated['note'] ?? null,
        ]);

        // Optionally, save order details/items here
        foreach ($cart->items as $item) {
            $price = $item->product->discount_price ?? $item->product->price;
            $order->items()->create([
                'product_id'         => $item['product_id'] ?? $item['id'] ?? null,
                'product_variant_id' => $item['variant_id'] ?? $item['product_variant_id'] ?? null,
                'quantity'           => $item['quantity'],
                'unit_cost'          => $price,
                'discount'           => $item['discount'] ?? 0,
                'tax'                => $item['vat'] ?? 0,
                'total'              => ($price * $item['quantity']) - ($item['discount'] ?? 0) + ($item['vat'] ?? 0),
            ]);
        }
        // Clear cart after order
        if (auth()->check()) {
            auth()->user()->cart()->delete();
        } else {
            session()->forget('cart');
        }
   return Inertia::render('OrderConfirmed', ['order' => $order->load('items')])->with('success', "{$order->invoice_no} created successfully.");
        // return response()->json([
        //     'message' => 'Order placed successfully!',
        //     'order_id' => $order->id,
        //     'invoice_no' => $order->invoice_no,
        // ]);
    }

    public function OrderConfirmed()
    {
        $data = Order::with('user', 'items', 'items.product')->where('id', 30)->first();
        return Inertia::render('OrderConfirmed', ['order' => $data]);
    }
}
