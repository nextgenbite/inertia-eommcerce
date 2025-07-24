<?php

namespace App\Jobs;

use App\Models\Role;
use App\Models\Tenant;
use App\Models\TenantUser;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Artisan;

class SeedTenantAdminJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private Tenant $tenant;
    /**
     * Create a new job instance.
     */
    public function __construct(Tenant $tenant)
    {
        $this->tenant = $tenant;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $this->tenant->run(function () {
            User::create([
                'name' => $this->tenant->name,
                'email' => $this->tenant->email,
                'password' => $this->tenant->password,
                'email_verified_at' => date('Y-m-d H:i')

            ]);
if (Role::where('name', 'superadmin')->first()) {
    //tenant superadmin
tenancy()->initialize($this->tenant); // REQUIRED
Artisan::call('db:seed --class=PermissionSeeder');
$superadmin = TenantUser::create([
    'tenant_id' => $this->tenant->id,
    'name' => $this->tenant->name,
    'email' => $this->tenant->email,
    'password' => bcrypt($this->tenant->password),
    'email_verified_at' => now()
]);

$superadmin->assignRole('superadmin'); // Will only work if the role exists for this tenant

tenancy()->end(); // Don't forget to end the context
}
        });
    }
}
