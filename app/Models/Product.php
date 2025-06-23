<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function scopeActive($query)
    {
        return $query->where('status', true);
    }
    // Define accessor for createdDate
    // public function getCreatedDateAttribute()
    // {
    //     return date('d-m-Y', strtotime($this->attributes['created_at']));
    // }

    // // Define accessor for updatedDate
    // public function getUpdatedDateAttribute()
    // {
    //     return date('d-m-Y', strtotime($this->attributes['updated_at']));
    // }
    // protected $appends = ['created_date', 'updated_date'];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class, 'brand_id', 'id');
    }

    public function unit()
    {
        return $this->belongsTo(Unit::class, 'unit_id', 'id');
    }

    public function promotions()
    {
        return $this->belongsToMany(Promotion::class);
    }

    //old


    // public function getAttributesAttribute()
    // {
    //     return $this->variants
    //         ->flatMap(function ($variant) {
    //             return $variant->attributeValues;
    //         })
    //         ->pluck('attribute')
    //         ->unique('id')
    //         ->values();
    // }


    // public function attributeValues()
    // {
    //     return $this->belongsToMany(AttributeValue::class, 'variant_attribute_values');
    // }



    //new
    // public function variants()
    // {
    //     return $this->hasMany(ProductVariant::class);
    // }

    // public function attributeImages()
    // {
    //     return $this->hasMany(ProductAttributeImage::class);
    // }

    // public function attributes()
    // {
    //     return $this->belongsToMany(Attribute::class, 'attribute_values', 'id', 'attribute_id')
    //         ->distinct();
    // }

    // public function attributeValues()
    // {
    //     return $this->hasManyThrough(AttributeValue::class, ProductVariant::class, 'product_id', 'id');
    // }

    public function variants()
    {
        return $this->hasMany(ProductVariant::class);
    }

    public function attributes()
    {
        return $this->belongsToMany(Attribute::class, 'attribute_values')
            ->distinct()
            ->withTimestamps();
    }

    public function attributeValues()
    {
        return $this->hasManyThrough(AttributeValue::class, ProductVariant::class, 'product_id', null, 'id', 'id')
            ->distinct();
    }

    public function attributeImages()
    {
        return $this->hasMany(ProductAttributeImage::class);
    }
}
