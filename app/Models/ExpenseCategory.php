<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExpenseCategory extends Model
{
    use HasFactory;
    protected $guarded = [];
    
    public function expense(){
        return $this->hasMany(Expense::class);
    }

       // Define accessor for createdDate
   public function getCreatedDateAttribute()
   {
       return date('d-m-Y', strtotime($this->attributes['created_at']));
   }

   // Define accessor for updatedDate
   public function getUpdatedDateAttribute()
   {
    return date('d-m-Y', strtotime($this->attributes['updated_at']));
   }
   protected $appends = ['created_date', 'updated_date'];
 
}
