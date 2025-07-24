<?php

namespace App\Models;

use Spatie\Permission\Models\Permission as SpatiePermission;
use Stancl\Tenancy\Database\Concerns\BelongsToTenant;

class TenantPermission extends SpatiePermission
{
    use BelongsToTenant;
    protected $guard_name = 'tenant';

    protected static function booted()
    {
        static::addGlobalScope('tenant', function ($builder) {
            if (tenant()) {
                $builder->where('tenant_id', tenant('id'));
            }
        });

        static::creating(function ($model) {
            if (tenant()) {
                $model->tenant_id = tenant('id');
            }
        });
    }
}
