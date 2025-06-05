<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function expenseCategory()
    {
        return $this->belongsTo(ExpenseCategory::class);
    }
    public function GetCreatedDateAttribute()
    {
        return $this->created_at ? $this->created_at->format('Y-m-d H:i:s') : null ;
    }
}
