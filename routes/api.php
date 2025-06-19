<?php

use App\Http\Controllers\CartController;
use App\Models\Cart;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Category;
use App\Models\Setting;
// use App\Models\Cart;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});




// Cached categories
Route::get('/categories', fn () =>
    Cache::remember('categories', 3600, fn () => Category::with(['subCategories.subSubCategories'])->get())
);

// Cached settings
Route::get('/settings', fn () =>
    Cache::remember('settings', 3600, fn () => Setting::pluck('value', 'key'))
);

// Authenticated cart (no cache)
Route::get('/cart', [CartController::class, 'index'])->name('cart');
Route::post('/add-to-cart', [CartController::class, 'store'])->name('cart.store');
