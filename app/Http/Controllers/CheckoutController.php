<?php

namespace App\Http\Controllers;

use App\Http\Resources\CartResource;
use App\Http\Resources\GuestCartResource;
use App\Models\Order;
use App\Models\ShippingCost;
use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function index(Request $request)
    {

        return Inertia::render('Checkout', [
            'shipping' => ShippingCost::all()
        ]);
    }

public function store(Request $request)
{
    $validated = $request->validate([
        'customer_id' => 'nullable|integer|exists:customers,id',
        'warehouse_id' => 'nullable|integer|exists:warehouses,id',
        'billing_address' => 'nullable|array',
        'shipping_address' => 'nullable|array',
        'note' => 'nullable|string',
        'delivery_method' => 'nullable|in:COD,PICKUP,COURIER',
    ]);

    $cart = auth()->check()
        ? (new CartResource(auth()->user()->cart()->with('items.variant.product')->first()))->toArray($request)
        : (new GuestCartResource(session('cart', [])))->toArray($request);

    if (empty($cart['items']) || count($cart['items']) === 0) {
        return response()->json(['message' => 'Your cart is empty. Please add items before checking out.'], 422);
    }

    $invoiceNo = IdGenerator::generate([
        'table' => 'orders',
        'field' => 'invoice_no',
        'length' => 15,
        'prefix' => 'EPOS-' . now()->format('Ymd') . '-',
        'reset_on_prefix_change' => true
    ]);

    $totalProducts = collect($cart['items'])->sum('quantity');

    DB::beginTransaction();
    try {
        $order = Order::create([
            'tenant_id' => tenant('id'),
            'user_id' => auth()->id(),
            'customer_id' => $validated['customer_id'] ?? null,
            'warehouse_id' => $validated['warehouse_id'] ?? null,
            'order_type' => $validated['order_type'] ?? 'online',
            'order_date' => now()->toDateString(),
            'order_status' => 0,
            'total_products' => $totalProducts,
            'subtotal' => $cart['subtotal'],
            'shipping_cost' => $cart['shipping_cost'],
            'total_discount' => $cart['discount'],
            'tax' => $cart['tax'],
            'invoice_no' => $invoiceNo,
            'total' => $cart['total'],
            'payment_status' => 'UNPAID',
            'billing_address' => isset($validated['billing_address']) ? json_encode($validated['billing_address']) : null,
            'shipping_address' => isset($validated['shipping_address']) ? json_encode($validated['shipping_address']) : null,
            'delivery_method' => $validated['delivery_method'] ?? 'COD',
            'delivery_status' => 'PENDING',
            'paid' => 0,
            'due' => $cart['total'],
            'note' => $validated['note'] ?? null,
        ]);

        foreach ($cart['items'] as $item) {
            $productId = $item['product']['id'] ?? null;
            $variantId = $item['variant']['id'] ?? null;
            $price = $item['variant']['price'] ?? $item['product']['price'];

            $order->items()->create([
                 'tenant_id' => tenant('id'),
                'product_id' => $productId,
                'product_variant_id' => $variantId,
                'quantity' => $item['quantity'],
                'unit_cost' => $price,
                'discount' => $item['discount'] ?? 0,
                'tax' => $item['tax'] ?? 0,
                'total' => ($price * $item['quantity']) - ($item['discount'] ?? 0) + ($item['tax'] ?? 0),
            ]);
        }

        if (auth()->check()) {
            auth()->user()->cart()->delete();
        } else {
            session()->forget('cart');
        }

        DB::commit();

        return Inertia::render('OrderConfirmed', [
            'order' => $order->load('user', 'items', 'items.product')
        ])->with('success', "{$order->invoice_no} created successfully.");

    } catch (\Throwable $e) {
        DB::rollBack();
        return response()->json(['message' => 'Order failed.', 'error' => $e->getMessage()], 500);
    }
}

    public function OrderConfirmed()
    {
        $data = Order::with('user', 'items', 'items.product')->where('id', 61)->first();
        return Inertia::render('OrderConfirmed', ['order' => $data]);
    }
}
