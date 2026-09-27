<?php

namespace App\Http\Controllers;

use App\Http\Requests\ComplaintRequest;
use App\Models\Complaint;
use App\Models\Facility;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class ComplaintController extends Controller
{
    public function index(Request $request): View
    {
        $filters = $request->validate([
            'search' => ['nullable', 'string', 'max:120'],
            'status' => ['nullable', 'in:open,investigating,closed'],
            'severity' => ['nullable', 'in:low,moderate,high,critical'],
        ]);

        $complaints = Complaint::query()
            ->with('facility')
            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->where(fn ($query) => $query->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhereHas('facility', fn ($facilityQuery) => $facilityQuery->where('name', 'like', "%{$search}%")));
            })
            ->when($filters['status'] ?? null, fn ($query, $status) => $query->where('status', $status))
            ->when($filters['severity'] ?? null, fn ($query, $severity) => $query->where('severity', $severity))
            ->latest('reported_at')
            ->paginate(10)
            ->withQueryString();

        return view('complaints.index', compact('complaints'));
    }

    public function create(): View
    {
        return view('complaints.create', ['facilities' => Facility::where('is_active', true)->orderBy('name')->get()]);
    }

    public function store(ComplaintRequest $request): RedirectResponse
    {
        Complaint::create($request->validated());

        return redirect()->route('complaints.index')->with('status', 'Complaint logged and visible to the team.');
    }

    public function show(Complaint $complaint): View
    {
        $complaint->load('facility');

        return view('complaints.show', compact('complaint'));
    }

    public function edit(Complaint $complaint): View
    {
        return view('complaints.edit', [
            'complaint' => $complaint,
            'facilities' => Facility::orderBy('name')->get(),
        ]);
    }

    public function update(ComplaintRequest $request, Complaint $complaint): RedirectResponse
    {
        $complaint->update($request->validated());

        return redirect()->route('complaints.show', $complaint)->with('status', 'Complaint updated.');
    }

    public function destroy(Complaint $complaint): RedirectResponse
    {
        $complaint->delete();

        return redirect()->route('complaints.index')->with('status', 'Complaint removed.');
    }
}
