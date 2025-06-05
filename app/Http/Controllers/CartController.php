<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\{GuestCartResource, CartResource};
use App\Models\{Cart, CartItem, ProductVariant};

class CartController extends Controller
{
    use \App\Traits\ApiReturnFormatTrait;
 public function index()
    {
        if (auth()->check()) {
            $cart = auth()->user()->cart()->with('items.variant.product')->first();
            return $this->responseWithSuccess('Cart retrieved successfully',(new CartResource($cart))->toArray(request()));
        }

         $sessionCart = session('cart', []);
        return $this->responseWithSuccess('Cart retrieved successfully', (new GuestCartResource($sessionCart))->toArray(request()));

    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'variant_id' => ['nullable', 'exists:product_variants,id'],
            'product_id' => ['nullable', 'exists:products,id'],
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        if (auth()->check()) {
            $cart = auth()->user()->cart()->firstOrCreate([]);

            $cartItem = $cart->items()->firstOrNew([
                'variant_id' => $validated['variant_id'] ?? null,
                'product_id' => $validated['product_id'] ?? null,
            ]);

            $cartItem->quantity += $validated['quantity'];
            $cartItem->save();

            $this->recalculateCartSummary($cart);
        } else {
            $cart = session()->get('cart', []);

            $existingKey = null;
            foreach ($cart as $key => $item) {
                if (
                    (isset($validated['variant_id']) && isset($item['variant_id']) && $item['variant_id'] == $validated['variant_id']) ||
                    (!isset($validated['variant_id']) && isset($item['product_id']) && $item['product_id'] == $validated['product_id'])
                ) {
                    $existingKey = $key;
                    break;
                }
            }

            if ($existingKey !== null) {
                $cart[$existingKey]['quantity'] += $validated['quantity'];
            } else {
                $key = uniqid();
                $cart[$key] = [
                    'variant_id' => $validated['variant_id'] ?? null,
                    'product_id' => $validated['product_id'] ?? null,
                    'quantity' => $validated['quantity']
                ];
            }

            session()->put('cart', $cart);
        }
        return $this->responseWithSuccess(
            'Item added to cart',
            auth()->check()
                ? (new CartResource($cart))->toArray(request())
                : (new GuestCartResource(session('cart', [])))->toArray(request())
        );
    }

    protected function recalculateCartSummary(Cart $cart)
    {
        $subtotal = $cart->items->sum(fn($item) => ($item->variant?->price? $item->variant?->price : ($item->product->discount_price ?: $item->product->price)) * $item->quantity);
        $shipping = 5;
        $tax = $subtotal * 0.1;
        $discount = 0;
        $total = $subtotal + $shipping + $tax - $discount;

        $cart->update([
            'subtotal' => $subtotal,
            'shipping_cost' => $shipping,
            'tax' => $tax,
            'discount' => $discount,
            'total' => $total,
        ]);
    }
public function update(Request $request)
{
    $validated = $request->validate([
        'variant_id' => ['nullable', 'exists:product_variants,id'],
        'product_id' => ['nullable', 'exists:products,id'],
        'quantity' => ['required', 'integer', 'min:1'],
    ]);

    // Ensure at least one identifier is provided
    if (empty($validated['variant_id']) && empty($validated['product_id'])) {
        return $this->responseWithError('No identifier provided for update.', 422);
    }

    if (auth()->check()) {
        $cart = auth()->user()->cart()->first();
        $query = $cart->items();

        if (!empty($validated['variant_id'])) {
            $query->where('variant_id', $validated['variant_id']);
        } elseif (!empty($validated['product_id'])) {
            $query->where('product_id', $validated['product_id']);
        }

        $item = $query->first();

        if ($item) {
            $item->quantity = $validated['quantity'];
            $item->save();
            $this->recalculateCartSummary($cart);
        }
    } else {
        $cart = session()->get('cart', []);
        foreach ($cart as &$item) {
            if (
                (!empty($validated['variant_id']) && isset($item['variant_id']) && $item['variant_id'] == $validated['variant_id']) ||
                (!empty($validated['product_id']) && isset($item['product_id']) && $item['product_id'] == $validated['product_id'])
            ) {
                $item['quantity'] = $validated['quantity'];
            }
        }
        unset($item); // break reference
        session()->put('cart', $cart);
    }

    return $this->responseWithSuccess(
        'Item updated in cart',
        auth()->check()
            ? (new CartResource($cart))->toArray(request())
            : (new GuestCartResource(session('cart', [])))->toArray(request())
    );
}


public function destroy(Request $request)
{
    $validated = $request->validate([
        'variant_id' => ['nullable', 'exists:product_variants,id'],
        'product_id' => ['nullable', 'exists:products,id'],
    ]);

    // Ensure at least one identifier is provided
    if (empty($validated['variant_id']) && empty($validated['product_id'])) {
        return $this->responseWithError('No identifier provided for deletion.', 422);
    }

    if (auth()->check()) {
        $cart = auth()->user()->cart()->first();
        $query = $cart->items();

        if (!empty($validated['variant_id'])) {
            $query->where('variant_id', $validated['variant_id']);
        } elseif (!empty($validated['product_id'])) {
            $query->where('product_id', $validated['product_id']);
        }

        $query->delete();
        $this->recalculateCartSummary($cart);
    } else {
        $cart = session()->get('cart', []);
        $cart = array_filter($cart, function ($item) use ($validated) {
            if (!empty($validated['variant_id'])) {
                return $item['variant_id'] != $validated['variant_id'];
            } elseif (!empty($validated['product_id'])) {
                return $item['product_id'] != $validated['product_id'];
            }
            return true;
        });
        session()->put('cart', $cart);
    }

    return $this->responseWithSuccess(
        'Item deleted from cart',
        auth()->check()
            ? (new CartResource($cart))->toArray(request())
            : (new GuestCartResource(session('cart', [])))->toArray(request())
    );
}




}
