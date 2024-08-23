<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderRequest extends FormRequest
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
            'meal_name' => 'required',
            'order_date' => 'required|date',
            'quantity'  => 'required|numeric',
            'price'  => 'required|numeric'
        ];
    }

    public function messages()
    {
        return [
            'required' => 'Ce champs est obligatoire',
            'date'     => 'Veuillez choisir une date',
            'numeric'  => 'Veuillez saisir un nombre'
        ];
    }

}
