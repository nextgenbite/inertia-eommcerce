<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\HomeController;
use App\Models\User;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Spatie\Permission\Models\Permission;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PermissionController;
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

Route::get('/', [HomeController::class, 'homePage'])->name('home');

Route::get('/product/{product}', [HomeController::class, 'ProductShow'])->name('product.show');
Route::get('/shop', [HomeController::class, 'Shop'])->name('shop');
// Route::get('/order-confirmed', [HomeController::class, ''])->name('checkout');
//cart
// Route::post('/add-to-cart', [CartController::class, 'store'])->name('cart.store');
Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
Route::get('/cart', [CartController::class, 'index'])->name('cart');
Route::delete('/cart', [CartController::class, 'destroy'])->name('cart.destroy');
Route::put('/cart', [CartController::class, 'update'])->name('cart.update');
Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout');
Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
Route::get('/order-confirmed', [CheckoutController::class, 'OrderConfirmed'])->name('order.confirmed');


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'users'         => (int) User::count(),
        'roles'         => (int) Role::count(),
        'permissions'   => (int) Permission::count(),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth', 'verified')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('/user', UserController::class)->except('create', 'show', 'edit');
    Route::post('/user/destroy-bulk', [UserController::class, 'destroyBulk'])->name('user.destroy-bulk');

    Route::resource('/role', RoleController::class)->except('create', 'show', 'edit');

    Route::resource('/permission', PermissionController::class)->except('create', 'show', 'edit');
});

Route::get('/form', function () {
    return Inertia::render('SakaiForm');
});

Route::get('/button', function () {
    return Inertia::render('SakaiButton');
});

Route::get('/list', function () {
    return Inertia::render('SakaiList');
});

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

require __DIR__ . '/auth.php';

Route::prefix('admin')->middleware(['auth', 'verified'])->group(function () {

    //role & permission Route
    Route::resource('/role', RoleController::class)->except('create', 'show', 'edit');

    Route::resource('/permission', PermissionController::class)->except('create', 'show', 'edit');




    /// Customer Routes
    Route::resource('/customers', App\Http\Controllers\Backend\CustomerController::class)->except('create', 'show', 'edit');

    Route::controller(App\Http\Controllers\Backend\CustomerController::class)->group(function () {

        Route::get('/customer-search', 'searchCustomer')->name('customer.search');
          Route::get('trashed', 'trashed')->name('trashed.unit');
        Route::get('restore/{id}', 'restore')->name('restore.unit');
    });


    // Supplier Routes
    Route::resource('/suppliers', App\Http\Controllers\Backend\SupplierController::class)->except('create', 'show', 'edit');



    ///Warehouse Routes
    Route::resource('warehouses', App\Http\Controllers\Backend\WarehouseController::class)->except('create', 'show', 'edit');

    ///Category Routes
    Route::resource('categories', App\Http\Controllers\Backend\CategoryController::class)->except('create', 'show', 'edit');
    Route::get('/all/categories',[App\Http\Controllers\Backend\CategoryController::class, 'allCategories' ] )->name('all.categories');
    Route::resource('sub-categories', App\Http\Controllers\Backend\SubCategoryController::class)->except('create', 'show', 'edit');
    Route::resource('sub-subcategories', App\Http\Controllers\Backend\SubSubCategoryController::class)->except('create', 'show', 'edit');
    ///Brand Routes
    Route::resource('brands', App\Http\Controllers\Backend\BrandController::class)->except('create', 'show', 'edit');

    ///Unit Routes
    Route::resource('units', App\Http\Controllers\Backend\UnitController::class)->except('create', 'show', 'edit');

    Route::controller(App\Http\Controllers\Backend\UnitController::class)->prefix('units')->group(function () {
        Route::get('trashed', 'trashed')->name('trashed.unit');
        Route::get('restore/{id}', 'restore')->name('restore.unit');
    });


    // Product Routes
    Route::resource('products', App\Http\Controllers\Backend\ProductController::class)
        ->except(['create', 'show', 'edit']);

    Route::controller(App\Http\Controllers\Backend\ProductController::class)->prefix('products')->group(function () {
        Route::get('trashed', 'trashed')->name('trashed.unit');
        Route::get('restore/{id}', 'restore')->name('restore.unit');

        Route::get('search', 'search')->name('products.search');
        Route::get('import', 'ImportProduct')->name('products.import.form');
        Route::post('import', 'Import')->name('products.import');
        Route::get('export', 'Export')->name('products.export');
        Route::get('barcode/{id}', 'BarcodeProduct')->name('products.barcode');
        Route::get('barcode', 'searchByBarcode')->name('products.barcode.search');
        Route::get('search-by-name', 'searchProduct')->name('products.search.byname');
    });

    ///Purchase Routes
    Route::resource('purchases', App\Http\Controllers\Backend\PurchaseController::class)
        ->except(['create', 'show', 'edit']);

    Route::prefix('purchases')->controller(App\Http\Controllers\Backend\PurchaseController::class)->group(function () {
        Route::get('{purchase}/cancel', 'cancel')->name('purchases.cancel');
        Route::post('cancel', 'cancelStore')->name('purchases.cancel.store');
        Route::get('{purchase}/request', 'request')->name('purchases.request');
        Route::get('{purchase}/receive', 'receive')->name('purchases.receive');
        Route::post('receive', 'receiveStore')->name('purchases.receive.store');
        Route::get('returns', 'returnIndex')->name('purchases.returns.index');
        Route::get('returns/{purchase}', 'return')->name('purchases.returns.show');
        Route::post('returns', 'returnStore')->name('purchases.returns.store');
    });

    ///ExpenseCategory Routes
    Route::resource('expenses/category', App\Http\Controllers\Backend\ExpenseCategoryController::class);

    ///Expense Routes
    Route::resource('expenses', App\Http\Controllers\Backend\ExpenseController::class);


    //Warehouse Routes
    Route::resource('warehouses', App\Http\Controllers\Backend\WarehouseController::class);

    ///Pos Routes
    Route::controller(App\Http\Controllers\Backend\PosController::class)->group(function () {

        Route::get('/pos', 'Pos')->name('pos');
        Route::post('/add-cart', 'AddCart');
        Route::get('/allitem', 'AllItem');
        Route::post('/cart-update/{rowId}', 'CartUpdate');
        Route::get('/cart-remove/{rowId}', 'CartRemove');

        Route::post('/create-invoice', 'CreateInvoice');
    });


    // Order & Invoice Routes
    Route::resource('orders', App\Http\Controllers\Backend\OrderController::class)->except(['create']);

    Route::prefix('orders')->controller(App\Http\Controllers\Backend\OrderController::class)->group(function () {
        Route::get('create', 'create')->name('orders.create');
        Route::post('finalize', 'FinalInvoice')->name('orders.finalize');
        Route::get('pending', 'PendingOrder')->name('orders.pending');
        Route::get('completed', 'CompleteOrder')->name('orders.completed');
        Route::get('{order}/details', 'OrderDetails')->name('orders.details');
        Route::get('{order}/invoice', 'OrderInvoice')->name('orders.invoice');
        Route::post('status', 'OrderStatusUpdate')->name('orders.status.update');
        // Due Routes
        Route::get('due/pending', 'PendingDue')->name('orders.due.pending');
        Route::get('{order}/due', 'OrderDueAjax')->name('orders.due.ajax');
        Route::post('due/update', 'UpdateDue')->name('orders.due.update');
    });

    // Stock Management Route
    Route::get('stock', [App\Http\Controllers\Backend\OrderController::class, 'StockManage'])->name('stock.manage');


    ///Report Routes
    Route::controller(App\Http\Controllers\Backend\ReportController::class)->group(function () {

        Route::get('/report/expense', 'expenseReport')->name('report.expense');
        Route::get('/report/sales', 'salesReport')->name('report.sales');
        Route::get('/report/payment', 'reportPayment')->name('report.payment');
        Route::get('/report/purchase', 'reportPurchase')->name('report.purchase');
        Route::get('/sale/return', 'saleReturn')->name('sale.return');
        Route::get('/profit-loss', 'profitLoss')->name('profit.loss');
    });

    ///Setting Routes
    Route::controller(App\Http\Controllers\Backend\SettingController::class)->group(function () {

        Route::get('/general-settings', 'index')->name('general.settings');
        Route::post('/store-settings', 'update')->name('general.settings.store');
        Route::post('/env/update', 'updateEnvKeys')->name('env.update');
    });
    ///Wordpress Routes
    Route::controller(App\Http\Controllers\Backend\WpController::class)->group(function () {

        Route::get('/wocommerce', 'index')->name('wocommerce.index');
        Route::get('/wocommerce/setup', 'setup')->name('wocommerce.setup');
        Route::get('/batch-product-store', 'batchProductStore')->name('wocommerce.product');
        Route::get('/category-sync', 'categorySync')->name('wocommerce.category');
        // Route::post('/store-settings','store')->name('general.settings.store');

    });
    ///Mail Routes
    Route::controller(App\Http\Controllers\Backend\MailController::class)->group(function () {

        Route::get('/mail/setup', 'setup')->name('mail.setup');
        Route::get('/mail', 'inbox')->name('mail.inbox');
        Route::get('/mail/read/{id}', 'read')->name('mail.read');
        Route::get('/mail/compose', 'compose')->name('mail.compose');
        Route::post('/mail/store', 'store')->name('mail.store');
        Route::post('/mail/deletes', 'deletes')->name('mail.deletes');
    });


    /// User Routes
    // Route::controller(App\Http\Controllers\Backend\AdminController::class)->group(function () {

    //   Route::get('/all/user', 'AllAdmin')->name('all.user');
    //   Route::get('/add/user', 'AddAdmin')->name('add.user');
    //   Route::post('/store/user', 'StoreAdmin')->name('user.store');
    //   Route::get('/edit/user/{id}', 'EditAdmin')->name('edit.user');
    //   Route::post('/update/user', 'UpdateAdmin')->name('user.update');
    //   Route::get('/delete/admin/{id}', 'DeleteAdmin')->name('delete.user');

    //   // Database Backup
    //   Route::get('/database/backup', 'DatabaseBackup')->name('database.backup');
    //   Route::get('/backup/now', 'BackupNow');
    //   Route::get('/download/database/{getFilename}', 'DownloadDatabase')->name('database.download');
    //   Route::get('/delete/database/{getFilename}', 'DeleteDatabase');
    // });
}); // End User Middleware
