<?php

use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\FacilityController;
use App\Http\Controllers\Api\InspectionController;
use Illuminate\Support\Facades\Route;

Route::get('/dashboard', DashboardController::class);

Route::get('/facilities', [FacilityController::class, 'index']);
Route::post('/facilities', [FacilityController::class, 'store']);
Route::get('/facilities/{facility}', [FacilityController::class, 'show']);
Route::put('/facilities/{facility}', [FacilityController::class, 'update']);
Route::delete('/facilities/{facility}', [FacilityController::class, 'destroy']);

Route::get('/inspections', [InspectionController::class, 'index']);
Route::post('/inspections', [InspectionController::class, 'store']);
Route::get('/inspections/{inspection}', [InspectionController::class, 'show']);
Route::put('/inspections/{inspection}', [InspectionController::class, 'update']);
Route::delete('/inspections/{inspection}', [InspectionController::class, 'destroy']);