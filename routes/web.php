<?php

use App\Http\Controllers\CartController;
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
use App\Models\Category;
use App\Models\Product;

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

Route::get('/', function () {
       return Inertia::render('Index', [
        'products' =>  Product::with('category')->limit(10)->get(),
        'categories' =>  Category::get(),
    ]);
});
Route::get('/product/{product}', [HomeController::class, 'ProductShow'])->name('product.show');
Route::get('/shop', [HomeController::class, 'Shop'])->name('shop');
Route::get('/checkout', [HomeController::class, 'Checkout'])->name('checkout');
// Route::get('/order-confirmed', [HomeController::class, ''])->name('checkout');
//cart
// Route::post('/add-to-cart', [CartController::class, 'store'])->name('cart.store');
Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
Route::get('/cart', [CartController::class, 'index'])->name('cart');
Route::delete('/cart', [CartController::class, 'destroy'])->name('cart.destroy');
Route::put('/cart', [CartController::class, 'update'])->name('cart.update');
Route::post('/create-invoice', [HomeController::class, 'CreateInvoice'])->name('create.invoice');
Route::get('/order-confirmed', function () {
    return Inertia::render('OrderConfirmed');
})->name('order.confirmed');


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

require __DIR__.'/auth.php';

Route::prefix('admin')->middleware(['auth','verified'])->group(function () {




    /// Customer All Route
    Route::controller(App\Http\Controllers\Backend\CustomerController::class)->group(function () {

      Route::get('/all/customer', 'index')->name('all.customer')->middleware('permission:customer.view');
      Route::get('/add/customer', 'create')->name('add.customer')->middleware('permission:customer.create');
      Route::post('/store/customer', 'store')->name('customer.store')->middleware('permission:customer.create');
      Route::get('/edit/customer/{id}', 'edit')->name('edit.customer')->middleware('permission:customer.edit');
      Route::post('/update/customer', 'update')->name('customer.update')->middleware('permission:customer.edit');
      Route::get('/delete/customer/{id}', 'destroy')->name('delete.customer')->middleware('permission:customer.delete');
      Route::get('/customer-search', 'searchCustomer')->name('customer.search');
    });


    /// Supplier All Route
    Route::controller(App\Http\Controllers\Backend\SupplierController::class)->group(function () {

      Route::get('/supplier', 'index')->name('index')->middleware('permission:supplier.view');
      Route::get('/add/supplier', 'create')->name('add.supplier')->middleware('permission:supplier.create');
      Route::post('/store/supplier', 'store')->name('supplier.store')->middleware('permission:supplier.create');
      Route::get('/edit/supplier/{id}', 'edit')->name('edit.supplier')->middleware('permission:supplier.edit');
      Route::post('/update/supplier', 'update')->name('supplier.update')->middleware('permission:supplier.edit');
      Route::get('/delete/supplier/{id}', 'destroy')->name('delete.supplier')->middleware('permission:supplier.delete');
      Route::get('/details/supplier/{id}', 'show')->name('details.supplier');
    });


    /// Advance Salary All Route
    Route::controller(App\Http\Controllers\Backend\SalaryController::class)->group(function () {

      Route::get('/add/advance/salary', 'AddAdvanceSalary')->name('add.advance.salary');
      Route::post('/advance/salary/store', 'AdvanceSalaryStore')->name('advance.salary.store');
      Route::get('/all/advance/salary', 'AllAdvanceSalary')->name('all.advance.salary');

      Route::get('/edit/advance/salary/{id}', 'EditAdvanceSalary')->name('edit.advance.salary');
      Route::post('/advance/salary/update', 'AdvanceSalaryUpdate')->name('advance.salary.update');
    });


    /// Pay Salary All Route
    Route::controller(App\Http\Controllers\Backend\SalaryController::class)->group(function () {

      Route::get('/pay/salary', 'PaySalary')->name('pay.salary');
      Route::get('/pay/now/salary/{id}', 'PayNowSalary')->name('pay.now.salary');
      Route::post('/employe/salary/store', 'EmployeSalaryStore')->name('employe.salary.store');
      Route::get('/month/salary', 'MonthSalary')->name('month.salary');
    });


    ///Attendence All Route
    Route::controller(App\Http\Controllers\Backend\AttendenceController::class)->group(function () {

      Route::get('/employee/attend/list', 'EmployeeAttendenceList')->name('employee.attend.list');
      Route::get('/add/employee/attend', 'AddEmployeeAttendence')->name('add.employee.attend');
      Route::post('/employee/attend/store', 'EmployeeAttendenceStore')->name('employee.attend.store');

      Route::get('/edit/employee/attend/{date}', 'EditEmployeeAttendence')->name('employee.attend.edit');
      Route::get('/view/employee/attend/{date}', 'ViewEmployeeAttendence')->name('employee.attend.view');
    });


    ///Warehouse All Route
    Route::controller(App\Http\Controllers\Backend\WarehouseController::class)->group(function () {

      Route::get('/all/warehouse', 'index')->name('all.warehouse');
      Route::post('/store/warehouse', 'store')->name('warehouse.store');
      Route::get('/edit/warehouse/{id}', 'edit')->name('edit.warehouse');
      Route::post('/update/warehouse', 'update')->name('warehouse.update');
      Route::get('/delete/warehouse/{id}', 'destroy')->name('delete.warehouse');
    });
    ///Category All Route
    Route::resource('categories',App\Http\Controllers\Backend\CategoryController::class );
    // Route::controller(App\Http\Controllers\Backend\CategoryController::class)->group(function () {

    //   Route::get('/all/category', 'index')->name('all.category');
    //   Route::post('/store/category', 'store')->name('category.store');
    //   Route::get('/edit/category/{id}', 'edit')->name('edit.category');
    //   Route::post('/update/category', 'update')->name('category.update');
    //   Route::get('/delete/category/{id}', 'destroy')->name('delete.category');
    // });
    ///Brand All Route
    Route::controller(App\Http\Controllers\Backend\BrandController::class)->group(function () {

      Route::get('/all/brand', 'index')->name('all.brand');
      Route::post('/store/brand', 'store')->name('brand.store');
      Route::get('/edit/brand/{id}', 'edit')->name('edit.brand');
      Route::post('/update/brand', 'update')->name('brand.update');
      Route::get('/delete/brand/{id}', 'destroy')->name('delete.brand');
    });
    ///Unit All Route
    Route::controller(App\Http\Controllers\Backend\UnitController::class)->group(function () {

      Route::get('/all/unit', 'index')->name('all.unit');
      Route::post('/store/unit', 'store')->name('unit.store');
      Route::get('/edit/unit/{id}', 'edit')->name('edit.unit');
      Route::post('/update/unit', 'update')->name('unit.update');
      Route::get('/trashed/unit', 'trashed')->name('trashed.unit');
      Route::get('/delete/unit/{id}', 'destroy')->name('delete.unit');
      Route::get('/restore/unit/{id}', 'restore')->name('restore.unit');
    });


    ///Product All Route
    Route::resource('products',App\Http\Controllers\Backend\ProductController::class );

    // Route::controller(App\Http\Controllers\Backend\ProductController::class)->group(function () {

    //   Route::get('/all/product', 'index')->name('all.product');
    //   Route::get('/add/product', 'create')->name('add.product');
    //   Route::get('/search/product', 'search')->name('search.product');
    //   Route::post('/store/product', 'store')->name('product.store');
    //   Route::get('/edit/product/{id}', 'edit')->name('edit.product');
    //   Route::post('/update/product', 'update')->name('product.update');
    //   Route::get('/delete/product/{id}', 'destroy')->name('delete.product');

    //   Route::get('/barcode/product/{id}', 'BarcodeProduct')->name('barcode.product');

    //   Route::get('/import/product', 'ImportProduct')->name('import.product');
    //   Route::get('/export', 'Export')->name('export.product');
    //   Route::post('/import', 'Import')->name('import');
    //   Route::get('/product-search', 'searchProduct')->name('product.search');
    //   Route::get('/barcode/product', 'searchByBarcode')->name('barcode.product.search');
    // });

    ///Purchase All Route
    Route::controller(App\Http\Controllers\Backend\PurchaseController::class)->group(function () {

      Route::get('/all/purchase', 'index')->name('all.purchase');
      Route::get('/add/purchase', 'create')->name('add.purchase');
      Route::post('/store/purchase', 'store')->name('purchase.store');
      Route::get('/purchase/{id}', 'show')->name('show.purchase');
      Route::get('/edit/purchase/{id}', 'edit')->name('edit.purchase');
      Route::post('/update/purchase', 'update')->name('purchase.update');
      Route::get('/delete/purchase/{id}', 'destroy')->name('delete.purchase');
      Route::get('/cancel/purchase/{id}', 'cancel')->name('cancel.purchase');
      Route::post('/cancel/purchase', 'cancelStore')->name('store.cancel.purchase');
      Route::get('/request/purchase/{id}', 'request')->name('request.purchase');
      Route::get('/receive/purchase/{id}', 'receive')->name('receive.purchase');
      Route::post('/receive/purchase', 'receiveStore')->name('store.receive.purchase');
      Route::get('/return/purchase', 'returnIndex')->name('return.index.purchase');
      Route::get('/return/purchase/{id}', 'return')->name('return.purchase');
      Route::post('/return/purchase', 'returnStore')->name('store.return.purchase');
    });

    ///ExpenseCategory All Route
    Route::resource('expense/category', App\Http\Controllers\Backend\ExpenseCategoryController::class);
    Route::resource('expense', App\Http\Controllers\Backend\ExpenseController::class);

    ///Expense All Route
    // Route::controller(App\Http\Controllers\Backend\ExpenseController::class)->group(function () {

    //   Route::get('/all/expense', 'index')->name('all.expense');
    //   Route::get('/add/expense', 'create')->name('add.expense');
    //   Route::post('/store/expense', 'store')->name('expense.store');
    //   Route::get('/details/expense/{id}', 'show')->name('show.expense');
    //   Route::get('/edit/expense/{id}', 'edit')->name('edit.expense');
    //   Route::post('/update/expense', 'update')->name('expense.update');
    //   Route::get('/delete/expense', 'destroy')->name('delete.expense');
    //   Route::get('/date/filter/expense', 'dateFilter')->name('date.filter.expense');
    // });




    ///Pos All Route
    Route::controller(App\Http\Controllers\Backend\PosController::class)->group(function () {

      Route::get('/pos', 'Pos')->name('pos');
      Route::post('/add-cart', 'AddCart');
      Route::get('/allitem', 'AllItem');
      Route::post('/cart-update/{rowId}', 'CartUpdate');
      Route::get('/cart-remove/{rowId}', 'CartRemove');

      Route::post('/create-invoice', 'CreateInvoice');
    });


    ///Order All Route
     ///Product All Route
     Route::resource('invoice',App\Http\Controllers\Backend\OrderController::class );
    // Route::controller(App\Http\Controllers\Backend\OrderController::class)->group(function () {

    //   Route::post('/final-invoice', 'FinalInvoice');
    //   Route::get('/add/invoice', 'create')->name('add.invoice');

    //   Route::get('/all/invoices', 'index')->name('all.invoice');
    //   Route::get('/pending/order', 'PendingOrder')->name('pending.order');
    //   Route::get('/order/details/{order_id}', 'OrderDetails')->name('show.invoice');
    //   Route::post('/order/store', 'store')->name('order.store');
    //   Route::post('/order/status/update', 'OrderStatusUpdate')->name('order.status.update');

    //   Route::get('/complete/order', 'CompleteOrder')->name('complete.order');

    //   Route::get('/stock', 'StockManage')->name('stock.manage');
    //   Route::get('/order/invoice-download/{order_id}', 'OrderInvoice')->name('invoice.pdf');



    //   //// Due All Route

    //   Route::get('/pending/due', 'PendingDue')->name('pending.due');
    //   Route::get('/order/due/{id}', 'OrderDueAjax');
    //   Route::post('/update/due', 'UpdateDue')->name('update.due');
    // });


    ///Report All Route
    Route::controller(App\Http\Controllers\Backend\ReportController::class)->group(function () {

      Route::get('/report/expense', 'expenseReport')->name('report.expense');
      Route::get('/report/sales', 'salesReport')->name('report.sales');
      Route::get('/report/payment', 'reportPayment')->name('report.payment');
      Route::get('/report/purchase', 'reportPurchase')->name('report.purchase');
      Route::get('/sale/return', 'saleReturn')->name('sale.return');
      Route::get('/profit-loss', 'profitLoss')->name('profit.loss');
    });




    // POS All Route
    Route::controller(App\Http\Controllers\Backend\Pos_2_Controller::class)->group(function () {

      Route::get('/pos-2', 'index')->name('pos.index');
      Route::get('/pos-search', 'searchProduct')->name('pos.search');
      // Route::get('/customer-search','searchCustomer')->name('customer.search');
      Route::get('/product/{product}', 'productShow')->name('productShow');
      Route::get('/invoice/{id}', 'Posinvoice')->name('Posinvoice');
      Route::post('/payment-store', 'store')->name('payment.store');
    });

    ///Setting All Route
    Route::controller(App\Http\Controllers\Backend\SettingController::class)->group(function () {

      Route::get('/general-settings', 'index')->name('general.settings');
      Route::post('/store-settings', 'update')->name('general.settings.store');
      Route::post('/env/update', 'updateEnvKeys')->name('env.update');
    });
    ///Wordpress All Route
    Route::controller(App\Http\Controllers\Backend\WpController::class)->group(function () {

      Route::get('/wocommerce', 'index')->name('wocommerce.index');
      Route::get('/wocommerce/setup', 'setup')->name('wocommerce.setup');
      Route::get('/batch-product-store', 'batchProductStore')->name('wocommerce.product');
      Route::get('/category-sync', 'categorySync')->name('wocommerce.category');
      // Route::post('/store-settings','store')->name('general.settings.store');

    });
    ///Mail All Route
    Route::controller(App\Http\Controllers\Backend\MailController::class)->group(function () {

      Route::get('/mail/setup', 'setup')->name('mail.setup');
      Route::get('/mail', 'inbox')->name('mail.inbox');
      Route::get('/mail/read/{id}', 'read')->name('mail.read');
      Route::get('/mail/compose', 'compose')->name('mail.compose');
      Route::post('/mail/store', 'store')->name('mail.store');
      Route::post('/mail/deletes', 'deletes')->name('mail.deletes');
      // Route::post('/store-settings','store')->name('general.settings.store');

    });


    /// User All Route
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
