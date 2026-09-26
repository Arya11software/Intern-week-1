<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\FacilityRequest;
use App\Http\Resources\FacilityResource;
use App\Models\Facility;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FacilityController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->validate([
            'search' => ['nullable', 'string', 'max:120'],
            'status' => ['nullable', 'in:active,inactive'],
        ]);
        $facilities = Facility::query()->withCount('inspections')
            ->when($filters['search'] ?? null, fn ($query, $search) => $query->where(fn ($query) => $query
                ->where('name', 'like', "%{$search}%")->orWhere('city', 'like', "%{$search}%")))
            ->when(isset($filters['status']), fn ($query) => $query->where('is_active', $filters['status'] === 'active'))
            ->orderBy('name')->paginate(15);

        return FacilityResource::collection($facilities);
    }

    public function store(FacilityRequest $request): JsonResponse
    {
        return (new FacilityResource(Facility::create($request->validated())))->response()->setStatusCode(201);
    }

    public function show(Facility $facility): FacilityResource
    {
        return new FacilityResource($facility->loadCount('inspections'));
    }

    public function update(FacilityRequest $request, Facility $facility): FacilityResource
    {
        $facility->update($request->validated());

        return new FacilityResource($facility->refresh());
    }

    public function destroy(Facility $facility): JsonResponse
    {
        if ($facility->inspections()->exists()) {
            return response()->json(['message' => 'Facilities with inspection history cannot be deleted. Deactivate the facility instead.'], 409);
        }

        $facility->delete();

        return response()->json(['message' => 'Facility deleted.']);
    }
}