<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    public function run(): void
    {
        $departments = [
            ['name' => 'Engineering', 'description' => 'Software and product engineering team'],
            ['name' => 'Human Resources', 'description' => 'Hiring and employee support'],
            ['name' => 'Finance', 'description' => 'Budget and accounting operations'],
            ['name' => 'Marketing', 'description' => 'Brand and digital campaigns'],
            ['name' => 'Operations', 'description' => 'Business operations and logistics'],
            ['name' => 'Support', 'description' => 'Customer support and issue resolution'],
        ];

        foreach ($departments as $department) {
            Department::firstOrCreate(
                ['name' => $department['name']],
                ['description' => $department['description']]
            );
        }
    }
}
