<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'category' => new CategoryResource($this->whenLoaded('category')),
            'thumbnail' => $this->thumbnail,
            'status' => $this->status,
            'price' => $this->price,
            'discount_price' => $this->discount_price,
            'images' => $this->images,
            'has_variants' => $this->has_variants,
            'variants' => ProductVariantResource::collection($this->whenLoaded('variants')),
            'attributes' => AttributeResource::collection($this->whenLoaded('attributes')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
