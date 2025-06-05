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
        Schema::create('purchases', function (Blueprint $table) {
            $table->id();
            $table->foreignId('warehouse_id')->constrained()->nullable()->index()->name('purchases_warehouse_id_foreign'); // Specify foreign key name; // Adding index
            $table->foreignId('supplier_id')->constrained()->nullable()->index()->name('purchases_supplier_id_foreign'); // Adding index
            $table->string('code')->unique()->nullable();
            $table->date('date')->nullable(); // Using date type
            $table->decimal('total_price', 8, 2);
            $table->decimal('receive_total_price', 8, 2)->nullable();
            $table->integer('total_product')->nullable();
            $table->integer('missing_product')->nullable();
            $table->text('note')->nullable();
            $table->date('return_date')->nullable(); // Using date type
            $table->integer('return_product')->nullable();
            $table->decimal('return_total_price', 8, 2)->nullable();
            $table->text('return_note')->nullable();
            $table->boolean('status')->dafault(false)->nullable(); // requested/confirm/cancel
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('purchases');
    }
};
