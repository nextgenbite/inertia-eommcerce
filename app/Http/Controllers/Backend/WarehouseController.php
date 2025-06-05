<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Carbon\Carbon;

class WarehouseController extends Controller
{
    public $title = ['Warehouse', 'warehouse'];

    public function index(){

        $title= $this->title;
        $data = Warehouse::latest()->get();
        return view('backend.warehouse.index',compact('data', 'title'));

    }// End Method


    public function store(Request $request){

        Warehouse::insert([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'created_at' => Carbon::now(),
        ]);

         $notification = array(
            'message' => 'Data Inserted Successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('all.warehouse')->with($notification);  
    }// End Method


    public function edit($id){
        $title= $this->title;
        $data = Warehouse::findOrFail($id);
        return view('backend.warehouse.edit',compact('data', 'title'));

    }// End Method


    public function update(Request $request){

        $category_id = $request->id;

          Warehouse::findOrFail($category_id)->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'created_at' => Carbon::now(),
        ]);

         $notification = array(
            'message' => 'Data Updated Successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('all.warehouse')->with($notification);   

    }// End Method


    public function destroy($id){

        Warehouse::findOrFail($id)->delete();

         $notification = array(
            'message' => 'Data Deleted Successfully',
            'alert-type' => 'success'
        );

        return redirect()->back()->with($notification);  


    }// End Method
}
