<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Warehouse;
use App\Repositories\Interfaces\Warehouse\WarehouseInterface;
use App\Traits\ApiReturnFormatTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class WarehouseController extends Controller
{
    use ApiReturnFormatTrait;
    protected $warehouse;
    public $title = ['Warehouse', 'warehouse'];

    public function __construct(WarehouseInterface $warehouse)
    {
        $this->warehouse = $warehouse;

        $this->middleware('permission:warehouse.create', ['only' => ['create', 'store']]);
        $this->middleware('permission:warehouse.read', ['only' => ['index', 'show']]);
        $this->middleware('permission:warehouse.update', ['only' => ['edit', 'update']]);
        $this->middleware('permission:warehouse.delete', ['only' => ['destroy', 'destroyBulk']]);
    }

    public function index(Request $request)
    {
        $data = Warehouse::query();
        if ($request->has('search')) {
            $data->where('title', 'LIKE', "%" . $request->search . "%");
        }
        if ($request->has(['field', 'order'])) {
            $data->orderBy($request->field, $request->order);
        }
        $data = array_merge([
            'filters'   => $request->all(['search', 'field', 'order']),
            'getData'   => $data->paginate(10)
        ], $this->warehouse->baseData());

        return $this->responseWithInertia("Backend/Common/Index", $data);
    }

    public function store(Request $request)
    {
        if (isDemoMode()) {
            return back();
        }

        DB::beginTransaction();
        try {
            $warehouse = $this->warehouse->store($request);
            DB::commit();
            return back()->with('success', "{$warehouse->title} created successfully.");
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error', "Error creating {$request->title}: " . $th->getMessage());
        }
    }

    public function update(Warehouse $warehouse, Request $request)
    {
        if (isDemoMode()) {
            return back();
        }

        DB::beginTransaction();
        try {
            $this->warehouse->update($warehouse, $request);
            DB::commit();
            return back()->with('success', "{$warehouse->title} updated successfully.");
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error', "Error updating {$warehouse->title}: " . $th->getMessage());
        }
    }

    public function destroy(Warehouse $warehouse)
    {
        if (isDemoMode()) {
            return back();
        }
        try {
            $this->warehouse->delete($warehouse);
            return back()->with('success', "{$warehouse->title} deleted successfully.");
        } catch (\Throwable $th) {
            return back()->with('error', "Error deleting {$warehouse->title}: " . $th->getMessage());
        }
    }
}
