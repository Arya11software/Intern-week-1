@extends('layouts.app')

@section('title', 'Edit complaint')
@section('section', 'Complaints / Update')

@section('content')
    <section class="page-heading page-heading-compact">
        <div>
            <p class="eyebrow">UPDATE <span>COMPLAINT</span></p>
            <h1>Edit complaint</h1>
            <p class="heading-copy">Adjust status, severity, or detail if the issue changes during follow-up.</p>
        </div>
        <a class="button button-outline" href="{{ route('complaints.show', $complaint) }}">Back to complaint</a>
    </section>

    @include('complaints.form', ['complaint' => $complaint, 'action' => route('complaints.update', $complaint), 'method' => 'PUT'])
@endsection
