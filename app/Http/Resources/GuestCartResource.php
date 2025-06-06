<?php

namespace App\Http\Resources;

use App\Models\{Product,ProductVariant};
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GuestCartResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
  public function toArray($request)
    {
        $cart = $this->resource;

        $items = collect($cart)->map(function ($item, $key) {
            $quantity = $item['quantity'] ?? 1;

            if (!empty($item['variant_id'])) {
                $variant = ProductVariant::with('product')->find($item['variant_id']);
                if (!$variant) return null;

                return [
                    'id' => $key,
                    'quantity' => $quantity,
                    'variant' => [
                        'id' => $variant->id,
                        'sku' => $variant->sku,
                        'price' => $variant->price,
                        'attributes' => $variant->attributeValues()
                            ->with('attribute')
                            ->get()
                            ->map(fn($av) => [
                                'name' => $av->attribute->display_name,
                                'value' => $av->value,
                                'image' => $av->image,
                            ])
                    ],
                    'product' => [
                        'id' => $variant->product->id,
                        'title' => $variant->product->title,
                        'price' => $variant->product->price,
                        'thumbnail' => $variant->product->thumbnail,
                    ]
                ];
            }

            if (!empty($item['product_id'])) {
                $product = Product::find($item['product_id']);
                if (!$product) return null;

                return [
                    'id' => $key,
                    'quantity' => $quantity,
                    'variant' => null,
                    'product' => [
                        'id' => $product->id,
                        'title' => $product->title,
                        'price' => $product?->discount_price ?:$product?->price,
                        'thumbnail' => $product->thumbnail,
                    ]
                ];
            }

            return null;
        })->filter()->values();

        $subtotal = $items->sum(function ($item) {
            return ($item['variant']['price'] ?? $item['product']['price']) * $item['quantity'];
        });

        $shipping = 5;
        $tax = $subtotal * 0.1;
        $discount = 0;
        $total = $subtotal + $shipping - $discount;
        // $total = $subtotal + $shipping + $tax - $discount;

        return [
            'items' => $items,
            'subtotal' => $subtotal,
            'shipping_cost' => $shipping,
            'tax' => $tax,
            'discount' => $discount,
            'total' => $total,
        ];
    }
}
