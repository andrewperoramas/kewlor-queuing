<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

final class UserQueueRequest extends FormRequest
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
            'email' => Rule::unique('user_queues')->where(fn ($query) => $query->where('queue_number', '>', 0)), // Exclude the current record
            'message' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'email.unique' => 'You already have pending request. Please wait for response from our team.',
        ];
    }
}
