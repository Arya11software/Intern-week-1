<?php

namespace Database\Factories;

use App\Models\Department;
use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    protected $model = Employee::class;

    public function definition(): array
    {
        return [
            'department_id' => Department::factory(),
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'position' => $this->faker->randomElement([
                'Developer',
                'Accountant',
                'Manager',
                'Recruiter',
                'Analyst',
                'Supervisor',
            ]),
            'salary' => $this->faker->numberBetween(45000, 180000),
            'location' => $this->faker->randomElement([
                'Nairobi',
                'Kampala',
                'Dar es Salaam',
                'Kigali',
                'Lusaka',
                'Addis Ababa',
            ]),
        ];
    }
}
