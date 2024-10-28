<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MeasurementUnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('measurement_unit')->insert([
            [
                'id' => 1,
                'name' => 'Kilogramo',
                'description' => 'Se despacha por kilogramo, ideal para productos vendidos al peso, como frutas y verduras.',
                'abbreviation' => 'Kg',
            ],
            [
                'id' => 2,
                'name' => 'Gramo',
                'description' => 'Unidad de masa, utilizada para medir pequeñas cantidades de productos, como especias o hierbas.',
                'abbreviation' => 'g',
            ],
            [
                'id' => 3,
                'name' => 'Docena',
                'description' => 'Unidad de medida que equivale a 12 unidades, utilizada comúnmente para huevos.',
                'abbreviation' => 'dz',
            ],
            [
                'id' => 4,
                'name' => 'Unidad',
                'description' => 'Se utiliza para medir productos que se venden de forma individual, como aguacates o papas.',
                'abbreviation' => 'u',
            ],
            [
                'id' => 5,
                'name' => 'Litro',
                'description' => 'Unidad de medida para líquidos, ideal para productos como jugos o aceites.',
                'abbreviation' => 'L',
            ],
            [
                'id' => 6,
                'name' => 'Mililitro',
                'description' => 'Subdivisión del litro, utilizada para medir pequeñas cantidades de líquidos.',
                'abbreviation' => 'mL',
            ],
        ]);
    }
}
