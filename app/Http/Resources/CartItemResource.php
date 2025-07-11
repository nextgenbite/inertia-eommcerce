<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'quantity' => $this->quantity,
            'variant' => $this->whenLoaded('variant', function () {
                return [
                    'id' => $this->variant->id,
                    'sku' => $this->variant->sku,
                    'price' => $this->variant->price,
                    'attributes' => $this->variant->attributeValues
                        ->map(fn($av) => [
                            'name' => $av->attribute->display_name,
                            'value' => $av->value,
                        ])
                ];
            }),
            'product' => $this->whenLoaded('product', function () {
                return [
                    'id' => $this->product->id,
                    'title' => $this->product->title,
                    'price' => $this->product->discount_price ?? $this->product->price,
                    'thumbnail' => $this->product->thumbnail,
                    'slug' => $this->product->slug,
                ];
            }),
        ];
    }
}
