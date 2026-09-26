<form class="form-panel" method="post" action="{{ $action }}">
    @csrf
    @if ($method !== 'POST') @method($method) @endif
    <div class="form-section-heading"><span class="form-step">01</span><div><h2>Site details</h2><p>Basic location and operating information.</p></div></div>
    <div class="form-grid">
        <label class="form-field form-field-wide"><span>FACILITY NAME <b>*</b></span><input name="name" value="{{ old('name', $facility?->name) }}" required maxlength="120" autocomplete="organization" placeholder="e.g. Riverside Community Clinic">@error('name')<small class="field-error">{{ $message }}</small>@enderror</label>
        <label class="form-field"><span>FACILITY TYPE <b>*</b></span><input name="facility_type" value="{{ old('facility_type', $facility?->facility_type) }}" required maxlength="60" placeholder="Healthcare, Market, Transport...">@error('facility_type')<small class="field-error">{{ $message }}</small>@enderror</label>
        <label class="form-field"><span>CITY <b>*</b></span><input name="city" value="{{ old('city', $facility?->city) }}" required maxlength="100" autocomplete="address-level2" placeholder="City">@error('city')<small class="field-error">{{ $message }}</small>@enderror</label>
        <label class="form-field form-field-wide"><span>STREET ADDRESS <b>*</b></span><input name="address" value="{{ old('address', $facility?->address) }}" required maxlength="180" autocomplete="street-address" placeholder="Building, street, area">@error('address')<small class="field-error">{{ $message }}</small>@enderror</label>
        <label class="form-field form-field-wide"><span>NOTES</span><textarea name="description" rows="3" maxlength="2000" placeholder="Useful context for the inspection team">{{ old('description', $facility?->description) }}</textarea>@error('description')<small class="field-error">{{ $message }}</small>@enderror</label>
        <label class="check-field"><input type="hidden" name="is_active" value="0"><input type="checkbox" name="is_active" value="1" @checked(old('is_active', $facility?->is_active ?? true))><span><strong>Facility is active</strong><small>Inactive facilities remain visible but cannot receive new inspections.</small></span></label>
    </div>
    <div class="form-actions"><a class="text-link" href="{{ route('facilities.index') }}">Discard</a><button class="button button-dark" type="submit">Save facility <span>↗</span></button></div>
</form>