<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('product_requests', function (Blueprint $table) {
            $table->dropUnique(['name']); // Eliminar la restricción de unicidad
        });
    }

    public function down()
    {
        Schema::table('product_requests', function (Blueprint $table) {
            $table->string('name')->unique()->change(); // Revertir la restricción
        });
    }
};
