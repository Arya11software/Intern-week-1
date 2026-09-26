<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\Employee;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    public function run(): void
    {
        $departments = Department::all();

        if ($departments->isEmpty()) {
            $this->call(DepartmentSeeder::class);
            $departments = Department::all();
        }

        $employees = [
            ['name' => 'Alice Johnson', 'email' => 'alice.johnson@example.com', 'department' => 'Engineering', 'position' => 'Senior Developer', 'salary' => 95000, 'location' => 'Nairobi'],
            ['name' => 'Benjamin Okafor', 'email' => 'benjamin.okafor@example.com', 'department' => 'Human Resources', 'position' => 'HR Manager', 'salary' => 82000, 'location' => 'Lagos'],
            ['name' => 'Cynthia Moyo', 'email' => 'cynthia.moyo@example.com', 'department' => 'Finance', 'position' => 'Accountant', 'salary' => 76000, 'location' => 'Harare'],
            ['name' => 'David Kimani', 'email' => 'david.kimani@example.com', 'department' => 'Marketing', 'position' => 'Marketing Lead', 'salary' => 87000, 'location' => 'Kampala'],
            ['name' => 'Emma Njeri', 'email' => 'emma.njeri@example.com', 'department' => 'Operations', 'position' => 'Operations Analyst', 'salary' => 71000, 'location' => 'Nakuru'],
            ['name' => 'Frank Tanui', 'email' => 'frank.tanui@example.com', 'department' => 'Support', 'position' => 'Support Specialist', 'salary' => 65000, 'location' => 'Mombasa'],
            ['name' => 'Grace Akinyi', 'email' => 'grace.aki@example.com', 'department' => 'Engineering', 'position' => 'QA Engineer', 'salary' => 78000, 'location' => 'Kisumu'],
            ['name' => 'Henry Kibet', 'email' => 'henry.kibet@example.com', 'department' => 'Finance', 'position' => 'Financial Analyst', 'salary' => 73000, 'location' => 'Eldoret'],
            ['name' => 'Ivy Mutua', 'email' => 'ivy.mutua@example.com', 'department' => 'Marketing', 'position' => 'Content Strategist', 'salary' => 69000, 'location' => 'Nairobi'],
            ['name' => 'John Karanja', 'email' => 'john.karanja@example.com', 'department' => 'Support', 'position' => 'Customer Success Lead', 'salary' => 81000, 'location' => 'Kigali'],
        ];

        foreach ($employees as $employee) {
            $department = $departments->firstWhere('name', $employee['department']);

            Employee::firstOrCreate(
                ['email' => $employee['email']],
                [
                    'department_id' => $department?->id ?? $departments->first()->id,
                    'name' => $employee['name'],
                    'position' => $employee['position'],
                    'salary' => $employee['salary'],
                    'location' => $employee['location'],
                ]
            );
        }
    }
}
