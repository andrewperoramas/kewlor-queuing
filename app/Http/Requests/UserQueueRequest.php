<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserQueueRequest extends FormRequest
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
            'name' => 'required',
             'email' =>   Rule::unique('user_queues')->where(function ($query) {
            return $query->where('queue_number', '>', 0);
        }), // Exclude the current record
            'message' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'email.unique' => 'You already have pending request. Please wait for response from our team.',
        ];
    }
}
