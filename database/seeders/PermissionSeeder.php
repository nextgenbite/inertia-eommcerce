<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $names = ['role','permission','category', 'sub_category', 'sub_sub_category' , 'brand', 'unit','werehouse', 'product','order','shipping_cost', 'warehouse','user', 'admin','customer', 'supplier',  'purchase','expense_category','expense'


];
        foreach ($names as $name) {

            Permission::updateOrCreate(['name' => $name . '.create', 'group_name' => $name, 'guard_name' => 'web']);
            Permission::updateOrCreate(['name' => $name . '.read', 'group_name' => $name, 'guard_name' => 'web']);
            Permission::updateOrCreate(['name' => $name . '.update', 'group_name' => $name, 'guard_name' => 'web']);
            Permission::updateOrCreate(['name' => $name . '.delete', 'group_name' => $name, 'guard_name' => 'web']);
        }
    }
}
