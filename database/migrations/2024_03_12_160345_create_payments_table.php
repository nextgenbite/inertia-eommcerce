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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
             $table->uuid('tenant_id');
            $table->foreignId('order_id')->constrained()->index()->name('payments_order_id_foreign');
            $table->unsignedBigInteger('customer_id')->nullable()->name('customer_id');
            $table->decimal('amount', 10, 2);
            $table->string('payment_method', 30)->default('CASH');
            $table->json('bank_info')->nullable();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
