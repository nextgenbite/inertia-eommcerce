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
        Schema::create('promotions', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Flash Sale, Top Deals etc.
            $table->enum('type', ['flash_sale', 'top_deal', 'new_arrival']);
            $table->text('description')->nullable();
            $table->text('thumbnail')->nullable();
            $table->timestamp('start_time')->nullable(); // For flash sale
            $table->timestamp('end_time')->nullable();   // For flash sale
            $table->boolean('status')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promotions');
    }
};
