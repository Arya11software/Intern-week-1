<?php

namespace App\Services;

class RiskAssessmentService
{
    public function assess(array $input): array
    {
        $score = 0;
        $factors = [];

        if ((int) $input['cleanliness_score'] <= 2) {
            $score += 2;
            $factors[] = 'Low cleanliness score';
        }
        if ((int) $input['odor_score'] <= 2) {
            $score++;
            $factors[] = 'Low odor score';
        }
        if ($input['waste_level'] === 'high') {
            $score += 2;
            $factors[] = 'High waste level';
        } elseif ($input['waste_level'] === 'moderate') {
            $score++;
            $factors[] = 'Moderate waste level';
        }
        if (! filter_var($input['water_available'], FILTER_VALIDATE_BOOLEAN)) {
            $score++;
            $factors[] = 'Water unavailable';
        }
        if ((int) $input['complaints'] >= 4) {
            $score += 2;
            $factors[] = 'Four or more complaints';
        } elseif ((int) $input['complaints'] >= 2) {
            $score++;
            $factors[] = 'Two or more complaints';
        }
        if ((int) $input['hours_since_cleaning'] >= 12) {
            $score += 2;
            $factors[] = 'At least 12 hours since cleaning';
        } elseif ((int) $input['hours_since_cleaning'] >= 6) {
            $score++;
            $factors[] = 'At least 6 hours since cleaning';
        }

        return [
            'risk_score' => $score,
            'risk_level' => $score >= 6 ? 'high' : ($score >= 3 ? 'moderate' : 'low'),
            'risk_factors' => $factors,
        ];
    }
}