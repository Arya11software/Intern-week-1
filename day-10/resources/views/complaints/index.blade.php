@extends('layouts.app')

@section('title', 'Complaints')
@section('section', 'Complaints')

@section('content')
    <section class="page-heading page-heading-compact">
        <div>
            <p class="eyebrow">REPORTS <span>{{ str_pad($complaints->total(), 2, '0', STR_PAD_LEFT) }} OPEN</span></p>
            <h1>Complaint log</h1>
            <p class="heading-copy">Track issues raised by users and keep the response status visible.</p>
        </div>
        <a class="button button-dark" href="{{ route('complaints.create') }}"><span class="button-plus">+</span> Log complaint</a>
    </section>

    <section class="panel table-panel">
        <form class="filter-bar" method="get" action="{{ route('complaints.index') }}">
            <label class="search-field"><span>SEARCH</span><input type="search" name="search" value="{{ request('search') }}" placeholder="Facility or title" aria-label="Search complaints"></label>
            <label class="select-field"><span>STATUS</span><select name="status"><option value="">All statuses</option><option value="open" @selected(request('status') === 'open')>Open</option><option value="investigating" @selected(request('status') === 'investigating')>Investigating</option><option value="closed" @selected(request('status') === 'closed')>Closed</option></select></label>
            <label class="select-field"><span>SEVERITY</span><select name="severity"><option value="">All severities</option><option value="low" @selected(request('severity') === 'low')>Low</option><option value="moderate" @selected(request('severity') === 'moderate')>Moderate</option><option value="high" @selected(request('severity') === 'high')>High</option><option value="critical" @selected(request('severity') === 'critical')>Critical</option></select></label>
            <button class="button button-outline" type="submit">Apply filters</button>
        </form>

        @if ($complaints->isEmpty())
            <div class="empty-state">
                <span class="empty-stamp">00</span>
                <h3>No complaint records found.</h3>
                <p>Log the first complaint to start tracking follow-up and resolution.</p>
                <a class="button button-dark" href="{{ route('complaints.create') }}">Log complaint <span>↗</span></a>
            </div>
        @else
            <div class="table-scroll">
                <table>
                    <thead>
                        <tr>
                            <th>FACILITY</th>
                            <th>TOPIC</th>
                            <th>SEVERITY</th>
                            <th>STATUS</th>
                            <th>REPORTED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($complaints as $complaint)
                            <tr>
                                <td><a class="table-primary" href="{{ route('facilities.show', $complaint->facility) }}">{{ $complaint->facility->name }}</a><span class="table-sub">{{ ucfirst($complaint->category) }}</span></td>
                                <td>{{ $complaint->title }}</td>
                                <td><span class="badge badge-{{ $complaint->severity == 'critical' ? 'high' : ($complaint->severity == 'high' ? 'moderate' : 'low') }}">{{ ucfirst($complaint->severity) }}</span></td>
                                <td><span class="badge badge-{{ $complaint->status == 'closed' ? 'low' : ($complaint->status == 'investigating' ? 'moderate' : 'high') }}">{{ ucfirst($complaint->status) }}</span></td>
                                <td>{{ $complaint->reported_at->format('d M, H:i') }}</td>
                                <td><a class="row-action" href="{{ route('complaints.show', $complaint) }}" aria-label="View complaint">↗</a></td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
            <div class="pagination-wrap">{{ $complaints->links() }}</div>
        @endif
    </section>
@endsection
