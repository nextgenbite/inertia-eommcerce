<?php

namespace App\Http\Controllers\Tenant\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\{Attribute, AttributeValue, Product, Supplier, Category, Brand, Inventory, Unit};
use Carbon\Carbon;
use Haruncpi\LaravelIdGenerator\IdGenerator;

use App\Exports\ProductExport;
use App\Http\Requests\IndexProductRequest;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\ProductImport;
use App\Repositories\Interfaces\Product\ProductInterface;
use App\Traits\ApiReturnFormatTrait;
use App\Traits\ImageUploadTrait;
use Illuminate\Support\Facades\DB;
use Milon\Barcode\DNS1D;

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

        $sku = IdGenerator::generate([
            'table' => 'products',
            'field' => 'sku',
            'length' => 15,
            'prefix' => 'PC-' . now()->format('Ymd') . '-',
            'reset_on_prefix_change' => true
        ]);

        do {
            $code12 = str_pad(mt_rand(0, 999999999999), 12, '0', STR_PAD_LEFT);
            $checkDigit = $this->calculateEAN13CheckDigit($code12);
            $barcode = $code12 . $checkDigit;
        } while (\App\Models\Product::where('barcode', $barcode)->exists());

        $generator = new DNS1D();
        $generator->setStorPath(storage_path('framework/barcodes'));
        // Black bars (0,0,0)
        $pngData = $generator->getBarcodePNG($barcode, 'C128', 2, 44, [0, 0, 0], true);

        $barcodeImage = 'data:image/png;base64,' . $pngData;

        $attribute_values = AttributeValue::with('attribute')->get()
            ->map(fn($v) => [
                'value' => $v->id,
                'label' => "{$v->attribute->display_name}: {$v->value}"
            ]);

        $data =   array_merge([
            'filters'       => $request->all(['search', 'field', 'order']),
            'getData'         => $data->with('category',         'variants.attributeValues.attribute',
            'attributeImages')->paginate(10),
            'categories' => Category::with(['subCategories.subSubCategories'])->get(),
            'attributes' => Attribute::with(['values'])->get(),
            'attribute_values' => $attribute_values,
            'brands' => Brand::get(),
            'units' => Unit::get(),
            'sku' => $sku,
            'barcode' => $barcode,
            'barcode_image' => $barcodeImage,

        ], $this->product->baseData());

        return $this->responseWithInertia("Backend/{$this->title[0]}/Index",  $data);
    }



    public function store(Request $request)
    {
        if (isDemoMode()) {
            return redirect()->back();
        }

        // DB::beginTransaction();
        // try {
        $product = $this->product->store($request);
        // DB::commit();
        return back()->with('success', "{$product->title} created successfully.");
        // } catch (\Throwable $th) {
        //     DB::rollBack();
        //     return back()->with('error', "Error creating {$request->title}: " . $th->getMessage());
        // }
    }



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

    private function calculateEAN13CheckDigit(string $code12): string
    {
        $sum = 0;
        for ($i = 0; $i < 12; $i++) {
            $digit = (int) $code12[$i];
            $sum += ($i % 2 === 0) ? $digit : $digit * 3;
        }
        $mod = $sum % 10;
        return ($mod === 0) ? '0' : (string)(10 - $mod);
    }
}
