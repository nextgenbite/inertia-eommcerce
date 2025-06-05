<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\{Product, Supplier, Category, Brand, Inventory, Unit};
use Carbon\Carbon;
use Haruncpi\LaravelIdGenerator\IdGenerator;

use App\Exports\ProductExport;
use App\Http\Requests\IndexProductRequest;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\ProductImport;
use App\Repositories\Interfaces\Product\ProductInterface;
use App\Traits\ApiReturnFormatTrait;
use App\Traits\ImageUploadTrait;

class ProductController extends Controller
{
    use ImageUploadTrait;
    private $title = ['Product', 'product'];
    private $imagePath = 'upload/product/';
    use ApiReturnFormatTrait;
    protected  $product;

    public function __construct(ProductInterface $product)
    {
        $this->product = $product;

        // $this->middleware('permission:product.create', ['only' => ['create', 'store']]);
        // $this->middleware('permission:product.view', ['only' => ['index', 'show']]);
        // $this->middleware('permission:product.edit', ['only' => ['edit', 'update']]);
        // $this->middleware('permission:product.delete', ['only' => ['destroy', 'destroyBulk']]);

    }
    public function index(IndexProductRequest $request)
    {
        $data = Product::query();
        if ($request->has('search')) {
            $data->where('title', 'LIKE', "%" . $request->search . "%");
        }
        if ($request->has(['field', 'order'])) {
            $data->orderBy($request->field, $request->order);
        }
        $data =   array_merge([
            'filters'       => $request->all(['search', 'field', 'order']),
            'getData'         => $data->with('category')->paginate(10)

        ], $this->product->baseData());

        return $this->responseWithInertia("Backend/{$this->title[0]}/Index",  $data);
    }

    public function create(Request $request)
    {
        $title = 'Product';
        $categories = Category::latest()->get();
        $supplier = Supplier::latest()->get();
        $brands = Brand::latest()->get();
        $units = Unit::latest()->get();
        $digits = 13;
        // $random = Str::random(13);
        $random = IdGenerator::generate(['table' => 'products', 'field' => 'sku', 'length' => 6, 'prefix' => 'PC']);
        $randomNumber = IdGenerator::generate(['table' => 'products', 'field' => 'barcode', 'length' => 13, 'prefix' => '25632490']);
        $generator = new \Picqer\Barcode\BarcodeGeneratorHTML();
        // $randomNumber = str_pad(rand(0, pow(10, $digits) - 1), $digits, '0', STR_PAD_LEFT);
        return view('backend.product.create', compact('title', 'categories', 'brands', 'units', 'randomNumber', 'random', 'generator'));
    } // End Method


    public function store(Request $request)
    {

        if ($request->has('thumbnail')) {
            $imagePath = $this->uploadImage($request, 'thumbnail', $this->imagePath, 300, 300);
        }

        $product =   Product::insertGetId([

            'title' => $request->title,
            'category_id' => $request->category_id,
            'brand_id' => $request->brand_id,
            'unit_id' => $request->unit_id,
            'sku' => $request->sku,
            'barcode' => $request->barcode,
            'weight' => $request->weight,
            'thumbnail' => $imagePath ?? null,
            'description' => $request->description,
            'created_at' => Carbon::now(),

        ]);
        $invetory =  Inventory::create([
            'product_id' => $product,
            'min_alert' => $request->min_alert,
            'max_alert' => $request->max_alert,
        ]);
        if ($product && $invetory) {
            $notification = array(
                'message' => 'Product Inserted Successfully',
                'alert-type' => 'success'
            );
        } else {
            $notification = array(
                'message' => 'Product Inserted Faild',
                'alert-type' => 'error'
            );
        }



        return redirect()->route('all.product')->with($notification);
    } // End Method



    public function edit($id)
    {
        $title = 'Product';
        $data = Product::with('category', 'brand', 'unit', 'inventory')->findOrFail($id);
        $categories = Category::latest()->get();
        $supplier = Supplier::latest()->get();
        $brands = Brand::latest()->get();
        $units = Unit::latest()->get();

        $generator = new \Picqer\Barcode\BarcodeGeneratorHTML();
        // $randomNumber = str_pad(rand(0, pow(10, $digits) - 1), $digits, '0', STR_PAD_LEFT);
        return view('backend.product.edit', compact('title', 'data', 'categories', 'brands', 'units',  'generator'));
    } // End Method



    public function update(Request $request)
    {

        $data = Product::with('inventory')->findOrFail($request->id);

        if ($request->has('thumbnail')) {
            $this->deleteImage($data->thumbnail);
            $imagePath = $this->uploadImage($request, 'thumbnail', $this->imagePath, 300, 300);
        }
        $data->update([

            'title' => $request->title,
            'category_id' => $request->category_id,
            'brand_id' => $request->brand_id,
            'unit_id' => $request->unit_id,
            'sku' => $request->sku,
            'barcode' => $request->barcode,
            'weight' => $request->weight,
            'thumbnail' => $imagePath ?? $data->thumbnail,
            'description' => $request->description,

        ]);


        if ($data->inventory) {
            $data->inventory->update([
                'min_alert' => $request->min_alert,
                'max_alert' => $request->max_alert,
            ]);
        } else {
            $data->inventory()->create([
                'min_alert' => $request->min_alert,
                'max_alert' => $request->max_alert,
            ]);
        }
        if ($data) {
            $notification = array(
                'message' => 'Product Updated Successfully',
                'alert-type' => 'success'
            );
        } else {
            $notification = array(
                'message' => 'Product Updated Faild',
                'alert-type' => 'error'
            );
        }

        return redirect()->route('all.product')->with($notification);
    } // End Method

    public function destroy($id)
    {

        $data = Product::findOrFail($id);
        $this->deleteImage($data->thumbnail);
        $data->delete();

        $notification = array(
            'message' => 'Product Deleted Successfully',
            'alert-type' => 'success'
        );

        return redirect()->back()->with($notification);
    } // End Method


    public function search(Request $request)
    {
        $search = $request->get('query');
        $data = Product::where('title', 'LIKE', '%' . $search . '%')
            ->orwhere('sku', $search)
            ->orWhere('barcode', $search)
            ->get(['id', 'title']);
        if ($data->isNotEmpty()) {
            return response()->json($data);
        } else {
            return 'No Data Found';
        }
    } // End Method
    public function BarcodeProduct($id)
    {

        $product = Product::findOrFail($id);
        return view('backend.product.barcode_product', compact('product'));
    } // End Method


    public function ImportProduct()
    {

        return view('backend.product.import_product');
    } // End Method


    public function Export()
    {

        return Excel::download(new ProductExport, 'products.xlsx');
    } // End Method


    public function Import(Request $request)
    {

        Excel::import(new ProductImport, $request->file('import_file'));

        $notification = array(
            'message' => 'Product Imported Successfully',
            'alert-type' => 'success'
        );

        return redirect()->back()->with($notification);
    } // End Method

    public function searchProduct(Request $request)
    {
        if ($request->ajax() && $request->has('warehouse_id')) {
            $query = Product::query();

            if ($request->has('category_id') && !isEmptyOrNullString($request->category_id)) {
                $query->where('category_id', $request->category_id);
            }

            if ($request->has('search')) {
                $searchTerm = $request->search;
                $query->where(function ($q) use ($searchTerm) {
                    $q->where("title", "like", "%" . $searchTerm . "%")
                        ->orWhere('sku', 'like', '%' . $searchTerm . '%')
                        ->orWhere('barcode', 'like', '%' . $searchTerm . '%');
                });
            }

            $warehouseId = $request->warehouse_id;

            // Filter products with available inventory in the specified warehouse
            $query->whereHas('inventory', function ($query) use ($warehouseId) {
                $query->where('warehouse_id', $warehouseId)
                    ->where('quantity', '>', 0);
            });

            // Execute the query to retrieve the products
            $products = $query->get();

            if ($products->isNotEmpty()) {
                return response()->json([
                    'success' => true,
                    'data' => $products
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Products not found'
                ], 404);
            }
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Invalid request'
            ], 400);
        }
    }


    public function searchByBarcode(Request $request)
    {

        if ($request->ajax()) {
            $data = Product::where("barcode", $request->search)
                ->first();
            if ($data) {
                return response()->json([
                    'success' => true,
                    'data' => $data
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Product not found'
                ], 404);
            }
        }
    }
}
