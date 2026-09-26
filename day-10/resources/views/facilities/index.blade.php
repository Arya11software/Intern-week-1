@extends('layouts.app')
@section('title', 'Facilities')
@section('section', 'Facilities')
@section('content')
    <section class="page-heading page-heading-compact">
        <div><p class="eyebrow">SITE DIRECTORY <span>{{ str_pad($facilities->total(), 2, '0', STR_PAD_LEFT) }} RECORDS</span></p><h1>Facility register</h1><p class="heading-copy">The places your teams keep safe, clean, and ready.</p></div>
        <a class="button button-dark" href="{{ route('facilities.create') }}"><span class="button-plus">+</span> Add facility</a>
    </section>
    <section class="panel table-panel">
        <form class="filter-bar" method="get" action="{{ route('facilities.index') }}">
            <label class="search-field"><span>SEARCH</span><input type="search" name="search" value="{{ request('search') }}" placeholder="Name or city" aria-label="Search facilities"></label>
            <label class="select-field"><span>STATUS</span><select name="status"><option value="">All facilities</option><option value="active" @selected(request('status') === 'active')>Active</option><option value="inactive" @selected(request('status') === 'inactive')>Inactive</option></select></label>
            <button class="button button-outline" type="submit">Apply filters</button>
        </form>
        @if ($facilities->isEmpty())
            <div class="empty-state"><span class="empty-stamp">00</span><h3>No facilities found.</h3><p>Try a different search, or add a facility to start your register.</p><a class="button button-dark" href="{{ route('facilities.create') }}">Add facility <span>↗</span></a></div>
        @else
            <div class="table-scroll"><table><thead><tr><th>FACILITY</th><th>TYPE</th><th>LOCATION</th><th>CHECKS</th><th>STATUS</th><th></th></tr></thead>
                <tbody>@foreach ($facilities as $facility)<tr>
                    <td><a class="table-primary" href="{{ route('facilities.show', $facility) }}">{{ $facility->name }}</a><span class="table-sub">{{ $facility->address }}</span></td>
                    <td>{{ $facility->facility_type }}</td><td>{{ $facility->city }}</td><td>{{ $facility->inspections_count }}</td>
                    <td><span class="badge {{ $facility->is_active ? 'badge-low' : 'badge-muted' }}">{{ $facility->is_active ? 'Active' : 'Inactive' }}</span></td>
                    <td><a class="row-action" href="{{ route('facilities.show', $facility) }}" aria-label="View facility">↗</a></td>
                </tr>@endforeach</tbody>
            </table></div>
            <div class="pagination-wrap">{{ $facilities->links() }}</div>
        @endif
    </section>
@endsection