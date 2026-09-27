@extends('layouts.app')

@section('title', 'Log complaint')
@section('section', 'Complaints / New report')

@section('content')
    <section class="page-heading page-heading-compact">
        <div>
            <p class="eyebrow">REPORT <span>NEW ENTRY</span></p>
            <h1>Log a complaint</h1>
            <p class="heading-copy">Capture what happened, where it happened, and how urgent it is.</p>
        </div>
        <a class="button button-outline" href="{{ route('complaints.index') }}">Back to log</a>
    </section>

    @if ($facilities->isEmpty())
        <div class="flash flash-error">Add a facility before logging a complaint. <a class="text-link" href="{{ route('facilities.create') }}">Add facility ↗</a></div>
    @else
        @include('complaints.form', ['complaint' => null, 'action' => route('complaints.store'), 'method' => 'POST'])
    @endif
@endsection
