<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;
use Carbon\Carbon;

class BrandController extends Controller
{
    public $title = ['Brand', 'brand'];

    public function index(){

        $title= $this->title;
        $data = Brand::latest()->get();
        return view('backend.brand.index',compact('data', 'title'));

    }// End Method


    public function store(Request $request){

        Brand::insert([
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->status,
            'created_at' => Carbon::now(),
        ]);

         $notification = array(
            'message' => 'Data Inserted Successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('all.brand')->with($notification);  
    }// End Method


    public function edit($id){
        $title= $this->title;
        $data = Brand::findOrFail($id);
        return view('backend.brand.edit',compact('data', 'title'));

    }// End Method


    public function update(Request $request){

        $data_id = $request->id;

          Brand::findOrFail($data_id)->update([
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->status,
            'created_at' => Carbon::now(),
        ]);

         $notification = array(
            'message' => 'Data Updated Successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('all.brand')->with($notification);   

    }// End Method


    public function destroy($id){

        Brand::findOrFail($id)->delete();

         $notification = array(
            'message' => 'Data Deleted Successfully',
            'alert-type' => 'success'
        );

        return redirect()->back()->with($notification);  


    }// End Method

}
