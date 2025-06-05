<?php

namespace Database\Seeders;

use App\Models\Warehouse;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WarehouseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $warehouses = [
            ['name' => 'Main Warehouse'],
            ['name' => 'Secondary Warehouse'],
            ['name' => 'Outlet Storage'],
        ];

        foreach ($warehouses as $data) {
            Warehouse::create($data);
        }
    }
}
