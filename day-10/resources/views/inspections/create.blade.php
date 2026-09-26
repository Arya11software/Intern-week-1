@extends('layouts.app')
@section('title', 'Record inspection')
@section('section', 'Inspections / New check')
@section('content')
    <section class="page-heading page-heading-compact"><div><p class="eyebrow">FIELD RECORDS <span>NEW CHECK</span></p><h1>Record an inspection</h1><p class="heading-copy">Log what the team observed. The system calculates a rule-based band on save.</p></div><a class="button button-outline" href="{{ route('inspections.index') }}">Back to log</a></section>
    @if ($facilities->isEmpty())
        <div class="flash flash-error">Add an active facility before recording an inspection. <a class="text-link" href="{{ route('facilities.create') }}">Add facility ↗</a></div>
    @else
        @include('inspections.form', ['inspection' => null, 'action' => route('inspections.store'), 'method' => 'POST'])
    @endif
@endsection