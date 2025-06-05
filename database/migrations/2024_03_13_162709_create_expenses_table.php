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
        Schema::create('expenses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('expense_category_id')->constrained()->index()->name('expenses_expense_category_id_foreign'); // Specify foreign key name
            $table->date('date');
            $table->string('title');
            $table->foreignId('user_id')->constrained()->index()->name('expenses_user_id_foreign'); // Specify foreign key name
            $table->foreignId('warehouse_id')->constrained()->onDelete('cascade')->index()->name('expenses_warehouse_id_foreign'); // Specify foreign key name            $table->integer('quantity')->default(0);
            $table->json('items')->nullable();
            $table->string('document')->nullable();
            $table->longText('description')->nullable();
            $table->decimal('total', 8, 2)->nullable()->default(0); // Using decimal type

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
        Schema::dropIfExists('expenses');
    }
};
