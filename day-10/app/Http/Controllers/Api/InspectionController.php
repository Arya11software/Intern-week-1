<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\InspectionRequest;
use App\Http\Resources\InspectionResource;
use App\Models\Inspection;
use App\Services\RiskAssessmentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InspectionController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->validate([
            'search' => ['nullable', 'string', 'max:120'],
            'risk' => ['nullable', 'in:low,moderate,high'],
            'facility_id' => ['nullable', 'integer', 'exists:facilities,id'],
        ]);
        $inspections = Inspection::query()->with('facility')
            ->when($filters['search'] ?? null, fn ($query, $search) => $query->where(fn ($query) => $query
                ->where('inspector', 'like', "%{$search}%")
                ->orWhereHas('facility', fn ($facilityQuery) => $facilityQuery->where('name', 'like', "%{$search}%"))))
            ->when($filters['risk'] ?? null, fn ($query, $risk) => $query->where('risk_level', $risk))
            ->when($filters['facility_id'] ?? null, fn ($query, $facilityId) => $query->where('facility_id', $facilityId))
            ->latest('inspected_at')->paginate(15);

        return InspectionResource::collection($inspections);
    }

    public function store(InspectionRequest $request, RiskAssessmentService $riskAssessment): JsonResponse
    {
        $data = $request->validated();
        $inspection = Inspection::create([...$data, ...$riskAssessment->assess($data)]);

        return (new InspectionResource($inspection->load('facility')))->response()->setStatusCode(201);
    }

    public function show(Inspection $inspection): InspectionResource
    {
        return new InspectionResource($inspection->load('facility'));
    }

    public function update(InspectionRequest $request, Inspection $inspection, RiskAssessmentService $riskAssessment): InspectionResource
    {
        $data = $request->validated();
        $inspection->update([...$data, ...$riskAssessment->assess($data)]);

        return new InspectionResource($inspection->refresh()->load('facility'));
    }

    public function destroy(Inspection $inspection): JsonResponse
    {
        $inspection->delete();

        return response()->json(['message' => 'Inspection deleted.']);
    }
}