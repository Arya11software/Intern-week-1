<?php

namespace Tests\Feature;

use App\Models\Department;
use App\Models\Employee;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EmployeeApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_employee_list_endpoint_returns_employees(): void
    {
        $department = Department::factory()->create(['name' => 'Engineering']);
        Employee::factory()->create([
            'department_id' => $department->id,
            'name' => 'Alice Johnson',
            'email' => 'alice@example.com',
            'position' => 'Senior Developer',
            'salary' => 95000,
            'location' => 'Nairobi',
        ]);

        $response = $this->getJson('/api/employees');

        $response->assertOk();
        $response->assertJsonPath('data.0.name', 'Alice Johnson');
    }

    public function test_employee_can_be_created_via_api(): void
    {
        $department = Department::factory()->create(['name' => 'Finance']);

        $payload = [
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'department_id' => $department->id,
            'position' => 'Accountant',
            'salary' => 75000,
            'location' => 'Kampala',
        ];

        $response = $this->withHeader('X-API-Key', 'day8-demo-key')
            ->postJson('/api/employees', $payload);

        $response->assertStatus(201);
        $this->assertDatabaseHas('employees', ['email' => 'jane@example.com']);
    }

    public function test_employee_search_filters_by_name(): void
    {
        $department = Department::factory()->create(['name' => 'HR']);
        Employee::factory()->create([
            'department_id' => $department->id,
            'name' => 'Sam Smith',
            'email' => 'sam@example.com',
            'position' => 'Recruiter',
            'salary' => 65000,
            'location' => 'Kisumu',
        ]);

        $response = $this->getJson('/api/employees?search=Sam');

        $response->assertOk();
        $response->assertJsonFragment(['name' => 'Sam Smith']);
    }
}
