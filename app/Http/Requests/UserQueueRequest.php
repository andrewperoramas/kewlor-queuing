<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\UserQueueStatus;
use Illuminate\Database\Query\Builder;
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

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string|\Illuminate\Validation\Rules\Unique>
     */
    public function rules(): array
    {
        return [
            'email' => 'nullable',
            'name' => [Rule::unique('user_queues')->where(
                fn (Builder $query) => $query->where('queue_number', '>', 0)->where('status', '!=', UserQueueStatus::SKIPPED)), 'required'],
            'message' => 'required',
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.unique' => 'You already have pending request. Please wait for response from our team.',
        ];
    }
}
