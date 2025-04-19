<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

final class UserUpdateQueueRequest extends FormRequest
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
            'notes' => 'nullable',
            'message' => 'required',
            'id' => 'required|integer',
            // 'queue_number' => 'required|integer',
            'initial_queue_number' => 'required|integer',
            'boost_count' => 'integer',
            'status' => 'required|string',
        ];
    }
}
