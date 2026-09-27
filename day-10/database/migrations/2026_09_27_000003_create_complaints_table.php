<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('complaints', function (Blueprint $table) {
            $table->id();
            $table->foreignId('facility_id')->constrained()->cascadeOnDelete();
            $table->string('title', 150);
            $table->text('description');
            $table->string('category', 40)->default('hygiene');
            $table->string('severity', 20)->default('moderate');
            $table->string('status', 20)->default('open');
            $table->dateTime('reported_at');
            $table->dateTime('resolved_at')->nullable();
            $table->timestamps();

            $table->index(['facility_id', 'reported_at']);
            $table->index(['status', 'severity']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('complaints');
    }
};
