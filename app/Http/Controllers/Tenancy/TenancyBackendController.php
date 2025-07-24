<?php

namespace App\Http\Controllers\Tenancy;

use App\Http\Controllers\Controller;
use App\Http\Requests\TenancyStoreRequest;
use App\Models\Tenant;
use App\Repositories\Interfaces\Tenancy\TenantInterface;
use App\Traits\ApiReturnFormatTrait;
use Illuminate\Http\Request;
use Stancl\Tenancy\Database\Models\Domain;

class TenancyBackendController extends Controller
{
    use ApiReturnFormatTrait;
    protected $tenant;
    public $title = ['Tenant', 'tenant'];

    public function __construct(TenantInterface $tenant)
    {
        $this->tenant = $tenant;


    }

    public function index(Request $request)
    {
        try {
            $data = Tenant::query();
            if ($request->has('search')) {
                $data->where('title', 'LIKE', "%" . $request->search . "%");
            }
            if ($request->has(['field', 'order'])) {
                $data->orderBy($request->field, $request->order);
            }
            $data =   array_merge([
                'filters'       => $request->all(['search', 'field', 'order']),
                'getData'         => $data->paginate(10)

            ], $this->tenant->baseData());

            return $this->responseWithInertia("Backend/Common/Index", $data);
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
    public function register()
    {
        return view('auth.tenancy_register');
    }

    public function  store(TenancyStoreRequest $request)
    {
        try {
            $data = Tenant::create($request->validated());
            $data->createDomain(['domain' => $request->domain]);
            return $this->responseWithSuccess(__('Data Store Successfully'), $data, 200);
        } catch (\Exception $e) {
            return $this->responseWithError($e->getMessage(), [], null);
        }
    }

    public function  destroy(Request $request)
    {
          try {
            $data = Tenant::create($request->validated());
            $data->createDomain(['domain' => $request->domain]);
            return $this->responseWithSuccess(__('Data Store Successfully'), $data, 200);
        } catch (\Exception $e) {
            return response($e->getMessage());
        }
    }
}
