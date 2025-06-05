<?php

namespace App\Http\Controllers\Tenancy;

use App\Http\Controllers\Controller;
use App\Http\Requests\TenancyStoreRequest;
use App\Models\Tenant;
use App\Traits\ApiReturnFormatTrait;
use Illuminate\Http\Request;
use Stancl\Tenancy\Database\Models\Domain;

class TenancyController extends Controller
{
    use ApiReturnFormatTrait;

    public function index()
    {
        try {
            $data = Tenant::paginate(1);
            return $this->responseWithSuccess(__('Data Retrieved Successfully'), $data, 200);
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
        try{
        $data = Tenant::create($request->validated());
        $data->createDomain(['domain' => $request->domain]);
        return $this->responseWithSuccess(__('Data Store Successfully'), $data, 200);
    } catch (\Exception $e) {
        return $this->responseWithError($e->getMessage(), [], null);
    }
    }
}
