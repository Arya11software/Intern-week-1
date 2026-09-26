@extends('layouts.app')
@section('title', 'Edit inspection')
@section('section', 'Inspections / Edit check')
@section('content')
    <section class="page-heading page-heading-compact"><div><p class="eyebrow">FIELD RECORDS <span>EDIT CHECK #{{ $inspection->id }}</span></p><h1>Update inspection</h1><p class="heading-copy">The operational risk band is recalculated from the saved observations.</p></div><a class="button button-outline" href="{{ route('inspections.show', $inspection) }}">Cancel</a></section>
    @include('inspections.form', ['inspection' => $inspection, 'action' => route('inspections.update', $inspection), 'method' => 'PUT'])
@endsection