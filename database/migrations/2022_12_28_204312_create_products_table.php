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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('title')->unique();
            $table->string('slug')->unique();
            $table->foreignId('category_id')->constrained()->index()->name('products_category_id_foreign'); // Specify foreign key name
            $table->foreignId('sub_category_id')->nullable()->constrained()->index()->name('products_sub_category_id_foreign');
            $table->foreignId('sub_sub_category_id')->nullable()->constrained()->index()->name('products_sub_sub_category_id_foreign'); // optional
            $table->foreignId('brand_id')->nullable()->constrained()->index()->name('products_brand_id_foreign'); // Specify foreign key name
            $table->foreignId('unit_id')->nullable()->constrained()->index()->name('products_unit_id_foreign'); // Specify foreign key name
            $table->string('sku', 50)->unique()->nullable(); // Limiting length
            $table->string('barcode', 50)->unique()->nullable(); // Limiting length
            $table->string('weight')->nullable();
            $table->string('thumbnail')->nullable();
            $table->longText('description')->nullable();
            $table->date('buying_date')->nullable(); // Using date type
            $table->date('expire_date')->nullable(); // Using date type
            $table->decimal('buying_price', 8, 2)->nullable(); // Using decimal type
            $table->decimal('discount_price', 8, 2)->nullable(); // Using decimal type
            $table->decimal('price', 8, 2)->nullable(); // Using decimal type
            $table->boolean('status')->default(true); // Using boolean type
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
        Schema::dropIfExists('products');
    }
};
