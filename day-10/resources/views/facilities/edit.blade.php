@extends('layouts.app')
@section('title', 'Edit facility')
@section('section', 'Facilities / Edit')
@section('content')
    <section class="page-heading page-heading-compact"><div><p class="eyebrow">SITE DIRECTORY <span>EDIT RECORD</span></p><h1>Update facility</h1><p class="heading-copy">Keep the site register accurate for the next field visit.</p></div><a class="button button-outline" href="{{ route('facilities.show', $facility) }}">Cancel</a></section>
    @include('facilities.form', ['facility' => $facility, 'action' => route('facilities.update', $facility), 'method' => 'PUT'])
@endsection