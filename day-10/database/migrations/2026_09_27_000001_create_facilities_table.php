<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('facilities', function (Blueprint $table) {
            $table->id();
            $table->string('name', 120);
            $table->string('facility_type', 60);
            $table->string('address', 180);
            $table->string('city', 100);
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->index(['city', 'facility_type']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('facilities');
    }
};