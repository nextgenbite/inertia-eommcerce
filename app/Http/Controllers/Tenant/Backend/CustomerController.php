<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Customer;
use App\Traits\ImageUploadTrait;
use Intervention\Image\Facades\Image;
use Carbon\Carbon;

class CustomerController extends Controller
{
    use ImageUploadTrait;
    public $title = ['Customer', 'customer'];
    private $imagePath = 'upload/customer/';

    public function index()
    {
        $title = $this->title;
        $customer = Customer::latest()->get();
        return view('backend.customer.index', compact('title', 'customer'));
    } // End Method 


    public function create()
    {
        $title = $this->title;
        return view('backend.customer.create', compact('title'));
    } // End Method 


    public function store(Request $request)
    {

        $validateData = $request->validate([
            'name' => 'required|max:200',
            'email' => 'unique:customers|max:200',
            'phone' => 'max:15',
            'address' => 'max:400',
        ]);
        if ($request->has('image')) {
            $imagePath = $this->uploadImage($request, 'image', $this->imagePath, 300, 300);
        }


        $data =  Customer::insert([

            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'shopname' => $request->shopname,
            'account_holder' => $request->account_holder,
            'account_number' => $request->account_number,
            'bank_name' => $request->bank_name,
            'bank_branch' => $request->bank_branch,
            'city' => $request->city,
            'image' => $imagePath ?? null,
            'created_at' => Carbon::now(),

        ]);
        if (request()->ajax()) {
            return  response()->json(["data" => $data], 200);
        }

        $notification = array(
            'message' => 'Customer Inserted Successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('all.customer')->with($notification);
    } // End Method 


    public function edit($id)
    {
        $title = $this->title;
        $customer = Customer::findOrFail($id);
        return view('backend.customer.edit', compact('title', 'customer'));
    } // End Method 


    public function UpdateCustomer(Request $request)
    {

        $data = Customer::findOrFail($request->id);
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
            'account_holder' => $request->account_holder,
            'account_number' => $request->account_number,
            'bank_name' => $request->bank_name,
            'bank_branch' => $request->bank_branch,
            'city' => $request->city,
            'image' => $imagePath ?? $data->image,

        ]);

        $notification = array(
            'message' => 'Customer Updated Successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('all.customer')->with($notification);
    } // End Method 


    public function destroy($id)
    {

        $customer_img = Customer::findOrFail($id);
        $img = $customer_img->image;
        unlink($img);

        Customer::findOrFail($id)->delete();

        $notification = array(
            'message' => 'Customer Deleted Successfully',
            'alert-type' => 'success'
        );

        return redirect()->back()->with($notification);
    }

    public function searchCustomer()
    {


        $data = Customer::where("name", "LIKE", "%" . request()->search . "%")
            ->orWhere("phone",  request()->search)
            ->orWhere("email",  request()->search)
            ->get();
        if (request()->ajax()) {
            return  response()->json(['success' => true, "data" => $data], 200);
        }
        return $data;
    } // End Method 



}
