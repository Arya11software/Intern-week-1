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
            ['name' => 'Brian Smith', 'email' => 'brian.smith@example.com', 'department' => 'Finance', 'position' => 'Accountant', 'salary' => 78000, 'location' => 'Kampala'],
            ['name' => 'Clara Mwangi', 'email' => 'clara.mwangi@example.com', 'department' => 'Human Resources', 'position' => 'HR Manager', 'salary' => 71000, 'location' => 'Kisumu'],
            ['name' => 'Daniel Otieno', 'email' => 'daniel.otieno@example.com', 'department' => 'Operations', 'position' => 'Operations Lead', 'salary' => 88000, 'location' => 'Mombasa'],
            ['name' => 'Eva Njeri', 'email' => 'eva.njeri@example.com', 'department' => 'Marketing', 'position' => 'Marketing Specialist', 'salary' => 67000, 'location' => 'Nakuru'],
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
