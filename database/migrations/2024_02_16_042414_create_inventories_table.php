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
        Schema::create('inventories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('variant_id')->constrained()->onDelete('cascade')->index()->name('inventories_variant_id_foreign'); // Specify foreign key name
            $table->foreignId('warehouse_id')->constrained()->nullable()->onDelete('cascade')->index()->name('inventories_warehouse_id_foreign'); // Specify foreign key name
            $table->integer('quantity')->nullable()->default(0);
            $table->integer('min_alert')->nullable()->default(0);
            $table->integer('max_alert')->nullable()->default(0);
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
        Schema::dropIfExists('inventories');
    }
};
