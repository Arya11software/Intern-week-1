@extends('layouts.app')

@section('title', $complaint->title)
@section('section', 'Complaints / Details')

@section('content')
    <section class="page-heading page-heading-compact">
        <div>
            <p class="eyebrow">{{ strtoupper($complaint->facility->name) }} <span>{{ strtoupper($complaint->severity) }}</span></p>
            <h1>{{ $complaint->title }}</h1>
            <p class="heading-copy">Reported {{ $complaint->reported_at->format('d M Y, H:i') }} · <span class="badge badge-{{ $complaint->status == 'closed' ? 'low' : ($complaint->status == 'investigating' ? 'moderate' : 'high') }}">{{ ucfirst($complaint->status) }}</span></p>
        </div>
        <div class="heading-actions">
            <a class="button button-outline" href="{{ route('complaints.edit', $complaint) }}">Edit complaint</a>
            <form method="post" action="{{ route('complaints.destroy', $complaint) }}" data-confirm="Delete this complaint?">
                @csrf
                @method('DELETE')
                <button class="button button-danger" type="submit">Delete</button>
            </form>
        </div>
    </section>

    <section class="detail-grid">
        <article class="panel detail-facts">
            <p class="eyebrow">INCIDENT SUMMARY</p>
            <h2>Complaint details</h2>
            <p>{{ $complaint->description }}</p>
            <div class="detail-fact"><span>CATEGORY</span><strong>{{ ucfirst($complaint->category) }}</strong></div>
            <div class="detail-fact"><span>SEVERITY</span><strong>{{ ucfirst($complaint->severity) }}</strong></div>
            <div class="detail-fact"><span>FACILITY</span><strong><a class="text-link" href="{{ route('facilities.show', $complaint->facility) }}">{{ $complaint->facility->name }}</a></strong></div>
        </article>

        <article class="panel table-panel detail-history">
            <div class="panel-heading"><div><p class="eyebrow">TRACKING</p><h2>Status timeline</h2></div></div>
            <div class="history-row">
                <span class="history-date">{{ $complaint->reported_at->format('d') }}<small>{{ $complaint->reported_at->format('M') }}</small></span>
                <span class="history-main"><strong>Reported</strong><small>{{ $complaint->reported_at->format('d M Y, H:i') }}</small></span>
                <span class="badge badge-high">Open</span>
            </div>
            @if ($complaint->resolved_at)
                <div class="history-row">
                    <span class="history-date">{{ $complaint->resolved_at->format('d') }}<small>{{ $complaint->resolved_at->format('M') }}</small></span>
                    <span class="history-main"><strong>Resolved</strong><small>{{ $complaint->resolved_at->format('d M Y, H:i') }}</small></span>
                    <span class="badge badge-low">Closed</span>
                </div>
            @endif
        </article>
    </section>
@endsection
