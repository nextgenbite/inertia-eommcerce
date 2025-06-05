<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Unit;
use Illuminate\Http\Request;
use Carbon\Carbon;

class UnitController extends Controller
{

    public $title = ['Unit', 'unit'];

    public function index()
    {

        $title = $this->title;
        $data = Unit::latest()->get();
        return view('backend.unit.index', compact('data', 'title'));
    } // End Method


    public function store(Request $request)
    {

        Unit::insert([
            'title' => $request->title,
            'status' => $request->status,
            'created_at' => Carbon::now(),
        ]);

        $notification = array(
            'message' => 'Data Inserted Successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('all.unit')->with($notification);
    } // End Method


    public function edit($id)
    {
        $title = $this->title;
        $data = Unit::findOrFail($id);
        return view('backend.unit.edit', compact('data', 'title'));
    } // End Method


    public function update(Request $request)
    {

        $data_id = $request->id;

        Unit::findOrFail($data_id)->update([
            'title' => $request->title,
            'status' => $request->status,
            'created_at' => Carbon::now(),
        ]);

        $notification = array(
            'message' => 'Data Updated Successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('all.unit')->with($notification);
    } // End Method


    public function destroy($id)
    {

        Unit::findOrFail($id)->delete();

        $notification = array(
            'message' => 'Data Deleted Successfully',
            'alert-type' => 'success'
        );

        return redirect()->back()->with($notification);
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
