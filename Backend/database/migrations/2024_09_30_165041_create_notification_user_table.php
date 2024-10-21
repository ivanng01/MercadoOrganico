<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNotificationUserTable extends Migration
{
    public function up()
    {
        Schema::create('notification_users', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('notification_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        // Elimina la clave foránea primero
        Schema::table('notification_users', function (Blueprint $table) {
            $table->dropForeign(['notification_id']); // Elimina la clave foránea
        });

        // Ahora, elimina la tabla
        Schema::dropIfExists('notification_users'); // Cambia esto
    }
}
