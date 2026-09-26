<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InspectionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'facility_id' => $this->facility_id,
            'facility' => new FacilityResource($this->whenLoaded('facility')),
            'inspector' => $this->inspector,
            'inspected_at' => $this->inspected_at?->toISOString(),
            'cleanliness_score' => $this->cleanliness_score,
            'odor_score' => $this->odor_score,
            'waste_level' => $this->waste_level,
            'water_available' => $this->water_available,
            'footfall' => $this->footfall,
            'complaints' => $this->complaints,
            'hours_since_cleaning' => $this->hours_since_cleaning,
            'risk_score' => $this->risk_score,
            'risk_level' => $this->risk_level,
            'risk_factors' => $this->risk_factors,
            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),
        ];
    }
}