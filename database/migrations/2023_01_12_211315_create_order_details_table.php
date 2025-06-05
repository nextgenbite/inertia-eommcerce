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
        Schema::create('order_details', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('order_id');
            $table->mediumInteger('product_id');
            $table->integer('quantity')->nullable()->default(0);
            $table->decimal('unitcost',12,2)->nullable()->default(0);
            $table->decimal('discount',8,2)->nullable()->default(0);
            $table->decimal('tax',8,2)->nullable()->default(0);
            $table->decimal('unit_price_inc_tax',12,2)->nullable()->default(0);
            $table->decimal('total',12,2)->nullable()->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orderdetails');
    }
};
