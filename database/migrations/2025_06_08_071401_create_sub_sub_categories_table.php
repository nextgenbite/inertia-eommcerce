<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sub_sub_categories', function (Blueprint $table) {
            $table->id();
             $table->uuid('tenant_id');
            $table->foreignId('sub_category_id')->constrained()->index()->name('sub_sub_categories_sub_category_id_foreign'); // Specify foreign key name
            $table->string('title')->unique();
            $table->string('slug')->unique();
            $table->string('thumbnail')->nullable();
            $table->boolean('status')->default(true); // Using boolean type

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sub_sub_categories');
    }
};
