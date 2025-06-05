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

    public function orderdetails(){
        return $this->hasMany(OrderDetails::class);
    }
    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

}
