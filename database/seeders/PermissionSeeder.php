<?php

namespace Database\Seeders;


use App\Models\Tenant;
use App\Models\TenantPermission;
use App\Models\TenantRole;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Stancl\Tenancy\Facades\Tenancy;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // $names = [
        //     'role', 'permission', 'category', 'sub_category', 'sub_sub_category', 'brand', 'unit', 'werehouse', 'warehouse', 'product', 'order', 'shipping_cost', 'user', 'admin', 'customer', 'supplier', 'purchase', 'expense_category', 'expense', 'promotion', 'slider', 'sales', 'report', 'setting', 'contact', 'employee'
        // ];



        // foreach ($names as $name) {

        //     Permission::updateOrCreate(['name' => $name . '.create', 'group_name' => $name, 'guard_name' => 'tenant']);
        //     Permission::updateOrCreate(['name' => $name . '.read', 'group_name' => $name, 'guard_name' => 'tenant']);
        //     Permission::updateOrCreate(['name' => $name . '.update', 'group_name' => $name, 'guard_name' => 'tenant']);
        //     Permission::updateOrCreate(['name' => $name . '.delete', 'group_name' => $name, 'guard_name' => 'tenant']);
        // }

        $permissions = [
            ['name' => 'dashboard.menu', 'group_name' => 'dashboard', 'guard_name' => 'tenant'],

            ['name' => 'pos.menu', 'group_name' => 'pos', 'guard_name' => 'tenant'],

            ['name' => 'user.menu', 'group_name' => 'user', 'guard_name' => 'tenant'],
            ['name' => 'user.read', 'group_name' => 'user', 'guard_name' => 'tenant'],
            ['name' => 'user.create', 'group_name' => 'user', 'guard_name' => 'tenant'],
            ['name' => 'user..update', 'group_name' => 'user', 'guard_name' => 'tenant'],
            ['name' => 'user.delete', 'group_name' => 'user', 'guard_name' => 'tenant'],

            ['name' => 'admin.read', 'group_name' => 'admin', 'guard_name' => 'tenant'],
            ['name' => 'admin.create', 'group_name' => 'admin', 'guard_name' => 'tenant'],
            ['name' => 'admin..update', 'group_name' => 'admin', 'guard_name' => 'tenant'],
            ['name' => 'admin.delete', 'group_name' => 'admin', 'guard_name' => 'tenant'],

            ['name' => 'employee.read', 'group_name' => 'employee', 'guard_name' => 'tenant'],
            ['name' => 'employee.create', 'group_name' => 'employee', 'guard_name' => 'tenant'],
            ['name' => 'employee..update', 'group_name' => 'employee', 'guard_name' => 'tenant'],
            ['name' => 'employee.delete', 'group_name' => 'employee', 'guard_name' => 'tenant'],

            ['name' => 'roles.menu', 'group_name' => 'role', 'guard_name' => 'tenant'],
            ['name' => 'role.read', 'group_name' => 'role', 'guard_name' => 'tenant'],
            ['name' => 'role.create', 'group_name' => 'role', 'guard_name' => 'tenant'],
            ['name' => 'role..update', 'group_name' => 'role', 'guard_name' => 'tenant'],
            ['name' => 'role.delete', 'group_name' => 'role', 'guard_name' => 'tenant'],

            ['name' => 'permission.menu', 'group_name' => 'permission', 'guard_name' => 'tenant'],
            ['name' => 'permission.read', 'group_name' => 'permission', 'guard_name' => 'tenant'],
            ['name' => 'permission.create', 'group_name' => 'permission', 'guard_name' => 'tenant'],
            ['name' => 'permission..update', 'group_name' => 'permission', 'guard_name' => 'tenant'],
            ['name' => 'permission.delete', 'group_name' => 'permission', 'guard_name' => 'tenant'],

            ['name' => 'contact.menu', 'group_name' => 'contact', 'guard_name' => 'tenant'],
            ['name' => 'contact.read', 'group_name' => 'contact', 'guard_name' => 'tenant'],
            ['name' => 'contact.create', 'group_name' => 'contact', 'guard_name' => 'tenant'],
            ['name' => 'contact..update', 'group_name' => 'contact', 'guard_name' => 'tenant'],
            ['name' => 'contact.delete', 'group_name' => 'contact', 'guard_name' => 'tenant'],

            ['name' => 'product.menu', 'group_name' => 'product', 'guard_name' => 'tenant'],
            ['name' => 'product.read', 'group_name' => 'product', 'guard_name' => 'tenant'],
            ['name' => 'product.create', 'group_name' => 'product', 'guard_name' => 'tenant'],
            ['name' => 'product..update', 'group_name' => 'product', 'guard_name' => 'tenant'],
            ['name' => 'product.delete', 'group_name' => 'product', 'guard_name' => 'tenant'],

            ['name' => 'category.menu', 'group_name' => 'category', 'guard_name' => 'tenant'],
            ['name' => 'category.read', 'group_name' => 'category', 'guard_name' => 'tenant'],
            ['name' => 'category.create', 'group_name' => 'category', 'guard_name' => 'tenant'],
            ['name' => 'category..update', 'group_name' => 'category', 'guard_name' => 'tenant'],
            ['name' => 'category.delete', 'group_name' => 'category', 'guard_name' => 'tenant'],

            ['name' => 'brand.menu', 'group_name' => 'brand', 'guard_name' => 'tenant'],
            ['name' => 'brand.read', 'group_name' => 'brand', 'guard_name' => 'tenant'],
            ['name' => 'brand.create', 'group_name' => 'brand', 'guard_name' => 'tenant'],
            ['name' => 'brand..update', 'group_name' => 'brand', 'guard_name' => 'tenant'],
            ['name' => 'brand.delete', 'group_name' => 'brand', 'guard_name' => 'tenant'],

            ['name' => 'supplier.menu', 'group_name' => 'supplier', 'guard_name' => 'tenant'],
            ['name' => 'supplier.read', 'group_name' => 'supplier', 'guard_name' => 'tenant'],
            ['name' => 'supplier.create', 'group_name' => 'supplier', 'guard_name' => 'tenant'],
            ['name' => 'supplier..update', 'group_name' => 'supplier', 'guard_name' => 'tenant'],
            ['name' => 'supplier.delete', 'group_name' => 'supplier', 'guard_name' => 'tenant'],

            ['name' => 'customer.menu', 'group_name' => 'customer', 'guard_name' => 'tenant'],
            ['name' => 'customer.read', 'group_name' => 'customer', 'guard_name' => 'tenant'],
            ['name' => 'customer.create', 'group_name' => 'customer', 'guard_name' => 'tenant'],
            ['name' => 'customer..update', 'group_name' => 'customer', 'guard_name' => 'tenant'],
            ['name' => 'customer.delete', 'group_name' => 'customer', 'guard_name' => 'tenant'],

            ['name' => 'sales.menu', 'group_name' => 'sales', 'guard_name' => 'tenant'],
            ['name' => 'sales.read', 'group_name' => 'sales', 'guard_name' => 'tenant'],
            ['name' => 'sales.create', 'group_name' => 'sales', 'guard_name' => 'tenant'],
            ['name' => 'sales..update', 'group_name' => 'sales', 'guard_name' => 'tenant'],
            ['name' => 'sales.delete', 'group_name' => 'sales', 'guard_name' => 'tenant'],

            ['name' => 'purchase.menu', 'group_name' => 'purchase', 'guard_name' => 'tenant'],
            ['name' => 'purchase.read', 'group_name' => 'purchase', 'guard_name' => 'tenant'],
            ['name' => 'purchase.create', 'group_name' => 'purchase', 'guard_name' => 'tenant'],
            ['name' => 'purchase..update', 'group_name' => 'purchase', 'guard_name' => 'tenant'],
            ['name' => 'purchase.delete', 'group_name' => 'purchase', 'guard_name' => 'tenant'],

            ['name' => 'expense.menu', 'group_name' => 'expense', 'guard_name' => 'tenant'],
            ['name' => 'expense.read', 'group_name' => 'expense', 'guard_name' => 'tenant'],
            ['name' => 'expense.create', 'group_name' => 'expense', 'guard_name' => 'tenant'],
            ['name' => 'expense..update', 'group_name' => 'expense', 'guard_name' => 'tenant'],
            ['name' => 'expense.delete', 'group_name' => 'expense', 'guard_name' => 'tenant'],

            ['name' => 'report.menu', 'group_name' => 'report', 'guard_name' => 'tenant'],

            ['name' => 'setting.menu', 'group_name' => 'setting', 'guard_name' => 'tenant'],
            ['name' => 'setting.general', 'group_name' => 'setting', 'guard_name' => 'tenant'],
            ['name' => 'setting.payment', 'group_name' => 'setting', 'guard_name' => 'tenant'],
            ['name' => 'setting.email', 'group_name' => 'setting', 'guard_name' => 'tenant'],
            ['name' => 'setting.sms', 'group_name' => 'setting', 'guard_name' => 'tenant'],

            ['name' => 'backup.menu', 'group_name' => 'backup', 'guard_name' => 'tenant'],
            ['name' => 'backup.create', 'group_name' => 'backup', 'guard_name' => 'tenant'],
            ['name' => 'backup.download', 'group_name' => 'backup', 'guard_name' => 'tenant'],
            ['name' => 'backup.delete', 'group_name' => 'backup', 'guard_name' => 'tenant'],

            ['name' => 'activitylog.menu', 'group_name' => 'activitylog', 'guard_name' => 'tenant'],
            ['name' => 'activitylog.read', 'group_name' => 'activitylog', 'guard_name' => 'tenant'],

            ['name' => 'notification.menu', 'group_name' => 'notification', 'guard_name' => 'tenant'],
            ['name' => 'notification.send', 'group_name' => 'notification', 'guard_name' => 'tenant'],
            ['name' => 'notification.read', 'group_name' => 'notification', 'guard_name' => 'tenant'],

            // Add or adjust more to reach 121
        ];


        // Loop through all tenants
        foreach (Tenant::all() as $tenant) {
            tenancy()->initialize($tenant);

            foreach ($permissions as $permission) {
                TenantPermission::updateOrCreate(
                    ['name' => $permission['name'], 'guard_name' => $permission['guard_name']],
                    [
                        ...$permission,
                        'tenant_id' => $tenant->id,
                    ]
                );
            }

            $role = TenantRole::firstOrCreate([
                 'tenant_id' => $tenant->id,
                'name' => 'superadmin',
                'guard_name' => 'tenant',
                'group_name' => 'superadmin',
            ]);

            $role->syncPermissions(TenantPermission::all());

            tenancy()->end();
        };
    }
}
