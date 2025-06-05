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
        Schema::create('purchase_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('purchase_id')->constrained()->onDelete('cascade')->index()->name('purchase_items_purchase_id_foreign'); // Adding index
            $table->foreignId('product_id')->constrained()->nullable()->index()->name('purchase_items_product_id_foreign'); // Adding index
            $table->integer('quantity');
            $table->decimal('buying_price', 8, 2)->nullable(); // Using decimal type
            $table->decimal('selling_price', 8, 2)->nullable(); // Using decimal type
            $table->integer('receive_quantity')->nullable()->default(0);
            $table->decimal('receive_buying_price', 8, 2)->nullable()->default(0); // Using decimal type
            $table->integer('return_quantity' )->nullable()->default(0); // Using decimal type
            $table->decimal('return_price', 8, 2)->nullable()->default(0); // Using decimal type
            $table->text('note')->nullable();
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
        Schema::dropIfExists('purchase_items');
    }
};
