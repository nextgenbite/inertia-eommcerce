<?php

namespace App\Models;

use Stancl\Tenancy\Database\Models\Tenant as BaseTenant;
use Stancl\Tenancy\Contracts\TenantWithDatabase;
use Stancl\Tenancy\Database\Concerns\HasDatabase;
use Stancl\Tenancy\Database\Concerns\HasDomains;

class Tenant extends BaseTenant implements TenantWithDatabase
{
    use HasDatabase, HasDomains;

        public function getPlanAttribute()
{
    return Plan::find($this->plan_id ?? null);
}

// public function getIsExpiredAttribute()
// {
//     return $this->plan_expires_at && $this->plan_expires_at->isPast();
// }

public function getIsExpiredAttribute()
{
    if (! $this->plan_expires_at) {
        return false;
    }

    return \Carbon\Carbon::parse($this->plan_expires_at)->isPast();
}
}
