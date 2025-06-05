<?php

namespace App\Traits;

use App\Models\Category;
use App\Models\Product;
use App\Models\Inventory;
use Illuminate\Http\Request;
use Haruncpi\LaravelIdGenerator\IdGenerator;

trait ProductsTrait
{
    private function processProduct($item)
    {
        try {
            // Check if the product already exists in Laravel
            $existingProduct = Product::where('title', $item->name)->first();
    
            if ($existingProduct) {
                return; // Skip existing products
            }
    
            // Generate SKU and Barcode
            $randomSKU = IdGenerator::generate(['table' => 'products', 'field' => 'sku', 'length' => 6, 'prefix' => 'PC']);
            $randomBarcode = IdGenerator::generate(['table' => 'products', 'field' => 'barcode', 'length' => 13, 'prefix' => '25632490']);
    
            // Store product image
            $thumbnail = null;
            if (!empty($item->images[0]->src)) {
                $thumbnail = $this->storeImageFromJsonLink($item->images[0]->src, 'upload/product', 200, 200);
            }
    
            // Retrieve category
            $category = null;
            if (!empty($item->categories[0]->name)) {
                $category = Category::where('name', $item->categories[0]->name)->first();
            }
    
            // Create or update product
            $product = Product::updateOrCreate(
                ['title' => $item->name],
                [
                    'category_id' => optional($category)->id,
                    'brand_id' => null, // You might want to add brand logic here
                    'unit_id' => null, // You might want to add unit logic here
                    'sku' => $randomSKU,
                    'barcode' => $randomBarcode,
                    'weight' => null, // You might want to add weight logic here
                    'thumbnail' => $thumbnail,
                    'description' => $item->description,
                    'price' => $item->price,
                ]
            );
    
            // If the product was just created, create its inventory
            if ($product->wasRecentlyCreated) {
                Inventory::create([
                    'product_id' => $product->id,
                    'min_alert' => 0, // You might want to add min_alert logic here
                    'max_alert' => 0, // You might want to add max_alert logic here
                    'warehouse_id' => 2, // Ensure this warehouse exists
                ]);
            }
        } catch (\Exception $e) {
            // Handle exception
        }
    }
    
}

