@extends('layouts.app')
@section('title', 'Inspection #'.$inspection->id)
@section('section', 'Inspections / Details')
@section('content')
    <section class="page-heading page-heading-compact">
        <div><p class="eyebrow">FIELD CHECK <span>REF #{{ str_pad($inspection->id, 4, '0', STR_PAD_LEFT) }}</span></p><h1>{{ $inspection->facility->name }}</h1><p class="heading-copy">{{ $inspection->inspected_at->format('l, d F Y · H:i') }} by {{ $inspection->inspector }}</p></div>
        <div class="heading-actions"><a class="button button-outline" href="{{ route('inspections.edit', $inspection) }}">Edit check</a><a class="button button-dark" href="{{ route('facilities.show', $inspection->facility) }}">View facility <span>↗</span></a></div>
    </section>
    <section class="inspection-result">
        <div class="result-band result-{{ $inspection->risk_level }}"><span>OPERATIONAL RISK BAND</span><strong>{{ ucfirst($inspection->risk_level) }}</strong><small>Rule score {{ $inspection->risk_score }}</small></div>
        <div class="result-factors"><p class="eyebrow">ASSESSMENT FACTORS</p><h2>What shaped this band</h2>
            @if (empty($inspection->risk_factors))<p class="no-factors">No risk factors were triggered by the recorded values.</p>@else<ul>@foreach ($inspection->risk_factors as $factor)<li><span>+</span>{{ $factor }}</li>@endforeach</ul>@endif
            <p class="muted-copy">This transparent checklist supports follow-up prioritization. It is not an ML prediction or formal health certification.</p>
        </div>
    </section>
    <section class="panel observations-panel"><div class="panel-heading"><div><p class="eyebrow">VISIT RECORD</p><h2>Recorded observations</h2></div></div>
        <div class="observation-grid">
            <div><span>CLEANLINESS</span><strong>{{ $inspection->cleanliness_score }}<small> / 5</small></strong></div><div><span>ODOR</span><strong>{{ $inspection->odor_score }}<small> / 5</small></strong></div><div><span>WASTE LEVEL</span><strong>{{ ucfirst($inspection->waste_level) }}</strong></div><div><span>WATER AVAILABLE</span><strong>{{ $inspection->water_available ? 'Yes' : 'No' }}</strong></div><div><span>FOOTFALL</span><strong>{{ number_format($inspection->footfall) }}</strong></div><div><span>COMPLAINTS</span><strong>{{ number_format($inspection->complaints) }}</strong></div><div><span>HOURS SINCE CLEANING</span><strong>{{ $inspection->hours_since_cleaning }}</strong></div>
        </div>
    </section>
    <form class="delete-row" method="post" action="{{ route('inspections.destroy', $inspection) }}" data-confirm="Permanently delete this inspection record?">
        @csrf @method('DELETE')<span>Inspection record #{{ $inspection->id }}</span><button class="button button-danger" type="submit">Delete inspection</button>
    </form>
@endsection