<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Employee;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class EmployeeController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Employee::with('department');

        if ($request->filled('search')) {
            $search = trim((string) $request->search);
            $query->where(function ($builder) use ($search) {
                $builder->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('position', 'like', "%{$search}%");
            });
        }

        if ($request->filled('department')) {
            $department = trim((string) $request->department);
            $query->whereHas('department', function ($builder) use ($department) {
                $builder->where('name', 'like', "%{$department}%");
            });
        }

        $sortField = $request->get('sort', 'id');
        $direction = $request->get('direction', 'asc');

        $allowedSortFields = ['id', 'name', 'email', 'salary', 'location', 'position'];
        if (! in_array($sortField, $allowedSortFields, true)) {
            $sortField = 'id';
        }

        $query->orderBy($sortField, $direction === 'desc' ? 'desc' : 'asc');

        $perPage = (int) $request->get('per_page', 10);
        $perPage = $perPage > 0 ? min($perPage, 100) : 10;

        $employees = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'message' => 'Employees retrieved successfully',
            'data' => $employees->items(),
            'pagination' => [
                'current_page' => $employees->currentPage(),
                'per_page' => $employees->perPage(),
                'total' => $employees->total(),
                'last_page' => $employees->lastPage(),
            ],
        ]);
    }

    public function show(Employee $employee): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => 'Employee retrieved successfully',
            'data' => $employee->load('department'),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('employees', 'email')],
            'department_id' => ['required', 'exists:departments,id'],
            'position' => ['required', 'string', 'max:255'],
            'salary' => ['required', 'numeric', 'min:0'],
            'location' => ['required', 'string', 'max:255'],
        ], [
            'department_id.exists' => 'The selected department does not exist.',
        ]);

        $employee = Employee::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Employee created successfully',
            'data' => $employee->load('department'),
        ], 201);
    }

    public function update(Request $request, Employee $employee): JsonResponse
    {
        $data = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'email' => ['sometimes', 'required', 'email', 'max:255', Rule::unique('employees', 'email')->ignore($employee->id)],
            'department_id' => ['sometimes', 'required', 'exists:departments,id'],
            'position' => ['sometimes', 'required', 'string', 'max:255'],
            'salary' => ['sometimes', 'required', 'numeric', 'min:0'],
            'location' => ['sometimes', 'required', 'string', 'max:255'],
        ], [
            'department_id.exists' => 'The selected department does not exist.',
        ]);

        $employee->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Employee updated successfully',
            'data' => $employee->fresh()->load('department'),
        ]);
    }

    public function destroy(Employee $employee): JsonResponse
    {
        $employee->delete();

        return response()->json([
            'success' => true,
            'message' => 'Employee deleted successfully',
        ]);
    }
}
