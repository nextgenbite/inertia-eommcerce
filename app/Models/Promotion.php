<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    use HasFactory;

  protected $guarded = [];

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }

    public function scopeActive($query)
    {
        return $query->where('status', true)
                     ->where(function ($q) {
                         $q->whereNull('start_time')->orWhere('start_time', '<=', now());
                     })
                     ->where(function ($q) {
                         $q->whereNull('end_time')->orWhere('end_time', '>=', now());
                     });
    }
}
