<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class InspectionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'facility_id' => ['required', 'integer', Rule::exists('facilities', 'id')->where('is_active', true)],
            'inspector' => ['required', 'string', 'max:120'],
            'inspected_at' => ['required', 'date', 'before_or_equal:now'],
            'cleanliness_score' => ['required', 'integer', 'between:1,5'],
            'odor_score' => ['required', 'integer', 'between:1,5'],
            'waste_level' => ['required', 'in:low,moderate,high'],
            'water_available' => ['required', 'boolean'],
            'footfall' => ['required', 'integer', 'between:0,10000000'],
            'complaints' => ['required', 'integer', 'between:0,1000000'],
            'hours_since_cleaning' => ['required', 'integer', 'between:0,8760'],
        ];
    }
}