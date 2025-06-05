<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function warehouse(){
        return $this->belongsTo(Warehouse::class);
    }
    public function supplier(){
        return $this->belongsTo(Supplier::class);
    }
    public function purchaseitem(){
        return $this->hasMany(PurchaseItem::class);
    }
}
