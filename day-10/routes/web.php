<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FacilityController;
use App\Http\Controllers\InspectionController;
use App\Http\Controllers\ComplaintController;

Route::get('/', DashboardController::class)->name('dashboard');
Route::resource('facilities', FacilityController::class);
Route::resource('inspections', InspectionController::class);
Route::resource('complaints', ComplaintController::class);
