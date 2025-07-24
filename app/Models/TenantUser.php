<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Stancl\Tenancy\Database\Concerns\BelongsToTenant;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Traits\HasRoles;

class TenantUser extends Authenticatable
{

    use Notifiable,HasFactory, BelongsToTenant, HasRoles;

    protected $table = 'tenant_users';
    protected $guard_name = 'tenant';

    protected $fillable = [
        'name', 'email', 'password', 'tenant_id',
    ];

    protected $hidden = ['password', 'remember_token'];

       public function getPermissionArray()
    {
        return $this->getAllPermissions()->mapWithKeys(function ($pr) {
            return [$pr['name'] => true];
        });
    }

      public function cart()
    {
        return $this->hasOne(Cart::class);
    }
    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
