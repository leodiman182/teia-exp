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
        Schema::create('people', function (Blueprint $table) {
            $table->id();

            // $table->integer('user_id')->nullable();;
            // $table->foreign('user_id')->references('id')->on('users');
            $table->integer('level_id')->nullable();
            $table->foreign('level_id')->references('id')->on('levels');
            $table->integer('company_id')->nullable();
            $table->foreign('company_id')->references('id')->on('companies');

            $table->string('rg',9)->nullable();
            $table->string('cpf',11)->nullable();
            $table->string('name',128);
            $table->integer('zip_code')->nullable();
            $table->string('address',256)->nullable();
            $table->integer('address_number')->nullable();
            $table->string('district',256)->nullable();
            $table->string('city',128)->nullable();
            $table->string('email',128);
            
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
        Schema::dropIfExists('people');
    }
};
