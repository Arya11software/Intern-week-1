<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ComplaintRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'facility_id' => ['required', 'integer', Rule::exists('facilities', 'id')],
            'title' => ['required', 'string', 'max:150'],
            'description' => ['required', 'string', 'max:2000'],
            'category' => ['required', 'in:hygiene,safety,cleanliness,water,staff,other'],
            'severity' => ['required', 'in:low,moderate,high,critical'],
            'status' => ['required', 'in:open,investigating,closed'],
            'reported_at' => ['required', 'date'],
            'resolved_at' => ['nullable', 'date'],
        ];
    }
}
