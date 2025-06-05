<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Inventory;
use App\Models\Product;
use App\Models\Warehouse;
use App\Models\Color;
use App\Models\ProductVariant;
use App\Models\Size;

class InventorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
          // Get sample foreign keys
// Product
$product = Product::create(['title' => 'T-Shirt', 'category_id' => 1, 'price' => 19.99, 'has_variants' => true]);

// Variants
$variant1 = ProductVariant::create(['product_id' => $product->id, 'sku' => 'TSHIRT-RED-SM']);
$variant1->attributeValues()->attach([1, 3]);

$variant2 = ProductVariant::create(['product_id' => $product->id, 'sku' => 'TSHIRT-BLUE-LG']);
$variant2->attributeValues()->attach([2, 4]);

// Inventory
Inventory::create(['variant_id' => $variant1->id, 'quantity' => 10]);
Inventory::create(['variant_id' => $variant2->id, 'quantity' => 5]);
    }
}
