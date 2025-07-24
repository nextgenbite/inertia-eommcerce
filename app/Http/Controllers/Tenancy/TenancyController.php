<?php

namespace App\Http\Controllers\Tenancy;

use App\Http\Controllers\Controller;
use App\Http\Requests\TenancyStoreRequest;
use App\Models\Tenant;
use App\Traits\ApiReturnFormatTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Stancl\Tenancy\Database\Models\Domain;
use Inertia\Inertia;

class TenancyController extends Controller
{
    use ApiReturnFormatTrait;

    public function index()
    {
        try {
            return Inertia::render('Central/Backend/Tenant/Index', [
                'data' =>  Tenant::all(),
                'central_domain' => config('tenancy.central_domains')[1],

            ]);
        } catch (\Exception $e) {
            return $this->responseWithError($e->getMessage(), [], null);
        }
    }
    public function domain()
    {
        try {
            $data = Domain::paginate(10);
            return $this->responseWithSuccess(__('Data Retrieved Successfully'), $data, 200);
        } catch (\Exception $e) {
            return $this->responseWithError($e->getMessage(), [], null);
        }
    }
    public function register(Request $request)
    {
        try {
            // dd(config('tenancy.central_domains')[1]);
            return Inertia::render('Central/Backend/Tenant/Create', [
                'central_domain' => config('tenancy.central_domains')[1],
                'plan_id'=> $request->plan_id

            ]);
        } catch (\Exception $e) {
            return back()->with('error', "Error: " . $e->getMessage());
        }
    }

    public function  store(TenancyStoreRequest $request)
    {

        DB::beginTransaction();
        try {

            $data = Tenant::create($request->validated());
            $data->createDomain(['domain' => $request->domain]);
            DB::commit();
               return Inertia::render('Central/Backend/Tenant/Show', [
                'tenant' => $data,
                'central_domain' => config('tenancy.central_domains')[1],
            ]);
            return redirect()->route('tenant.index')->with('success', "{$request->domain} updated successfully.");
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error', "Error updbrandating {$request->domain}: " . $th->getMessage());
        }
    }

    public function  destroy(Tenant $tenant)
    {
        DB::beginTransaction();
        try {
            $tenant->delete();
            return redirect()->route('tenant.index')->with('success', "{$tenant->domain} deleted successfully.");
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', "Error Delete {$tenant->domain}: " . $e->getMessage());
        }
    }
    public function show(Tenant $tenant)
    {
        try {
            return Inertia::render('Central/Backend/Tenant/Show', [
                'tenant' => $tenant,
                'central_domain' => config('tenancy.central_domains')[1],
            ]);
        } catch (\Exception $e) {
            return back()->with('error', "Error: " . $e->getMessage());
        }
    }
}
