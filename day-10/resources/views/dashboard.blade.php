@extends('layouts.app')

@section('title', 'Overview')
@section('section', 'Overview')

@section('content')
    <section class="page-heading">
        <div>
            <p class="eyebrow">FIELD PICTURE <span>{{ now()->format('D, d M Y') }}</span></p>
            <h1>Keep every space<br><em>ready for people.</em></h1>
            <p class="heading-copy">A clear view of facility conditions, the latest checks, and where teams may need to act.</p>
        </div>
        <div class="heading-actions">
            <a class="button button-dark" href="{{ route('inspections.create') }}"><span class="button-plus">+</span> Record inspection</a>
            <a class="button button-outline" href="{{ route('complaints.create') }}">Log complaint</a>
        </div>
    </section>

    <section class="metric-grid" aria-label="Operations summary">
        <article class="metric metric-primary"><span class="metric-label">ACTIVE FACILITIES</span><strong>{{ number_format($facilityCount) }}</strong><span class="metric-foot">In the current register</span><span class="metric-index">01</span></article>
        <article class="metric"><span class="metric-label">INSPECTIONS LOGGED</span><strong>{{ number_format($inspectionCount) }}</strong><span class="metric-foot">All recorded checks</span><span class="metric-index">02</span></article>
        <article class="metric"><span class="metric-label">HIGH-RISK CHECKS</span><strong>{{ number_format($highRiskCount) }}</strong><span class="metric-foot">Review the latest findings</span><span class="metric-index metric-index-alert">03</span></article>
        <article class="metric"><span class="metric-label">AVG. CLEANLINESS</span><strong>{{ $averageCleanliness === null ? '—' : number_format((float) $averageCleanliness, 1) }}<small>/ 5</small></strong><span class="metric-foot">Across recorded inspections</span><span class="metric-index">04</span></article>
    </section>

    <section class="dashboard-grid">
        <article class="panel risk-panel">
            <div class="panel-heading"><div><p class="eyebrow">ASSESSMENT MIX</p><h2>Risk at a glance</h2></div><span class="panel-stamp">{{ $inspectionCount }} TOTAL</span></div>
            @php($riskTotal = max(1, (int) $riskCounts->sum()))
            <div class="risk-bars">
                @foreach (['high' => 'High', 'moderate' => 'Moderate', 'low' => 'Low'] as $key => $label)
                    @php($count = (int) ($riskCounts[$key] ?? 0))
                    <div class="risk-row">
                        <div class="risk-row-label"><span class="risk-dot risk-{{ $key }}"></span><span>{{ $label }}</span><strong>{{ $count }}</strong></div>
                        <div class="risk-track"><span class="risk-fill risk-fill-{{ $key }}" style="width: {{ $inspectionCount ? ($count / $riskTotal) * 100 : 0 }}%"></span></div>
                    </div>
                @endforeach
            </div>
            <div class="risk-note"><span class="note-mark">i</span><span>Rule-based operational bands. Each record includes the factors that raised its score.</span></div>
        </article>

        <article class="panel attention-panel">
            <div class="panel-heading"><div><p class="eyebrow">FOLLOW-UP QUEUE</p><h2>Needs a closer look</h2></div><a class="text-link" href="{{ route('inspections.index', ['risk' => 'high']) }}">View all <span>↗</span></a></div>
            @forelse ($facilitiesNeedingAttention as $facility)
                <a class="attention-item" href="{{ route('facilities.show', $facility) }}">
                    <span class="attention-symbol">!</span>
                    <span class="attention-copy"><strong>{{ $facility->name }}</strong><small>{{ $facility->city }} <span>/</span> high-risk check</small></span>
                    <span class="attention-arrow">↗</span>
                </a>
            @empty
                <div class="empty-inline"><span class="empty-check">✓</span><span><strong>No high-risk checks</strong><small>New urgent findings will appear here.</small></span></div>
            @endforelse
        </article>
    </section>

    <section class="panel table-panel">
        <div class="panel-heading"><div><p class="eyebrow">LATEST ACTIVITY</p><h2>Recent inspections</h2></div><a class="text-link" href="{{ route('inspections.index') }}">All inspections <span>↗</span></a></div>
        @if ($recentInspections->isEmpty())
            <div class="empty-state"><span class="empty-stamp">01</span><h3>Start with a site check.</h3><p>Record the first inspection to build your operations picture.</p><a class="button button-dark" href="{{ route('inspections.create') }}">Record inspection <span>↗</span></a></div>
        @else
            <div class="table-scroll"><table>
                <thead><tr><th>FACILITY</th><th>INSPECTOR</th><th>CHECKED</th><th>CLEANLINESS</th><th>RISK BAND</th><th></th></tr></thead>
                <tbody>@foreach ($recentInspections as $inspection)
                    <tr>
                        <td><a class="table-primary" href="{{ route('facilities.show', $inspection->facility) }}">{{ $inspection->facility->name }}</a><span class="table-sub">{{ $inspection->facility->facility_type }}</span></td>
                        <td>{{ $inspection->inspector }}</td>
                        <td>{{ $inspection->inspected_at->format('d M, H:i') }}</td>
                        <td><span class="score-value">{{ $inspection->cleanliness_score }}</span><span class="score-max">/ 5</span></td>
                        <td><span class="badge badge-{{ $inspection->risk_level }}">{{ ucfirst($inspection->risk_level) }}</span></td>
                        <td><a class="row-action" href="{{ route('inspections.show', $inspection) }}" aria-label="View inspection">↗</a></td>
                    </tr>
                @endforeach</tbody>
            </table></div>
        @endif
    </section>

    <section class="panel table-panel">
        <div class="panel-heading"><div><p class="eyebrow">CUSTOMER FEEDBACK</p><h2>Recent complaints</h2></div><a class="text-link" href="{{ route('complaints.index') }}">All complaints <span>↗</span></a></div>
        @if ($recentComplaints->isEmpty())
            <div class="empty-state"><span class="empty-stamp">02</span><h3>No complaints logged.</h3><p>When users raise issues, they will appear here with their current status.</p><a class="button button-dark" href="{{ route('complaints.create') }}">Log complaint <span>↗</span></a></div>
        @else
            <div class="table-scroll"><table>
                <thead><tr><th>FACILITY</th><th>TITLE</th><th>SEVERITY</th><th>STATUS</th><th></th></tr></thead>
                <tbody>@foreach ($recentComplaints as $complaint)
                    <tr>
                        <td><a class="table-primary" href="{{ route('facilities.show', $complaint->facility) }}">{{ $complaint->facility->name }}</a><span class="table-sub">{{ ucfirst($complaint->category) }}</span></td>
                        <td>{{ $complaint->title }}</td>
                        <td><span class="badge badge-{{ $complaint->severity == 'critical' ? 'high' : ($complaint->severity == 'high' ? 'moderate' : 'low') }}">{{ ucfirst($complaint->severity) }}</span></td>
                        <td><span class="badge badge-{{ $complaint->status == 'closed' ? 'low' : ($complaint->status == 'investigating' ? 'moderate' : 'high') }}">{{ ucfirst($complaint->status) }}</span></td>
                        <td><a class="row-action" href="{{ route('complaints.show', $complaint) }}" aria-label="View complaint">↗</a></td>
                    </tr>
                @endforeach</tbody>
            </table></div>
        @endif
    </section>
@endsection