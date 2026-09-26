<?php

namespace Tests\Feature;

use App\Models\Facility;
use App\Models\Inspection;
use App\Services\RiskAssessmentService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FacilityPulseTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_and_register_pages_render_demo_data(): void
    {
        $this->seed();

        $this->get('/')->assertOk()->assertSee('Keep every space');
        $this->get('/facilities')->assertOk()->assertSee('Riverside Community Clinic');
        $this->get('/inspections?risk=high')->assertOk()->assertSee('Central Transit Exchange');
    }

    public function test_facility_api_supports_crud_and_protects_inspection_history(): void
    {
        $response = $this->postJson('/api/facilities', $this->facilityData());
        $response->assertCreated()->assertJsonPath('data.name', 'Eastside Library');
        $facilityId = $response->json('data.id');

        $this->getJson('/api/facilities/'.$facilityId)->assertOk()->assertJsonPath('data.city', 'Pune');
        $this->putJson('/api/facilities/'.$facilityId, ['name' => 'Eastside Reading Room'])
            ->assertOk()->assertJsonPath('data.name', 'Eastside Reading Room');
        $this->assertDatabaseHas('facilities', ['id' => $facilityId, 'is_active' => true]);
        $this->putJson('/api/facilities/'.$facilityId, $this->facilityData(['name' => 'Eastside Learning Centre']))
            ->assertOk()->assertJsonPath('data.name', 'Eastside Learning Centre');
        $this->deleteJson('/api/facilities/'.$facilityId)->assertOk();
        $this->assertDatabaseMissing('facilities', ['id' => $facilityId]);

        $facility = $this->createFacility();
        $this->createInspection($facility);
        $this->deleteJson('/api/facilities/'.$facility->id)->assertConflict();
        $this->assertDatabaseHas('facilities', ['id' => $facility->id]);
    }

    public function test_inspection_api_records_filters_updates_and_deletes(): void
    {
        $facility = $this->createFacility();
        $response = $this->postJson('/api/inspections', $this->inspectionData($facility, [
            'cleanliness_score' => 1,
            'odor_score' => 1,
            'waste_level' => 'high',
            'water_available' => false,
            'complaints' => 5,
            'hours_since_cleaning' => 14,
        ]));

        $response->assertCreated()->assertJsonPath('data.risk_level', 'high')
            ->assertJsonPath('data.risk_score', 10)
            ->assertJsonPath('data.facility.name', 'Eastside Library');
        $inspectionId = $response->json('data.id');

        $this->getJson('/api/inspections?risk=high&facility_id='.$facility->id)
            ->assertOk()->assertJsonPath('data.0.id', $inspectionId);
        $this->putJson('/api/inspections/'.$inspectionId, $this->inspectionData($facility, [
            'cleanliness_score' => 4,
            'odor_score' => 4,
            'waste_level' => 'low',
            'water_available' => true,
            'complaints' => 0,
            'hours_since_cleaning' => 1,
        ]))->assertOk()->assertJsonPath('data.risk_level', 'low');

        $this->getJson('/api/inspections/'.$inspectionId)->assertOk()->assertJsonPath('data.risk_score', 0);
        $this->deleteJson('/api/inspections/'.$inspectionId)->assertOk();
        $this->assertDatabaseMissing('inspections', ['id' => $inspectionId]);
    }

    public function test_inspection_api_returns_validation_errors_for_invalid_input(): void
    {
        $facility = $this->createFacility();

        $this->postJson('/api/inspections', $this->inspectionData($facility, [
            'cleanliness_score' => 7,
            'odor_score' => 0,
            'waste_level' => 'extreme',
            'footfall' => -1,
        ]))->assertUnprocessable()->assertJsonValidationErrors([
            'cleanliness_score', 'odor_score', 'waste_level', 'footfall',
        ]);

        $facility->update(['is_active' => false]);
        $this->postJson('/api/inspections', $this->inspectionData($facility))
            ->assertUnprocessable()->assertJsonValidationErrors(['facility_id']);

        $this->assertDatabaseCount('inspections', 0);
    }

    public function test_web_form_creates_facility_and_inspection_records(): void
    {
        $this->post('/facilities', $this->facilityData())->assertRedirect(route('facilities.index'));
        $facility = Facility::firstOrFail();

        $this->post('/inspections', $this->inspectionData($facility))
            ->assertRedirect(route('inspections.index'));

        $this->assertDatabaseCount('inspections', 1);
        $this->get('/inspections/1')->assertOk()->assertSee('OPERATIONAL RISK BAND');
    }

    public function test_risk_assessment_explains_each_triggered_factor(): void
    {
        $assessment = app(RiskAssessmentService::class)->assess([
            'cleanliness_score' => 2,
            'odor_score' => 5,
            'waste_level' => 'high',
            'water_available' => true,
            'complaints' => 0,
            'hours_since_cleaning' => 0,
        ]);

        $this->assertSame('moderate', $assessment['risk_level']);
        $this->assertSame(4, $assessment['risk_score']);
        $this->assertSame(['Low cleanliness score', 'High waste level'], $assessment['risk_factors']);
    }

    private function createFacility(): Facility
    {
        return Facility::create($this->facilityData());
    }

    private function createInspection(Facility $facility): Inspection
    {
        $data = $this->inspectionData($facility);

        return Inspection::create([...$data, ...app(RiskAssessmentService::class)->assess($data)]);
    }

    private function facilityData(array $overrides = []): array
    {
        return array_merge([
            'name' => 'Eastside Library',
            'facility_type' => 'Community',
            'address' => '12 Reading Street',
            'city' => 'Pune',
            'description' => 'Public reading rooms and washrooms.',
            'is_active' => true,
        ], $overrides);
    }

    private function inspectionData(Facility $facility, array $overrides = []): array
    {
        return array_merge([
            'facility_id' => $facility->id,
            'inspector' => 'Samira Rao',
            'inspected_at' => now()->subHour()->toDateTimeString(),
            'cleanliness_score' => 4,
            'odor_score' => 4,
            'waste_level' => 'low',
            'water_available' => true,
            'footfall' => 72,
            'complaints' => 0,
            'hours_since_cleaning' => 2,
        ], $overrides);
    }
}