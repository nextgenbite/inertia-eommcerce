<?php

namespace App\Http\Controllers\Tenant\Backend;

use App\Http\Controllers\Controller;
use App\Models\Unit;
use App\Repositories\Interfaces\Product\UnitInterface;
use App\Traits\ApiReturnFormatTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UnitController extends Controller
{

    use ApiReturnFormatTrait;
    protected $unit;
    public $title = ['Unit', 'unit'];

    public function __construct(UnitInterface $unit)
    {
        $this->unit = $unit;

        $this->middleware('permission:unit.create', ['only' => ['create', 'store']]);
        $this->middleware('permission:unit.read', ['only' => ['index', 'show']]);
        $this->middleware('permission:unit.updated', ['only' => ['edit', 'update']]);
        $this->middleware('permission:unit.delete', ['only' => ['destroy', 'destroyBulk']]);
    }



    public function index(Request $request)
    {
        $data = Unit::query();
        if ($request->has('search')) {
            $data->where('title', 'LIKE', "%" . $request->search . "%");
        }
        if ($request->has(['field', 'order'])) {
            $data->orderBy($request->field, $request->order);
        }
        $data = array_merge([
            'filters'   => $request->all(['search', 'field', 'order']),
            'getData'   => $data->paginate(10)
        ], $this->unit->baseData());

        return $this->responseWithInertia("Backend/Common/Index", $data);
    }

    public function store(Request $request)
    {
        if (isDemoMode()) {
            return redirect()->back();
        }

        DB::beginTransaction();
        try {
            $unit = $this->unit->store($request);
            DB::commit();
            return back()->with('success', "{$unit->title} created successfully.");
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error', "Error creating {$request->title}: " . $th->getMessage());
        }
    }

    public function update(Unit $unit, Request $request)
    {
        if (isDemoMode()) {
            return back();
        }

        DB::beginTransaction();
        try {
            $this->unit->update($unit, $request);
            DB::commit();
            return back()->with('success', "{$unit->title} updated successfully.");
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error', "Error updating {$unit->title}: " . $th->getMessage());
        }
    }

    public function destroy(Unit $unit)
    {
        try {
            $this->unit->delete($unit);
            return back()->with('success', "{$unit->title} deleted successfully.");
        } catch (\Throwable $th) {
            return back()->with('error', "Error deleting {$unit->title}: " . $th->getMessage());
        }
    }
    public function trashed()
    {
        $title =  $this->title;
        $trash =true;
        $data = Unit::onlyTrashed()->get();
        return view('backend.unit.index', compact('data', 'title', 'trash'));


    }
    public function restore($id)
    {
        $data = Unit::withTrashed()->find($id);
        $data->restore();

        $notification = array(
            'message' => 'Data Restore Successfully',
            'alert-type' => 'success'
        );

        return redirect()->back()->with($notification);
    }
    public function deleteForever($id)
    {
        // If you have not deleted before
        // $data = Unit::find($id);

        // If you have soft-deleted it before
        $data = Unit::withTrashed()->find($id);

        $data->forceDelete(); // This permanently deletes the Data for ever!

    } // End Method
}
