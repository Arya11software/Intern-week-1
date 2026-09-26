<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('inspections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('facility_id')->constrained()->restrictOnDelete();
            $table->string('inspector', 120);
            $table->dateTime('inspected_at')->index();
            $table->unsignedTinyInteger('cleanliness_score');
            $table->unsignedTinyInteger('odor_score');
            $table->string('waste_level', 16);
            $table->boolean('water_available');
            $table->unsignedInteger('footfall')->default(0);
            $table->unsignedInteger('complaints')->default(0);
            $table->unsignedSmallInteger('hours_since_cleaning')->default(0);
            $table->unsignedTinyInteger('risk_score');
            $table->string('risk_level', 16)->index();
            $table->json('risk_factors');
            $table->timestamps();
            $table->index(['facility_id', 'inspected_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inspections');
    }
};