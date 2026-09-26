@extends('layouts.app')
@section('title', 'Add facility')
@section('section', 'Facilities / Add')
@section('content')
    <section class="page-heading page-heading-compact"><div><p class="eyebrow">SITE DIRECTORY <span>NEW RECORD</span></p><h1>Add a facility</h1><p class="heading-copy">Set up a place before logging its inspections.</p></div><a class="button button-outline" href="{{ route('facilities.index') }}">Back to register</a></section>
    @include('facilities.form', ['facility' => null, 'action' => route('facilities.store'), 'method' => 'POST'])
@endsection