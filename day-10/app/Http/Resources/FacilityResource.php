<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FacilityResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'facility_type' => $this->facility_type,
            'address' => $this->address,
            'city' => $this->city,
            'description' => $this->description,
            'is_active' => $this->is_active,
            'inspections_count' => $this->whenCounted('inspections'),
            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),
        ];
    }
}