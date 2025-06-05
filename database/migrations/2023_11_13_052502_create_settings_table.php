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
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key');
            $table->string('value')->nullable();


            //old
            // $table->string('app_name')->nullable();
            // $table->string('logo')->nullable();
            // $table->string('phone')->nullable();
            // $table->string('email')->nullable();
            // $table->string('address')->nullable();
            // $table->string('currency')->default('USD')->nullable();
            // $table->string('currency_symbol')->default('$')->nullable();
            // $table->integer('tax')->default(0)->nullable();
            // $table->string('timezone')->default('UTC');
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
        Schema::dropIfExists('settings');
    }
};
