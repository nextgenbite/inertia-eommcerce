<?php

namespace Database\Seeders;

use App\Models\{Tenant, TenantUser, Category, Plan, Post};
use Illuminate\Database\Seeder;
use Stancl\Tenancy\Facades\Tenancy;

class TenancySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get central domain from APP_URL
        $centralDomain = config('tenancy.central_domains')[1];

        // Create first tenant
        $tenant1 = Tenant::create([
            'id' => 'tenant1',
            'company_name' => 'Tenant One Inc.',
            'domain' => "tenant1.{$centralDomain}",
            'name' => 'Tenant One Admin',
            'plan_id' => Plan::inRandomOrder()->first()->id,
            'plan_started_at' => now(),
            'plan_expires_at' => now()->addMonth(), // or addDays(30) or based on plan duration
            'email' => "admin@tenant1.{$centralDomain}",
            'password' => bcrypt('password'),
        ]);
        $tenant1->createDomain(['domain' => "tenant1.{$centralDomain}"]);

        // Create second tenant
        $tenant2 = Tenant::create([
            'id' => 'tenant2',
            'company_name' => 'Tenant Two LLC',
            'domain' => "tenant2.{$centralDomain}",
            'name' => 'Tenant Two Admin',
            'plan_id' => Plan::inRandomOrder()->first()->id,
            'plan_started_at' => now(),
            'plan_expires_at' => now()->addMonth(), // or addDays(30) or based on plan duration
            'email' => "admin@tenant2.{$centralDomain}",
            'password' => bcrypt('password'),
        ]);
        $tenant2->createDomain(['domain' => "tenant2.{$centralDomain}"]);

        // Seed tenant1 data
        // Tenancy::initialize($tenant1);

        // // Create admin user for tenant1
        // $superadmin = TenantUser::create([
        //     'name'              => 'Superadmin',
        //     'email'             => 'superadmin@superadmin.com',
        //     'password'          => bcrypt('superadmin'),
        //     'email_verified_at' => date('Y-m-d H:i')
        // ]);
        // $superadmin->assignRole('superadmin');
        // Tenancy::end();
    }
}
