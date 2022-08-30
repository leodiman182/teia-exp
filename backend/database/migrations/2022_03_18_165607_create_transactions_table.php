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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();

            $table->integer('person_id')->nullable();
            $table->foreign('person_id')->references('id')->on('people');
            $table->integer('experience_id')->nullable();
            $table->foreign('experience_id')->references('id')->on('experiences');

            $table->double('value',8,2);
            $table->boolean('credit')->default(false);
            $table->timestamp('expire');
            $table->softDeletes();
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
        Schema::dropIfExists('transactions');
    }
};
