@extends('layouts.app')
@section('title', 'Inspections')
@section('section', 'Inspections')
@section('content')
    <section class="page-heading page-heading-compact">
        <div><p class="eyebrow">FIELD RECORDS <span>{{ str_pad($inspections->total(), 2, '0', STR_PAD_LEFT) }} CHECKS</span></p><h1>Inspection log</h1><p class="heading-copy">Review site observations and their transparent risk assessments.</p></div>
        <a class="button button-dark" href="{{ route('inspections.create') }}"><span class="button-plus">+</span> Record inspection</a>
    </section>
    <section class="panel table-panel">
        <form class="filter-bar filter-bar-wrap" method="get" action="{{ route('inspections.index') }}">
            <label class="search-field"><span>SEARCH</span><input type="search" name="search" value="{{ request('search') }}" placeholder="Facility or inspector" aria-label="Search inspections"></label>
            <label class="select-field"><span>RISK BAND</span><select name="risk"><option value="">All bands</option>@foreach (['high', 'moderate', 'low'] as $risk)<option value="{{ $risk }}" @selected(request('risk') === $risk)>{{ ucfirst($risk) }}</option>@endforeach</select></label>
            <label class="select-field"><span>FACILITY</span><select name="facility"><option value="">All facilities</option>@foreach ($facilities as $facility)<option value="{{ $facility->id }}" @selected((string) request('facility') === (string) $facility->id)>{{ $facility->name }}</option>@endforeach</select></label>
            <button class="button button-outline" type="submit">Filter log</button>
        </form>
        @if ($inspections->isEmpty())
            <div class="empty-state"><span class="empty-stamp">00</span><h3>No checks match these filters.</h3><p>Clear a filter or record a new facility inspection.</p><a class="button button-dark" href="{{ route('inspections.create') }}">Record inspection <span>↗</span></a></div>
        @else
            <div class="table-scroll"><table><thead><tr><th>FACILITY</th><th>INSPECTOR</th><th>CHECKED</th><th>CLEANLINESS</th><th>COMPLAINTS</th><th>RISK BAND</th><th></th></tr></thead><tbody>
                @foreach ($inspections as $inspection)<tr>
                    <td><a class="table-primary" href="{{ route('facilities.show', $inspection->facility) }}">{{ $inspection->facility->name }}</a><span class="table-sub">{{ $inspection->facility->city }}</span></td>
                    <td>{{ $inspection->inspector }}</td><td>{{ $inspection->inspected_at->format('d M Y, H:i') }}</td>
                    <td><span class="score-value">{{ $inspection->cleanliness_score }}</span><span class="score-max">/ 5</span></td><td>{{ $inspection->complaints }}</td>
                    <td><span class="badge badge-{{ $inspection->risk_level }}">{{ ucfirst($inspection->risk_level) }}</span></td>
                    <td><a class="row-action" href="{{ route('inspections.show', $inspection) }}" aria-label="View inspection">↗</a></td>
                </tr>@endforeach
            </tbody></table></div>
            <div class="pagination-wrap">{{ $inspections->links() }}</div>
        @endif
    </section>
@endsection