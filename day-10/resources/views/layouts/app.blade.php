<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Overview') · FacilityPulse</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
    <div class="app-shell">
        <aside class="sidebar">
            <a class="brand" href="{{ route('dashboard') }}" aria-label="FacilityPulse overview">
                <span class="brand-mark">F</span>
                <span>facility<span class="brand-light">pulse</span><small>HYGIENE OPERATIONS</small></span>
            </a>
            <div class="nav-caption">WORKSPACE</div>
            <nav class="primary-nav" aria-label="Main navigation">
                <a class="nav-link {{ request()->routeIs('dashboard') ? 'is-active' : '' }}" href="{{ route('dashboard') }}"><span class="nav-glyph">01</span> Overview</a>
                <a class="nav-link {{ request()->routeIs('facilities.*') ? 'is-active' : '' }}" href="{{ route('facilities.index') }}"><span class="nav-glyph">02</span> Facilities</a>
                <a class="nav-link {{ request()->routeIs('inspections.*') ? 'is-active' : '' }}" href="{{ route('inspections.index') }}"><span class="nav-glyph">03</span> Inspections</a>
            </nav>
            <div class="sidebar-bottom">
                <span class="live-dot"></span>
                <span>LOCAL WORKSPACE<small>Records stay on this machine</small></span>
            </div>
        </aside>

        <main class="main-area">
            <header class="topbar">
                <div><span class="topbar-kicker">OPERATIONS DESK</span><span class="topbar-divider">/</span><span>@yield('section', 'Overview')</span></div>
                <a class="topbar-link" href="{{ url('/api/dashboard') }}" target="_blank" rel="noreferrer">API status <span class="api-pip"></span></a>
            </header>
            <div class="content-wrap">
                @if (session('status'))
                    <div class="flash flash-success" role="status">{{ session('status') }}</div>
                @endif
                @if ($errors->any())
                    <div class="flash flash-error" role="alert">
                        <strong>Check the highlighted information.</strong>
                        <ul>@foreach ($errors->all() as $error)<li>{{ $error }}</li>@endforeach</ul>
                    </div>
                @endif
                @yield('content')
                <footer class="page-footer"><span>FACILITYPULSE <span class="footer-dot">/</span> FIELD OPERATIONS</span><span>Assessment bands are operational guidance, not a regulatory certification.</span></footer>
            </div>
        </main>
    </div>
</body>
</html>