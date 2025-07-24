<?php

namespace App\Http\Controllers\Tenancy;

use App\Http\Controllers\Controller;
use App\Repositories\Interfaces\Tenancy\DomainInterface;
use App\Traits\ApiReturnFormatTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Stancl\Tenancy\Database\Models\Domain;

class DomainController extends Controller
{
    use ApiReturnFormatTrait;
    protected $domain;
    public $title = ['Domain', 'domain'];

    public function __construct(DomainInterface $domain)
    {
        $this->domain = $domain;

    }

    public function index(Request $request)
    {
        $data = Domain::query();
        if ($request->has('search')) {
            $data->where('domain', 'LIKE', "%" . $request->search . "%");
        }
        if ($request->has(['field', 'order'])) {
            $data->orderBy($request->field, $request->order);
        }
        $data = array_merge([
            'filters'   => $request->all(['search', 'field', 'order']),
            'getData'   => $data->paginate(10)
        ], $this->domain->baseData());

        return $this->responseWithInertia("Backend/Common/Index", $data);
    }

    public function store(Request $request)
    {
        if (isDemoMode()) {
            return redirect()->back();
        }

        DB::beginTransaction();
        try {
            $domain = $this->domain->store($request);
            DB::commit();
            return back()->with('success', "{$domain->domain} created successfully.");
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error', "Error creating {$request->domain}: " . $th->getMessage());
        }
    }

    public function update(Domain $domain, Request $request)
    {
        if (isDemoMode()) {
            return back();
        }

        DB::beginTransaction();
        try {
            $this->domain->update($domain, $request);
            DB::commit();
            return back()->with('success', "{$domain->domain} updated successfully.");
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error', "Error updating {$domain->domain}: " . $th->getMessage());
        }
    }

    public function destroy(Domain $domain)
    {
        try {
            $this->domain->delete($domain);
            return back()->with('success', "{$domain->domain} deleted successfully.");
        } catch (\Throwable $th) {
            return back()->with('error', "Error deleting {$domain->domain}: " . $th->getMessage());
        }
    }

    public function trashed()
    {
        $title =  $this->title;
        $trash = true;
        $data = Domain::onlyTrashed()->get();
        return view('backend.domain.index', compact('data', 'title', 'trash'));
    }

    public function restore($id)
    {
        $data = Domain::withTrashed()->find($id);
        $data->restore();

        $notification = array(
            'message' => 'Data Restore Successfully',
            'alert-type' => 'success'
        );

        return redirect()->back()->with($notification);
    }

    public function deleteForever($id)
    {
        $data = Domain::withTrashed()->find($id);
        $data->forceDelete();
    }
}
