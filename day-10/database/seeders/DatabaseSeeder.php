<?php

namespace Database\Seeders;

use App\Models\Facility;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $facilities = [
            ['name' => 'Riverside Community Clinic', 'facility_type' => 'Healthcare', 'address' => '18 Riverside Road', 'city' => 'Pune', 'description' => 'Outpatient clinic and public waiting area.'],
            ['name' => 'Central Transit Exchange', 'facility_type' => 'Transport', 'address' => '4 Station Square', 'city' => 'Pune', 'description' => 'High-footfall bus and rail interchange.'],
            ['name' => 'North Market Hall', 'facility_type' => 'Market', 'address' => '72 Market Lane', 'city' => 'Nashik', 'description' => 'Indoor market with shared washrooms.'],
        ];

        foreach ($facilities as $facilityData) {
            $facility = Facility::firstOrCreate(['name' => $facilityData['name']], $facilityData);
            $samples = match ($facility->name) {
                'Riverside Community Clinic' => [
                    ['inspector' => 'Mira Joshi', 'days_ago' => 0, 'cleanliness_score' => 4, 'odor_score' => 4, 'waste_level' => 'low', 'water_available' => true, 'footfall' => 86, 'complaints' => 0, 'hours_since_cleaning' => 2],
                    ['inspector' => 'Aman Shah', 'days_ago' => 2, 'cleanliness_score' => 2, 'odor_score' => 3, 'waste_level' => 'moderate', 'water_available' => true, 'footfall' => 112, 'complaints' => 2, 'hours_since_cleaning' => 7],
                ],
                'Central Transit Exchange' => [
                    ['inspector' => 'Aman Shah', 'days_ago' => 0, 'cleanliness_score' => 2, 'odor_score' => 2, 'waste_level' => 'high', 'water_available' => false, 'footfall' => 940, 'complaints' => 5, 'hours_since_cleaning' => 14],
                    ['inspector' => 'Mira Joshi', 'days_ago' => 1, 'cleanliness_score' => 3, 'odor_score' => 3, 'waste_level' => 'moderate', 'water_available' => true, 'footfall' => 810, 'complaints' => 3, 'hours_since_cleaning' => 8],
                ],
                default => [
                    ['inspector' => 'Leena Patil', 'days_ago' => 0, 'cleanliness_score' => 3, 'odor_score' => 4, 'waste_level' => 'moderate', 'water_available' => true, 'footfall' => 360, 'complaints' => 1, 'hours_since_cleaning' => 5],
                    ['inspector' => 'Leena Patil', 'days_ago' => 3, 'cleanliness_score' => 5, 'odor_score' => 4, 'waste_level' => 'low', 'water_available' => true, 'footfall' => 280, 'complaints' => 0, 'hours_since_cleaning' => 3],
                ],
            };

            foreach ($samples as $sample) {
                $inspectedAt = Carbon::now()->subDays($sample['days_ago'])->setTime(9, 30);
                unset($sample['days_ago']);
                $risk = app(\App\Services\RiskAssessmentService::class)->assess($sample);
                $facility->inspections()->firstOrCreate(
                    ['inspector' => $sample['inspector'], 'inspected_at' => $inspectedAt],
                    [...$sample, ...$risk, 'inspected_at' => $inspectedAt],
                );
            }
        }
    }
}
