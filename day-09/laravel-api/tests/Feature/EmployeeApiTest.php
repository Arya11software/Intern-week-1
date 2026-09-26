<?php

namespace Tests\Feature;

use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EmployeeApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(DatabaseSeeder::class);
    }

    public function test_employees_index_returns_paginated_results(): void
    {
        $response = $this->withHeader('X-API-Key', config('app.day9_api_key'))
            ->getJson('/api/employees?per_page=5');

        $response->assertOk();
        $response->assertJsonPath('success', true);
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'name',
                    'email',
                    'department',
                ],
            ],
            'pagination' => [
                'current_page',
                'per_page',
                'total',
                'last_page',
            ],
        ]);
    }

    public function test_mutating_requests_require_api_key(): void
    {
        $response = $this->postJson('/api/employees', [
            'name' => 'Rahul Sharma',
            'email' => 'rahul.sharma@example.com',
            'department_id' => 1,
            'position' => 'Software Engineer',
            'salary' => 55000,
            'location' => 'Nagpur',
        ]);

        $response->assertUnauthorized();
        $response->assertJsonPath('success', false);
    }
}
