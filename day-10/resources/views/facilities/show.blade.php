@extends('layouts.app')
@section('title', $facility->name)
@section('section', 'Facilities / Details')
@section('content')
    <section class="page-heading page-heading-compact">
        <div><p class="eyebrow">{{ strtoupper($facility->facility_type) }} <span>{{ strtoupper($facility->city) }}</span></p><h1>{{ $facility->name }}</h1><p class="heading-copy">{{ $facility->address }} · <span class="badge {{ $facility->is_active ? 'badge-low' : 'badge-muted' }}">{{ $facility->is_active ? 'Active' : 'Inactive' }}</span></p></div>
        <div class="heading-actions"><a class="button button-outline" href="{{ route('facilities.edit', $facility) }}">Edit details</a><a class="button button-dark" href="{{ route('inspections.create', ['facility_id' => $facility->id]) }}">New inspection <span>↗</span></a></div>
    </section>
    <section class="detail-grid">
        <article class="panel detail-facts"><p class="eyebrow">FACILITY NOTES</p><h2>About this site</h2><p>{{ $facility->description ?: 'No additional site notes have been added.' }}</p><div class="detail-fact"><span>REGISTERED</span><strong>{{ $facility->created_at->format('d M Y') }}</strong></div><div class="detail-fact"><span>INSPECTIONS</span><strong>{{ $facility->inspections->count() }} recent records</strong></div><div class="detail-fact"><span>COMPLAINTS</span><strong>{{ $facility->complaints->count() }} logged issues</strong></div></article>
        <article class="panel table-panel detail-history"><div class="panel-heading"><div><p class="eyebrow">SITE HISTORY</p><h2>Recent inspections</h2></div></div>
            @forelse ($facility->inspections as $inspection)
                <a class="history-row" href="{{ route('inspections.show', $inspection) }}"><span class="history-date">{{ $inspection->inspected_at->format('d') }}<small>{{ $inspection->inspected_at->format('M') }}</small></span><span class="history-main"><strong>{{ $inspection->inspector }}</strong><small>Cleanliness {{ $inspection->cleanliness_score }}/5 · {{ $inspection->complaints }} complaints</small></span><span class="badge badge-{{ $inspection->risk_level }}">{{ ucfirst($inspection->risk_level) }}</span></a>
            @empty
                <div class="empty-inline"><span class="empty-stamp">00</span><span><strong>No inspections yet</strong><small>Record a site check to start a history.</small></span></div>
            @endforelse
        </article>
    </section>

    <section class="panel table-panel detail-history">
        <div class="panel-heading"><div><p class="eyebrow">REPORTS</p><h2>Recent complaints</h2></div><a class="text-link" href="{{ route('complaints.index', ['search' => $facility->name]) }}">View all <span>↗</span></a></div>
        @forelse ($facility->complaints as $complaint)
            <a class="history-row" href="{{ route('complaints.show', $complaint) }}"><span class="history-date">{{ $complaint->reported_at->format('d') }}<small>{{ $complaint->reported_at->format('M') }}</small></span><span class="history-main"><strong>{{ $complaint->title }}</strong><small>{{ ucfirst($complaint->status) }} · {{ ucfirst($complaint->severity) }}</small></span><span class="badge badge-{{ $complaint->status == 'closed' ? 'low' : ($complaint->status == 'investigating' ? 'moderate' : 'high') }}">{{ ucfirst($complaint->status) }}</span></a>
        @empty
            <div class="empty-inline"><span class="empty-stamp">00</span><span><strong>No complaints yet</strong><small>Log a complaint and it will appear here.</small></span></div>
        @endforelse
    </section>
    @if ($facility->inspections->isEmpty())
        <form class="delete-row" method="post" action="{{ route('facilities.destroy', $facility) }}" data-confirm="Remove this facility from the register?">
            @csrf @method('DELETE')<span>Unused facility record</span><button class="button button-danger" type="submit">Delete facility</button>
        </form>
    @else
        <p class="protected-note">This facility has inspection history and cannot be deleted. Edit its status to deactivate it.</p>
    @endif
@endsection