<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Facility;
use App\Models\Inspection;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function __invoke(): JsonResponse
    {
        return response()->json(['data' => [
            'active_facilities' => Facility::where('is_active', true)->count(),
            'total_inspections' => Inspection::count(),
            'high_risk_inspections' => Inspection::where('risk_level', 'high')->count(),
            'average_cleanliness' => round((float) Inspection::avg('cleanliness_score'), 2),
            'risk_distribution' => Inspection::query()->selectRaw('risk_level, COUNT(*) as total')
                ->groupBy('risk_level')->pluck('total', 'risk_level'),
        ]]);
    }
}