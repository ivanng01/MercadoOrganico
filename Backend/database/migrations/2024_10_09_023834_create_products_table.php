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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('price', 8, 2);
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
            $table->enum('status', ['available', 'unavailable']);
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->boolean('is_featured')->default(false);
            $table->integer('stock');
            $table->foreignId('request_id')->nullable()->constrained('product_requests')->onDelete('set null');
            $table->foreignId('measurement_unit_id')->constrained('measurement_unit')->onDelete('cascade');
            $table->string('image_path')->nullable();
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
        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['measurement_unit_id']); // Eliminar la clave foránea
            $table->dropColumn('measurement_unit_id'); // Eliminar la columna
        });
        Schema::dropIfExists('products');
    }
};
