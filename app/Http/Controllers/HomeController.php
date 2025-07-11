<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Attribute;
use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\Promotion;
use App\Models\ShippingCost;
use App\Models\Slider;

class HomeController extends Controller
{
    public function homePage(Request $request)
    {
        $categories = Category::with(['subCategories.subSubCategories'])->limit(9)->get();
        $flashSales = Promotion::with('products')
            ->active()
            ->where('type', 'flash_sale')
            ->first();
        $promotions = Promotion::with('products')
            ->where('status', 1)
            ->where('type', '!=', 'flash_sale')
            ->get();


        return Inertia::render('Index', [
            'products' =>  Product::latest()->paginate(10),
            'brands' =>  Brand::latest()->limit(6)->get(),
            'sliders' =>  Slider::latest()->limit(6)->get(),
            'categories' =>  $categories,
            'flashSales' => $flashSales,
            'promotions' => $promotions,
        ]);
    }
    public function ProductShow($slug)
    {
        $product = Product::where('slug', $slug)->first();
        $product->load([
            'category',
            'variants.attributeValues.attribute',
            'attributeImages', // product_attribute_images
            // 'variants.inventory',
        ]);


        $availableCombinations = $product->variants
            ->filter(fn($variant) => $variant->quantity > 0)
            ->map(function ($variant) {
                return $variant->attributeValues->pluck('id')->sort()->values()->all();
            })
            ->values();

        $relatedProduct = Product::where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->orderBy('id', 'DESC')
            ->limit(10)
            ->get();
        if ($relatedProduct->isEmpty()) {
            $relatedProduct = Product::with('category')->limit(10)->get();
        }
        $shipping = ShippingCost::all();
        // return $product->attributes;
        return Inertia::render('Product', [
            'product' => $product,
            // 'product' => new ProductResource($product),
            'availableCombinations' => $availableCombinations,
            'relatedProducts' => $relatedProduct,
            'shipping' => $shipping,
        ]);
    }

    public function ProductSearch(Request $request)
{
    $query = $request->input('query');
    $products = Product::where('title', 'like', '%' . $query . '%')
        ->select('id', 'title as title', 'slug') // `name` is required for PrimeVue `optionLabel`
        ->limit(10)
        ->get();

    return response()->json($products);
}


    //     public function ProductShow(Product $product)
    // {
    //     $product->load(['attributes.values', 'variants.attributeValues', 'variants.inventory']);
    // // return $product->attributes;
    // // return new ProductResource($product);
    //     $availableCombinations = [];

    //     foreach ($product->variants as $variant) {
    //         if ($variant->inventory && $variant->inventory->quantity > 0) {
    //             $combo = $variant->attributeValues->pluck('id')->sort()->values()->all();
    //             $availableCombinations[] = $combo;
    //         }
    //     }

    //     return Inertia::render('Product3', [
    //         'product' => new ProductResource($product),
    //         'availableCombinations' => $availableCombinations,
    //     ]);
    // }

    public function CategoryShow($id)
    {
        $category = Category::findOrFail($id);
        $products = Product::where('category_id', $id)->with('category', 'inventory')->paginate(10);
        return Inertia::render('Category', [
            'category' => $category,
            'products' => $products,
        ]);
    }
    public function Shop(Request $request)
    {
        $query = Product::with('category', 'brand');

        if ($request->filled('categories')) {
            $query->whereIn('category_id', (array) $request->categories);
        }

        if ($request->filled('brands')) {
            $query->whereIn('brand_id', (array) $request->brands);
        }

        if ($request->filled('price') && is_array($request->price) && count($request->price) === 2) {
            [$min, $max] = $request->price;
            $query->whereBetween('price', [$min, $max]);
        }

        if ($request->filled('sort')) {
            match ($request->sort) {
                'latest' => $query->orderByDesc('created_at'),
                'low'    => $query->orderBy('price', 'asc'),
                'high'   => $query->orderBy('price', 'desc'),
                default  => null,
            };
        }

        $products = $query->paginate(12)->withQueryString();

        return Inertia::render('Shop', [
            'products'    => $products,
            'categories'  => Category::withCount('products')->get(),
            'brands'      => Brand::withCount('products')->get(),
            'attributes'  => Attribute::with('values')->get(),
            'filters'     => $request->only(['categories', 'brands', 'price', 'sort']),
        ]);
    }
    public function Search(Request $request)
    {
        $search = $request->input('search');
        $products = Product::with('category', 'inventory')
            ->where('name', 'LIKE', '%' . $search . '%')
            ->orWhere('description', 'LIKE', '%' . $search . '%')
            ->paginate(10);

        return Inertia::render('Search', [
            'products' => $products,
            'search' => $search,
        ]);
    }
}
