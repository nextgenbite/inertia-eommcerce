<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function customer(){
        return $this->belongsTo(Customer::class,'customer_id','id');
    }
    public function user(){
        return $this->belongsTo(User::class,'user_id','id');
    }
    public function warehouse(){
        return $this->belongsTo(Warehouse::class);
    }

    public function items(){
        return $this->hasMany(OrderDetails::class, 'order_id','id');
    }
    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

}
