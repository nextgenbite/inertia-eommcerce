<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Tenancy\TenancyController;
use App\Models\Plan;
use Illuminate\Support\Facades\Artisan;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/tenant', [TenancyController::class, 'index'])->name('tenant.index');
Route::get('/tenant/{tenant}', [TenancyController::class, 'show'])->name('tenant.show');
Route::get('/tenant-register', [TenancyController::class, 'register']);
Route::post('/tenant-register', [TenancyController::class, 'store'])->name('tenant.store');
Route::delete('/tenant/delete/{tenant}', [TenancyController::class, 'destroy'])->name('tenant.destroy');

// Route::get('/', [HomeController::class, 'homePage'])->name('home');
Route::get('/', function () {
    return Inertia::render('Central/Index', [
        'plans'         => Plan::get(),
        // 'users'         => (int) User::count(),
        // 'roles'         => (int) Role::count(),
        // 'permissions'   => (int) Permission::count(),
    ]);
})->name('home');


// Route::get('/artisan/{command}', function ($command) {
//     Artisan::call($command);
//     return back()->with('success', 'Artisan run successfully');
// });

Route::middleware(['auth'])->get('/artisan/{command}', function ($command) {
    $allowedCommands = [
        'migrate',
        'optimize',
        'optimize:clear',
        'cache:clear',
        'config:cache',
        // Add only safe commands here
    ];

    if (!in_array($command, $allowedCommands)) {
        abort(403, 'Unauthorized command.');
    }

    Artisan::call($command);

    return back()->with('success', "Artisan command '$command' run successfully.");
});
Route::prefix('/admin')->middleware(['auth', 'admin'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('Central/Backend/Dashboard', [
            'users' => \App\Models\User::count(),
            'tenants' => \App\Models\Tenant::count(),
            'plans' => \App\Models\Plan::count(),
        ]);
    })->name('admin.dashboard');

     // Tenant Routes
    Route::resource('/tenants', App\Http\Controllers\Tenancy\TenancyBackendController::class)->except('create', 'show', 'edit');

     // Domain Routes
    Route::resource('/domains', App\Http\Controllers\Tenancy\DomainController::class)->except('create', 'show', 'edit');

     // Plan Routes
    Route::resource('/plans', App\Http\Controllers\Tenancy\PlanController::class)->except('create', 'show', 'edit');


});

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Central/User/Dashboard');
    })->name('dashboard');
});

require __DIR__ . '/auth.php';

