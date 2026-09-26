<?php

namespace App\Http\Controllers;

use App\Http\Requests\FacilityRequest;
use App\Models\Facility;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class FacilityController extends Controller
{
    public function index(Request $request): View
    {
        $filters = $request->validate([
            'search' => ['nullable', 'string', 'max:120'],
            'status' => ['nullable', 'in:active,inactive'],
        ]);

        $facilities = Facility::query()
            ->withCount('inspections')
            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->where(fn ($query) => $query->where('name', 'like', "%{$search}%")
                    ->orWhere('city', 'like', "%{$search}%"));
            })
            ->when(isset($filters['status']), fn ($query) => $query->where('is_active', $filters['status'] === 'active'))
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString();

        return view('facilities.index', compact('facilities'));
    }

    public function create(): View
    {
        return view('facilities.create');
    }

    public function store(FacilityRequest $request): RedirectResponse
    {
        Facility::create($request->validated());

        return redirect()->route('facilities.index')->with('status', 'Facility added to the register.');
    }

    public function show(Facility $facility): View
    {
        $facility->load(['inspections' => fn ($query) => $query->latest('inspected_at')->limit(12)]);

        return view('facilities.show', compact('facility'));
    }

    public function edit(Facility $facility): View
    {
        return view('facilities.edit', compact('facility'));
    }

    public function update(FacilityRequest $request, Facility $facility): RedirectResponse
    {
        $facility->update($request->validated());

        return redirect()->route('facilities.show', $facility)->with('status', 'Facility details updated.');
    }

    public function destroy(Facility $facility): RedirectResponse
    {
        if ($facility->inspections()->exists()) {
            return back()->withErrors(['facility' => 'A facility with inspection history cannot be deleted. Deactivate it instead.']);
        }

        $facility->delete();

        return redirect()->route('facilities.index')->with('status', 'Facility removed.');
    }
}