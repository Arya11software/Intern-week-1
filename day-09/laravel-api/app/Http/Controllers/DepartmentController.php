<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => 'Departments retrieved successfully',
            'data' => Department::all(),
        ]);
    }

    public function show(Department $department): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => 'Department retrieved successfully',
            'data' => $department,
        ]);
    }
}
