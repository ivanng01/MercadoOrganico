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
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('username');
            $table->string('firstname');
            $table->string('lastname');
            $table->string('email')->unique();
            $table->string('password');
            $table->unsignedBigInteger('role_id');
            $table->boolean('status')->default(true);
            $table->integer('session')->nullable();
            $table->enum('gender', ['male', 'female', 'other'])->nullable();
            $table->date('birth_date')->nullable();
            $table->string('phone_number', 20)->nullable();
            $table->string('picture')->nullable();
            $table->timestamps();
            $table->rememberToken();

            $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
