<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Traits\ApiReturnFormatTrait;
use Illuminate\Http\Request;
use App\Traits\ImageUploadTrait;
use Illuminate\Support\Facades\Config;

class SettingController extends Controller
{
    use ImageUploadTrait, ApiReturnFormatTrait;

    private $imagePath = 'upload/setting';
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $setting = Setting::all()->pluck('value', 'key');
        $data = ['settings' => $setting];
        return $this->responseWithInertia("Backend/Setup/Index",  $data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = [
            'app_name' => $request->app_name,
            'phone' => $request->phone,
            'email' => $request->email,
            'address' => $request->address,
            'tax' => $request->tax,
        ];

        if ($request->hasFile('logo')) {
            $data['logo'] = $this->storeImage($request->file('logo'), 'upload/setting', 200, 200);
        }

        $setting = Setting::first();

        if ($setting) {
            $this->deleteImage($setting->logo);
        }

        Setting::updateOrCreate([], $data);

        $notification = [
            'message' => $setting ? 'Settings Updated Successfully' : 'Settings Inserted Successfully',
            'alert-type' => 'success'
        ];

        return redirect()->back()->with($notification);
    }
    public function update(Request $request)
    {
        $request->validate([
            'key' => 'required|array',
        ]);

        foreach ($request->key as $key => $value) {
            if ($key == 'logo' || $key == 'favicon') {
                $setting = Setting::where('key', $key)->first();
                if ($setting) {
                    $this->deleteImage($setting->value);
                }
                // Process image upload
                $value = $this->storeImage( $value,$this->imagePath, 300, 300);
            }

            // Check if $value is not null
            if ($value !== null) {
                // Store configuration setting
                Setting::updateOrCreate(
                    ['key' => $key],
                    ['value' => $value]
                );
            }
        }

        $notification = [
            'message' =>  'Settings Updated Successfully' ,
            'alert-type' => 'success'
        ];

        return redirect()->back()->with($notification);
    }



    public function overWriteEnvFile($type, $val)
    {
        \Log::info("Type: $type, Value: $val"); // Log the values

            $path = base_path('.env');
            if (file_exists($path)) {
                $val = '"'.trim($val).'"';
                if(is_numeric(strpos(file_get_contents($path), $type)) && strpos(file_get_contents($path), $type) >= 0){
                    file_put_contents($path, str_replace(
                        $type.'="'.env($type).'"', $type.'='.$val, file_get_contents($path)
                    ));
                }
                else{
                    file_put_contents($path, file_get_contents($path)."\r\n".$type.'='.$val);
                }
            }

    }

        /**
     * Update the API key's for other methods.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function updateEnvKeys(Request $request)
    {
        try {
            foreach ($request->types as $type) {
                $value = $request->input($type);

                $envKey = strtoupper($type);
                $envValue = '"' . trim($value) . '"';

                $envFilePath = base_path('.env');
                if (file_exists($envFilePath)) {
                    $envContent = file_get_contents($envFilePath);

                    if (strpos($envContent, $envKey) !== false) {
                        $envContent = preg_replace(
                            '/^' . $envKey . '.*/m',
                            $envKey . '=' . $envValue,
                            $envContent
                        );
                    } else {
                        $envContent .= "\n" . $envKey . '=' . $envValue;
                    }

                    if (file_put_contents($envFilePath, $envContent) === false) {
                        throw new \Exception('Failed to write to .env file');
                    }
                } else {
                    throw new \Exception('.env file not found');
                }
            }

            return redirect()->back()->with([
                'message'     => 'Settings updated successfully',
                'alert-type'  => 'success'
            ]);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return redirect()->back()->with([
                'message'     => 'Failed to update settings: ' . $e->getMessage(),
                'alert-type'  => 'error'
            ]);
        }
    }



}
