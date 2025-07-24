<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Stancl\Tenancy\Database\Concerns\BelongsToTenant;

class Cart extends Model
{
  use HasFactory, BelongsToTenant;

  protected $guarded = [];

  public function items()
  {
    return $this->hasMany(CartItem::class);
  }
}
