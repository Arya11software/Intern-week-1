<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class EmployeeController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $employees = Employee::with('department')
            ->when($request->filled('department'), function ($query) use ($request) {
                $department = trim((string) $request->department);

                if (is_numeric($department)) {
                    $query->where('department_id', (int) $department);
                    return;
                }

                $query->whereHas('department', function ($departmentQuery) use ($department) {
                    $departmentQuery->where('name', 'like', "%{$department}%");
                });
            })
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = trim((string) $request->search);

                $query->where(function ($builder) use ($search) {
                    $builder->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('position', 'like', "%{$search}%")
                        ->orWhere('location', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->get();

        return response()->json([
            'data' => $employees,
        ]);
    }

    public function show(Employee $employee): JsonResponse
    {
        return response()->json([
            'data' => $employee->load('department'),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $this->validateEmployee($request);

        $employee = Employee::create($data);

        return response()->json([
            'data' => $employee->load('department'),
            'message' => 'Employee created successfully.',
        ], 201);
    }

    public function update(Request $request, Employee $employee): JsonResponse
    {
        $data = $this->validateEmployee($request, $employee->id);

        $employee->update($data);

        return response()->json([
            'data' => $employee->fresh()->load('department'),
            'message' => 'Employee updated successfully.',
        ]);
    }

    public function destroy(Employee $employee): JsonResponse
    {
        $employee->delete();

        return response()->json([
            'message' => 'Employee deleted successfully.',
        ]);
    }

    protected function validateEmployee(Request $request, ?int $ignoreId = null): array
    {
        return $request->validate([
            'department_id' => ['required', 'exists:departments,id'],
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('employees', 'email')->ignore($ignoreId)],
            'position' => ['required', 'string', 'max:255'],
            'salary' => ['required', 'numeric', 'min:0'],
            'location' => ['required', 'string', 'max:255'],
        ]);
    }
}
