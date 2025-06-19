<?php

namespace Database\Seeders;

use App\Models\Attribute;
use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Inventory;
use App\Models\Product;
use App\Models\Warehouse;
use App\Models\Color;
use App\Models\ProductVariant;
use App\Models\Size;
use Illuminate\Support\Str;

class InventorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $color = Attribute::where('name', 'color')->first();
        $size = Attribute::where('name', 'size')->first();

        $green = $color->values()->updateOrCreate(
            ['value' => 'Green']
        );
        $lime = $color->values()->updateOrCreate(
            ['value' => 'Lime']
        );

        $xl = $size->values()->updateOrCreate(
            ['value' => 'XL']
        );
        $xxl = $size->values()->updateOrCreate(
            ['value' => 'XXL']
        );

        $product = Product::updateOrCreate(
            ['title' => 'T-shirt 2'],
            [
                'slug' => Str::slug('T-shirt 2'),
                'category_id' => Category::first()->id,
                'description' => 'A cool T-shirt',
                'price' => 20,
                'has_variants' => true,
            ]
        );

        $variant1 = $product->variants()->updateOrCreate(
            ['sku' => 'TSH-Green-XL'],
            [
                'price' => 25,
                'quantity' => 10,
            ]
        );

        $variant1->attributeValues()->syncWithoutDetaching([$green->id, $xl->id]);

        $variant2 = $product->variants()->updateOrCreate(
            ['sku' => 'TSH-BLU-XXL'],
            [
                'price' => 27,
                'quantity' => 8,
            ]
        );

        $variant2->attributeValues()->syncWithoutDetaching([$lime->id, $xxl->id]);

        $product->attributeImages()->updateOrCreate(
            [
                'attribute_value_id' => $green->id,
            ],
            [
                'image_path' => 'images/products/Green-shirt.jpg',
            ]
        );
    }
}
