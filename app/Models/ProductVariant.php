<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductVariant extends Model
{
    use HasFactory;

    protected $guarded = [];

 public function product()
    {
        return $this->belongsTo(Product::class);
    }

// public function attributeValues()
// {
//     return $this->belongsToMany(AttributeValue::class, 'variant_attribute_values', 'variant_id', 'attribute_value_id');
// }
public function attributeValues()
{
    return $this->belongsToMany(AttributeValue::class, 'variant_attribute_values')
        ->with('attribute'); // Optional: load attribute name like "Color"
}

}
