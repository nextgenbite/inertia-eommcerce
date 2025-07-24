<?php

namespace App\Http\Controllers\Tenant\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Supplier;
use App\Traits\ApiReturnFormatTrait;
use App\Traits\ImageUploadTrait;

class SupplierController extends Controller
{
    use ImageUploadTrait,ApiReturnFormatTrait;

    public $title = ['Supplier', 'supplier'];
    private $imagePath = 'upload/supplier/';



    public function index()
    {

        $title = $this->title;
        $data['data'] = Supplier::latest()->get();
        return $this->responseWithInertia("Backend/{$this->title[0]}/Index",  $data);
        return view('backend.' . strtolower($this->title[1]) . '.index', compact('data', 'title'));
    } // End Method


    public function create()
    {
        $title = $this->title;
        return view('backend.' . strtolower($this->title[1]) . '.create', compact('title'));
    } // End Method



    public function store(Request $request)
    {

        $validateData = $request->validate([
            'name' => 'required|max:200',
            'email' => 'required|unique:customers|max:200',
            'phone' => 'required|max:200',
            'address' => 'required|max:400',
            'shopname' => 'required|max:200',
            'account_holder' => 'required|max:200',
            'account_number' => 'required',
            'type' => 'required',
            'image' => 'required',
        ]);

        if ($request->has('image')) {
            $imagePath = $this->uploadImage($request, 'image', $this->imagePath, 300, 300);
        }
        Supplier::create([

            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'shopname' => $request->shopname,
            'type' => $request->type,
            'account_holder' => $request->account_holder,
            'account_number' => $request->account_number,
            'bank_name' => $request->bank_name,
            'bank_branch' => $request->bank_branch,
            'city' => $request->city,
            'image' => $imagePath ?? null,

        ]);

        $notification = array(
            'message' => 'Supplier Inserted Successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('all.'. strtolower($this->title[1]))->with($notification);
    } // End Method


    public function edit($id)
    {
        $title = $this->title;
        $supplier = Supplier::findOrFail($id);
        return view('backend.'. strtolower($this->title[1]) .'.edit', compact('title','supplier'));
    } // End Method


    public function update(Request $request)
    {

        $supplier_id = $request->id;
        $data =  Supplier::findOrFail($supplier_id);
        if ($request->has('image')) {
            $this->deleteImage($data->image);
            $imagePath = $this->uploadImage($request, 'image', $this->imagePath, 300, 300);
        }

        $data->update([

            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'shopname' => $request->shopname,
            'type' => $request->type,
            'account_holder' => $request->account_holder,
            'account_number' => $request->account_number,
            'bank_name' => $request->bank_name,
            'bank_branch' => $request->bank_branch,
            'city' => $request->city,
            'image' => $imagePath ?? $data->image,

        ]);



        $notification = array(
            'message' => 'Supplier Updated Successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('all.'. strtolower($this->title[1]))->with($notification);
    } // End Method



    public function destroy($id)
    {

        $supplier_img = Supplier::findOrFail($id);
        $img = $supplier_img->image;
        unlink($img);

        Supplier::findOrFail($id)->delete();

        $notification = array(
            'message' => 'Supplier Deleted Successfully',
            'alert-type' => 'success'
        );

        return redirect()->back()->with($notification);
    } // End Method

    public function DetailsSupplier($id)
    {

        $supplier = Supplier::findOrFail($id);
        return view('backend.'. strtolower($this->title[1]) .'.show', compact('supplier'));
    } // End Method

}
