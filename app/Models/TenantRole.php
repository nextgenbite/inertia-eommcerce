<?php

namespace App\Models;

use Spatie\Permission\Models\Role as SpatieRole;
use Stancl\Tenancy\Database\Concerns\BelongsToTenant;

class TenantRole extends SpatieRole
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
