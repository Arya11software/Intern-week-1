<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Inspection extends Model
{
    use HasFactory;

    protected $fillable = [
        'facility_id', 'inspector', 'inspected_at', 'cleanliness_score', 'odor_score',
        'waste_level', 'water_available', 'footfall', 'complaints', 'hours_since_cleaning',
        'risk_score', 'risk_level', 'risk_factors',
    ];

    protected function casts(): array
    {
        return [
            'inspected_at' => 'datetime',
            'water_available' => 'boolean',
            'risk_factors' => 'array',
        ];
    }

    public function facility(): BelongsTo
    {
        return $this->belongsTo(Facility::class);
    }
}