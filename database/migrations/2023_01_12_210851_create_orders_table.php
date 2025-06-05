<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('customer_id')->nullable();
            $table->unsignedBigInteger('warehouse_id')->nullable();
            $table->string('order_type')->nullable();
            $table->date('order_date')->nullable();
            $table->tinyInteger('order_status')->nullable()->default(0);
            $table->unsignedSmallInteger('total_products')->nullable()->default(0);
            $table->decimal('sub_total', 10, 2)->nullable()->default(0);
            $table->decimal('total_discount', 10, 2)->nullable()->default(0);
            $table->decimal('vat', 10, 2)->nullable()->default(0);
            $table->string('invoice_no', 100)->nullable()->default('0');
            $table->decimal('total', 12, 2)->nullable()->default(0);
            $table->string('payment_status', 30)->default('UNPAID');            $table->json('billing_address')->nullable();
            $table->json('shipping_address')->nullable();
            $table->string('delivery_method', 30)->nullable()->default('COD');
            $table->string('delivery_status', 30)->nullable()->default('PENDING');
            $table->decimal('paid', 10, 2)->nullable()->default(0);
            $table->decimal('due', 10, 2)->nullable()->default(0);
            $table->text('note')->nullable();
            $table->timestamps();
            $table->softDeletes();
        
            $table->index('user_id');
            $table->index('customer_id');
            $table->index('warehouse_id');
            $table->index('order_type');
            $table->index('order_date');
            $table->index('order_status');
            $table->index('invoice_no');
            $table->index('delivery_status');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
};
