<?php

namespace App\Http\Controllers\Tenant\Backend;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Inventory;
use Illuminate\Http\Request;
use App\Jobs\ProcessProductJob;
use App\Models\Category;
use App\Traits\ImageUploadTrait;
use Automattic\WooCommerce\Client;
use Haruncpi\LaravelIdGenerator\IdGenerator;

class WpController extends Controller
{
    use ImageUploadTrait;
    private $title = 'WoCommerce';

    public function setup()
    {
        $title = $this->title;
        $data = [
            'store_url' => config('woocommerce.store_url'),
            'consumer_key' => config('woocommerce.consumer_key'),
            'consumer_secret' => config('woocommerce.consumer_secret')
        ];
        return view('backend.wocommerce.setup', compact('data', 'title'));
    } // End Method
    public function index()
    {
        $title = $this->title;
        $product = Product::with('category', 'unit', 'inventory')->latest()->get();
        return view('backend.wocommerce.index', compact('product', 'title'));
    } // End Method
    private function woocommerce()
    {
        // Set up WooCommerce client
        $woocommerce = new Client(
            'http://wordpress.test',
            'ck_dff26251d1e79190f194c56c11f48ec4de6e5fdf',
            'cs_afee562d6f02bc2b32bf95430e9f5c6676cea4af',
            [
                'wp_api' => true,
                'version' => 'wc/v3',
            ]
        );
        return $woocommerce;
    }
    public function batchProductStore()
    {
        // Dispatch the job with WooCommerce products
        ProcessProductJob::dispatch($this->woocommerce());

        // Redirect back after dispatching the job
        $notification = array(
            'message' => 'Data sync Successfully',
            'alert-type' => 'success'
        );
        // Redirect back after syncing
        return redirect()->back()->with($notification);
    }

    public function categorySync()
    {
        try {
            // Fetch categories from WooCommerce
            $categories = $this->woocommerce()->get('products/categories', ['per_page' => 100]);

            // Sync categories with local database
            foreach ($categories as $category) {
                // Check if the category already exists in your local database
                $localCategory = Category::where('title', $category->name)->first();

                if (!$localCategory) {
                    // Category doesn't exist, create a new one
                    Category::create([
                        'title' => $category->name,
                        // You may need to map other attributes as needed
                    ]);
                } else {
                    // Category already exists, update if needed
                    $localCategory->update([
                        'title' => $category->name,
                        // You may need to update other attributes as needed
                    ]);
                }
            }
            $notification = array(
                'message' => 'Data sync Successfully',
                'alert-type' => 'success'
            );
            // Redirect back after syncing
            return redirect()->back()->with($notification);
        } catch (\Exception $e) {
            // Handle exception
        }
    }

    // public function batchProductStore()
    // {


    //     // Initialize variables for pagination
    //     $page = 1;
    //     $perPage = 100; // Adjust as needed

    //     // Process products in batches
    //     do {
    //         // Fetch products for the current page
    //         $products = $this->woocommerce()->get('products', ['page' => $page, 'per_page' => $perPage]);

    //         // Process each product
    //         foreach ($products as $item) {
    //             ProcessProductJob::dispatch($item);
    //         }

    //         // Increment page number for next request
    //         $page++;

    //     } while (!empty($products));

    //     // Redirect back after processing
    //     return redirect()->back();
    // }

    // private function processProduct($item)
    // {
    //     // Check if the product already exists in Laravel
    //     if (Product::where('title', $item->name)->exists()) {
    //         return; // Skip existing products
    //     }

    //     // Generate SKU and Barcode
    //     $random = IdGenerator::generate(['table' => 'products', 'field' => 'sku', 'length' => 6, 'prefix' => 'PC']);
    //     $randomNumber = IdGenerator::generate(['table' => 'products', 'field' => 'barcode', 'length' => 13, 'prefix' => '25632490']);

    //     // Store product image
    //     $thumbnail = null;
    //     if (!empty($item->images[0]->src)) {
    //         $thumbnail = $this->storeImageFromJsonLink($item->images[0]->src, 'upload/product', 200, 200);
    //     }

    //     // Create or update product
    //     $product = Product::updateOrCreate(
    //         ['title' => $item->name],
    //         [
    //             'category_id' => optional($item->categories[0])->id,
    //             'brand_id' => null,
    //             'unit_id' => null,
    //             'sku' => $random,
    //             'barcode' => $randomNumber,
    //             'weight' => null,
    //             'thumbnail' => $thumbnail,
    //             'description' => $item->description,
    //             'price' => $item->price,
    //         ]
    //     );

    //     // If the product was just created, create its inventory
    //     if ($product->wasRecentlyCreated) {
    //         Inventory::create([
    //             'product_id' => $product->id,
    //             'min_alert' => 0,
    //             'max_alert' => 0,
    //             'warehouse_id' => 2, // Ensure this warehouse exists
    //         ]);
    //     }
    // }

    // public function batchProductStore()
    // {
    //     $wproduct = Wproduct::find(93);

    //     $thumbnail = $this->storeImageFromJsonLink($wproduct['images'][0]->src, 'upload/product', 200, 200);
    //     $random = IdGenerator::generate(['table' => 'products','field' => 'sku','length' => 6, 'prefix' => 'PC']);
    //     $randomNumber = IdGenerator::generate(['table' => 'products','field' => 'barcode','length' => 13 , 'prefix' => '25632490']);

    //     $product = Product::updateOrCreate([
    //         'title' => $wproduct['name'],
    //         'category_id' => $wproduct['categories'][0]->id,
    //         'brand_id' => null,
    //         'unit_id' => null,
    //         'sku' => $random,
    //         'barcode' => $randomNumber,
    //         'weight' => null,
    //         'thumbnail' => $thumbnail ?? null,
    //         'description' => $wproduct['description'],
    //         'price' => $wproduct['price'],
    //     ]);

    //   // If the product was just created, create its inventory
    //   if ($product->wasRecentlyCreated) {
    //    Inventory::create([
    //         'product_id' => $product->id,
    //         'min_alert' => 0,
    //         'max_alert' => 0,
    //         'warehouse_id' => 2,
    //     ]);
    //     // Create inventory after product is saved


    // }
    //     return $product;
    // }




}
