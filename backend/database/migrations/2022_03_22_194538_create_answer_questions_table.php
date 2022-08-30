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
        Schema::create('answer_questions', function (Blueprint $table) {
            $table->id();
            $table->integer('answer_id')->nullable();
            $table->foreign('answer_id')->references('id')->on('answers');
            $table->integer('option_id')->nullable();
            $table->foreign('option_id')->references('id')->on('options');
            $table->integer('person_experiences_id')->nullable();
            $table->foreign('person_experiences_id')->references('id')->on('person_experiences');
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
        Schema::dropIfExists('answer_questions');
    }
};
