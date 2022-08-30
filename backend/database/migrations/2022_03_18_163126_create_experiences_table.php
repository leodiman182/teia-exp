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
        Schema::create('experiences', function (Blueprint $table) {
            $table->id();

            $table->integer('experience_categories_id');
            $table->foreign('experience_categories_id')->references('id')->on('experience_categories');
            
            $table->string('title', 64);
            $table->string('description');
            $table->double('price', 8, 2);
            $table->string('image',256);
            $table->string('duration', 128);
            $table->string('localization', 128);
            $table->string('when', 128);
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
        Schema::dropIfExists('experiences');
    }
};
