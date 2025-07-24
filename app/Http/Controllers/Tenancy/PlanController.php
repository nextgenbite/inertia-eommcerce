<?php

namespace App\Http\Controllers\Tenancy;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use App\Repositories\Interfaces\Tenancy\PlanInterface;
use App\Traits\ApiReturnFormatTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PlanController extends Controller
{
    use ApiReturnFormatTrait;
    protected $plan;
    public $title = ['Plan', 'plan'];

    public function __construct(PlanInterface $plan)
    {
        $this->plan = $plan;

    }

    public function index(Request $request)
    {
        $data = Plan::query();
        if ($request->has('search')) {
            $data->where('title', 'LIKE', "%" . $request->search . "%");
        }
        if ($request->has(['field', 'order'])) {
            $data->orderBy($request->field, $request->order);
        }
        $data = array_merge([
            'filters'   => $request->all(['search', 'field', 'order']),
            'getData'   => $data->paginate(10)
        ], $this->plan->baseData());

        return $this->responseWithInertia("Central/Backend/Plan/Index", $data);
    }

    public function store(Request $request)
    {
        if (isDemoMode()) {
            return redirect()->back();
        }

        DB::beginTransaction();
        try {
            $plan = $this->plan->store($request);
            DB::commit();
            return back()->with('success', "{$plan->title} created successfully.");
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error', "Error creating {$request->title}: " . $th->getMessage());
        }
    }

    public function update(Plan $plan, Request $request)
    {
        if (isDemoMode()) {
            return back();
        }

        DB::beginTransaction();
        try {
            $this->plan->update($plan, $request);
            DB::commit();
            return back()->with('success', "{$plan->title} updated successfully.");
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error', "Error updating {$plan->title}: " . $th->getMessage());
        }
    }

    public function destroy(Plan $plan)
    {
        try {
            $this->plan->delete($plan);
            return back()->with('success', "{$plan->title} deleted successfully.");
        } catch (\Throwable $th) {
            return back()->with('error', "Error deleting {$plan->title}: " . $th->getMessage());
        }
    }

    public function trashed()
    {
        $title =  $this->title;
        $trash = true;
        $data = Plan::onlyTrashed()->get();
        return view('backend.plan.index', compact('data', 'title', 'trash'));
    }

    public function restore($id)
    {
        $data = Plan::withTrashed()->find($id);
        $data->restore();

        $notification = array(
            'message' => 'Data Restore Successfully',
            'alert-type' => 'success'
        );

        return redirect()->back()->with($notification);
    }

    public function deleteForever($id)
    {
        $data = Plan::withTrashed()->find($id);
        $data->forceDelete();
    }
}
