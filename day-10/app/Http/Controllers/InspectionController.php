<?php

namespace App\Http\Controllers;

use App\Http\Requests\InspectionRequest;
use App\Models\Facility;
use App\Models\Inspection;
use App\Services\RiskAssessmentService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class InspectionController extends Controller
{
    public function index(Request $request): View
    {
        $filters = $request->validate([
            'search' => ['nullable', 'string', 'max:120'],
            'risk' => ['nullable', 'in:low,moderate,high'],
            'facility' => ['nullable', 'integer', 'exists:facilities,id'],
        ]);

        $inspections = Inspection::query()
            ->with('facility')
            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->where(fn ($query) => $query->where('inspector', 'like', "%{$search}%")
                    ->orWhereHas('facility', fn ($facilityQuery) => $facilityQuery->where('name', 'like', "%{$search}%")));
            })
            ->when($filters['risk'] ?? null, fn ($query, $risk) => $query->where('risk_level', $risk))
            ->when($filters['facility'] ?? null, fn ($query, $facilityId) => $query->where('facility_id', $facilityId))
            ->latest('inspected_at')
            ->paginate(10)
            ->withQueryString();

        $facilities = Facility::orderBy('name')->get(['id', 'name']);

        return view('inspections.index', compact('inspections', 'facilities'));
    }

    public function create(): View
    {
        return view('inspections.create', ['facilities' => Facility::where('is_active', true)->orderBy('name')->get()]);
    }

    public function store(InspectionRequest $request, RiskAssessmentService $riskAssessment): RedirectResponse
    {
        $data = $request->validated();
        Inspection::create([...$data, ...$riskAssessment->assess($data)]);

        return redirect()->route('inspections.index')->with('status', 'Inspection recorded and risk band assessed.');
    }

    public function show(Inspection $inspection): View
    {
        $inspection->load('facility');

        return view('inspections.show', compact('inspection'));
    }

    public function edit(Inspection $inspection): View
    {
        return view('inspections.edit', [
            'inspection' => $inspection,
            'facilities' => Facility::orderBy('name')->get(),
        ]);
    }

    public function update(InspectionRequest $request, Inspection $inspection, RiskAssessmentService $riskAssessment): RedirectResponse
    {
        $data = $request->validated();
        $inspection->update([...$data, ...$riskAssessment->assess($data)]);

        return redirect()->route('inspections.show', $inspection)->with('status', 'Inspection updated and risk band reassessed.');
    }

    public function destroy(Inspection $inspection): RedirectResponse
    {
        $inspection->delete();

        return redirect()->route('inspections.index')->with('status', 'Inspection removed.');
    }
}