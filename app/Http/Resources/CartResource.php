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
                'count' => $this->items->sum('quantity'),
                'subtotal' => $this->subtotal,
                'shipping_cost' => $this->shipping_cost ?? 0,
                'tax' => $this->tax ?? 0,
                'discount' => $this->discount ?? 0,
                'total' => $this->total,
        ];
    }
}
