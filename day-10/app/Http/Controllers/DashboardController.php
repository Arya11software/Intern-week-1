<?php

namespace App\Http\Controllers;

use App\Models\Facility;
use App\Models\Inspection;
use Illuminate\View\View;

class DashboardController extends Controller
{
    public function __invoke(): View
    {
        $riskCounts = Inspection::query()
            ->selectRaw('risk_level, COUNT(*) as total')
            ->groupBy('risk_level')
            ->pluck('total', 'risk_level');

        return view('dashboard', [
            'facilityCount' => Facility::where('is_active', true)->count(),
            'inspectionCount' => Inspection::count(),
            'highRiskCount' => Inspection::where('risk_level', 'high')->count(),
            'averageCleanliness' => Inspection::avg('cleanliness_score'),
            'riskCounts' => $riskCounts,
            'recentInspections' => Inspection::with('facility')->latest('inspected_at')->limit(6)->get(),
            'facilitiesNeedingAttention' => Facility::query()
                ->withMax(['inspections as latest_high_risk_at' => fn ($query) => $query->where('risk_level', 'high')], 'inspected_at')
                ->whereHas('inspections', fn ($query) => $query->where('risk_level', 'high'))
                ->orderByDesc('latest_high_risk_at')
                ->limit(4)
                ->get(),
        ]);
    }
}