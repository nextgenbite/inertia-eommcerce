<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttributeValue extends Model
{
    use HasFactory;
    protected $guarded = [];

 public function attribute()
    {
        return $this->belongsTo(Attribute::class);
    }

    public function variantAttributeValues()
    {
        return $this->hasMany(VariantAttributeValue::class);
    }

    public function productAttributeImages()
    {
        return $this->hasMany(ProductAttributeImage::class);
    }
}
