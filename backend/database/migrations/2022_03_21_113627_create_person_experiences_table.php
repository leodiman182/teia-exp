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
        Schema::create('person_experiences', function (Blueprint $table) {
            $table->id();
            $table->integer('person_id')->nullable();
            $table->foreign('person_id')->references('id')->on('people');
            // $table->integer('answer_id')->nullable();
            // $table->foreign('answer_id')->references('id')->on('answers');
            $table->integer('experience_id')->nullable();
            $table->foreign('experience_id')->references('id')->on('experiences');
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
        Schema::dropIfExists('person_experiences');
    }
};
