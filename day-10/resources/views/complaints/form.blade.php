<form class="form-panel" method="post" action="{{ $action }}">
    @csrf
    @if ($method !== 'POST') @method($method) @endif

    <div class="form-section-heading">
        <span class="form-step">01</span>
        <div>
            <h2>Complaint details</h2>
            <p>Describe the issue, where it happened, and the urgency.</p>
        </div>
    </div>

    <div class="form-grid">
        <label class="form-field"><span>FACILITY <b>*</b></span>
            <select name="facility_id" required>
                <option value="">Choose a facility</option>
                @foreach ($facilities as $facility)
                    <option value="{{ $facility->id }}" @selected((string) old('facility_id', $complaint?->facility_id) === (string) $facility->id)>{{ $facility->name }}</option>
                @endforeach
            </select>
            @error('facility_id')<small class="field-error">{{ $message }}</small>@enderror
        </label>

        <label class="form-field"><span>REPORTED AT <b>*</b></span>
            <input type="datetime-local" name="reported_at" value="{{ old('reported_at', $complaint?->reported_at?->format('Y-m-d\TH:i') ?? now()->format('Y-m-d\TH:i')) }}" required>
            @error('reported_at')<small class="field-error">{{ $message }}</small>@enderror
        </label>

        <label class="form-field"><span>CATEGORY <b>*</b></span>
            <select name="category" required>
                <option value="">Choose a category</option>
                @foreach (['hygiene', 'safety', 'cleanliness', 'water', 'staff', 'other'] as $category)
                    <option value="{{ $category }}" @selected(old('category', $complaint?->category) === $category)>{{ ucfirst($category) }}</option>
                @endforeach
            </select>
            @error('category')<small class="field-error">{{ $message }}</small>@enderror
        </label>

        <label class="form-field"><span>SEVERITY <b>*</b></span>
            <select name="severity" required>
                <option value="">Choose severity</option>
                @foreach (['low', 'moderate', 'high', 'critical'] as $severity)
                    <option value="{{ $severity }}" @selected(old('severity', $complaint?->severity) === $severity)>{{ ucfirst($severity) }}</option>
                @endforeach
            </select>
            @error('severity')<small class="field-error">{{ $message }}</small>@enderror
        </label>

        <label class="form-field"><span>STATUS <b>*</b></span>
            <select name="status" required>
                @foreach (['open', 'investigating', 'closed'] as $status)
                    <option value="{{ $status }}" @selected(old('status', $complaint?->status ?? 'open') === $status)>{{ ucfirst($status) }}</option>
                @endforeach
            </select>
            @error('status')<small class="field-error">{{ $message }}</small>@enderror
        </label>
    </div>

    <div class="form-section-heading form-section-spaced">
        <span class="form-step">02</span>
        <div>
            <h2>What happened?</h2>
            <p>Give the team enough detail to act quickly.</p>
        </div>
    </div>

    <div class="form-grid form-grid-single">
        <label class="form-field"><span>TITLE <b>*</b></span>
            <input type="text" name="title" value="{{ old('title', $complaint?->title) }}" required maxlength="150" placeholder="Example: Broken handwash station">
            @error('title')<small class="field-error">{{ $message }}</small>@enderror
        </label>

        <label class="form-field"><span>DESCRIPTION <b>*</b></span>
            <textarea name="description" rows="5" required placeholder="Add the complaint detail, observed conditions, and who reported it.">{{ old('description', $complaint?->description) }}</textarea>
            @error('description')<small class="field-error">{{ $message }}</small>@enderror
        </label>
    </div>

    <div class="form-actions">
        <a class="text-link" href="{{ route('complaints.index') }}">Discard</a>
        <button class="button button-dark" type="submit">Save complaint <span>↗</span></button>
    </div>
</form>
