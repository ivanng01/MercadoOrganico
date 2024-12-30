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
        Schema::create('inventoryhistory', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->foreignId('inventory_id')->constrained('inventory')->onDelete('cascade'); // Cambia 'inventories' por 'inventory'
            $table->enum('action', ['addition', 'removal', 'adjustment']);
            $table->integer('quantity');
            $table->date('change_date');
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
        Schema::dropIfExists('inventoryhistory');
    }
};
