<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class SetDefaultMeasurementUnitInProducts extends Migration
{
    public function up()
    {
        // Supongamos que el ID de la unidad de medida por defecto es 1
        DB::table('products')->update(['measurement_unit_id' => 1]);
    }

    public function down()
    {
        // Si quieres revertir, puedes poner null o un valor específico
        DB::table('products')->update(['measurement_unit_id' => null]);
    }
}
