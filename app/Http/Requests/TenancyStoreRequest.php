<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;

class TenancyStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' => 'string|nullable',
            'company_name' => 'required|string',
            'domain' => 'required|string|lowercase|unique:domains|max:100',
            'first_name' => 'string|max:255',
            'last_name' => 'string|max:255',
            'email' => 'required|string|lowercase|email|max:255',
            'password' => ['required', 'string','confirmed', Rules\Password::defaults()],
        ];
        
    }

    public function prepareForValidation()
    {
        $this->merge([
            'id' => $this->domain,
            'domain' => $this->domain. '.' . config('tenancy.central_domains')[1]
        ]);
    }
}
