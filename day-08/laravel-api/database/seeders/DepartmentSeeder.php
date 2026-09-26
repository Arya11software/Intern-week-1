<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    public function run(): void
    {
        $departments = [
            'Engineering',
            'Finance',
            'Human Resources',
            'Operations',
            'Marketing',
            'Sales',
        ];

        foreach ($departments as $department) {
            Department::firstOrCreate(['name' => $department]);
        }
    }
}
