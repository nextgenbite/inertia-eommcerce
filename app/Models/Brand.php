<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function scopeActive($query) {
        return $query->where('status', true);
    }
     public function products(){
        return $this->hasMany(Product::class,'brand_id','id');
    }

}
