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
        Schema::create('tag_experiences', function (Blueprint $table) {
            $table->id();
            $table->integer('experience_tag_id')->nullable();
            $table->foreign('experience_tag_id')->references('id')->on('experience_tags');
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
        Schema::dropIfExists('tag_experiences');
    }
};
