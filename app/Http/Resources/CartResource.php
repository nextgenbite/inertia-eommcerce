<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
               return [
            'items' => CartItemResource::collection($this->items),
            'summary' => [
                'count' => $this->items->sum('quantity'),
                'subtotal' => $this->subtotal,
                'shipping_cost' => $this->shipping_cost,
                'tax' => $this->tax,
                'discount' => $this->discount,
                'total' => $this->total,
            ],
        ];
    }
}
