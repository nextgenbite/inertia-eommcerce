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
            $table->bigIncrements('id');
             $table->uuid('tenant_id');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('customer_id')->nullable();
            $table->unsignedBigInteger('warehouse_id')->nullable();

            $table->enum('order_type', ['online', 'offline'])->nullable()->index();
            $table->date('order_date')->nullable()->index();
            $table->tinyInteger('order_status')->nullable()->default(0)->index();
            $table->unsignedSmallInteger('total_products')->nullable()->default(0);
            $table->decimal('subtotal', 10, 2)->nullable()->default(0);
            $table->decimal('total_discount', 10, 2)->nullable()->default(0);
            $table->decimal('shipping_cost', 10, 2)->nullable()->default(0);
            $table->decimal('tax', 10, 2)->nullable()->default(0);
            $table->string('invoice_no', 100)->nullable()->default('0')->index();
            $table->decimal('total', 12, 2)->nullable()->default(0);
            $table->enum('payment_status', ['UNPAID', 'PAID', 'PARTIAL'])->default('UNPAID');
            $table->json('billing_address')->nullable();
            $table->json('shipping_address')->nullable();
            $table->enum('delivery_method', ['COD', 'PICKUP', 'COURIER'])->nullable()->default('COD');
            $table->enum('delivery_status', ['PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED'])->nullable()->default('PENDING')->index();
            $table->decimal('paid', 10, 2)->nullable()->default(0);
            $table->decimal('due', 10, 2)->nullable()->default(0);
            $table->text('note')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('user_id');
            $table->index('customer_id');
            $table->index('warehouse_id');
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
