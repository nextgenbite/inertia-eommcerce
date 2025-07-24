<?php

namespace Database\Seeders;

use App\Models\Tenant;
use App\Models\TenantUser;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Stancl\Tenancy\Facades\Tenancy;

class TenantRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
          Tenancy::initialize(Tenant::first());
         $superadmin = TenantUser::create([
            'name'              => 'Superadmin',
            'email'             => 'superadmin@superadmin.com',
            'password'          => bcrypt('superadmin'),
            'email_verified_at' => date('Y-m-d H:i')
        ]);
        $superadmin->assignRole('superadmin');

        $admin = TenantUser::create([
            'name'              => 'Admin',
            'email'             => 'admin@admin.com',
            'password'          => bcrypt('admin'),
            'email_verified_at' => date('Y-m-d H:i')
        ]);
        // $admin->assignRole('admin');

        $operator = TenantUser::create([
            'name'              => 'Operator',
            'email'             => 'operator@operator.com',
            'password'          => bcrypt('operator'),
            'email_verified_at' => date('Y-m-d H:i')
        ]);
        // $operator->assignRole('operator');


        $superadmin->assignRole('superadmin');
        Tenancy::end();
    }
}
