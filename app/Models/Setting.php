<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Stancl\Tenancy\Database\Concerns\BelongsToTenant;

class Setting extends Model
{
    use HasFactory, BelongsToTenant;
    protected $guarded = [];

    //     public static function getValue($key, $default = null)
    // {
    //     $setting = self::where('key', $key)->first();

    //     return $setting ? $setting->value : $default;
    // }
}
