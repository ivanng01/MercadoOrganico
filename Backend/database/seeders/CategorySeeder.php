<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run()
    {
        Category::updateOrCreate(
            ['name' => 'Huevos'],
            ['description' => 'Incluye productos a base de huevo.', 'parent_id' => null]
        );

        Category::updateOrCreate(
            ['name' => 'Verduras'],
            ['description' => 'Abarca todo tipo de vegetales.', 'parent_id' => null]
        );

        Category::updateOrCreate(
            ['name' => 'Lácteos y Sustitutos'],
            ['description' => 'Productos lácteos y alternativas veganas.', 'parent_id' => null]
        );

        Category::updateOrCreate(
            ['name' => 'Condimentos y Salsas'],
            ['description' => 'Especias, salsas y aderezos.', 'parent_id' => null]
        );

        Category::updateOrCreate(
            ['name' => 'Carnes y Sustitutos'],
            ['description' => 'Carnes y opciones vegetarianas o veganas.', 'parent_id' => null]
        );

        Category::updateOrCreate(
            ['name' => 'Miel y Edulcorantes'],
            ['description' => 'Miel, azúcar y otros endulzantes.', 'parent_id' => null]
        );

        Category::updateOrCreate(
            ['name' => 'Bebidas'],
            ['description' => 'Diversas bebidas, como agua, jugos, etc.', 'parent_id' => null]
        );

        Category::updateOrCreate(
            ['name' => 'Productos de Panadería'],
            ['description' => 'Pan, bollería y productos horneados.', 'parent_id' => null]
        );

        Category::updateOrCreate(
            ['name' => 'Frutas'],
            ['description' => 'Todo tipo de frutas frescas.', 'parent_id' => null]
        );

        Category::updateOrCreate(
            ['name' => 'Granos y Legumbres'],
            ['description' => 'Cereales, legumbres y semillas.', 'parent_id' => null]
        );
    }
}
