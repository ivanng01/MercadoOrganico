<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run()
    {
        Product::create([
            'name' => 'Huevos de Gallina de Campo',
            'description' => 'Huevos frescos de gallinas criadas en libertad, alimentadas con granos naturales.',
            'price' => 12.99,
            'stock' => 100,
            'category_id' => 1, 
            'user_id' => 2,
            'request_id' => 1,
            'image_path' => '/huevos_gallina_campo.jpg',
            'is_featured' => true, 
        ]);

        Product::create([
            'name' => 'Pan Integral Horneado a Leña',
            'description' => 'Pan artesanal hecho con ingredientes orgánicos, horneado al estilo tradicional con leña.',
            'price' => 14.99,
            'stock' => 75,
            'category_id' => 1, 
            'user_id' => 2,
            'request_id' => 2,
            'image_path' => '/pan_integral.jpg',
            'is_featured' => true, 
        ]);

        Product::create([
            'name' => 'Plátano Orgánico',
            'description' => 'Plátanos seleccionados, cultivados sin pesticidas y cosechados a mano.',
            'price' => 17.49,
            'stock' => 50,
            'category_id' => 2, 
            'user_id' => 3,
            'request_id' => 3,
            'image_path' => '/platano_organico.jpg',
            'is_featured' => true,
        ]);

        Product::create([
            'name' => 'Manzana Roja Orgánica',
            'description' => 'Manzanas frescas, cultivadas de manera orgánica, perfectas para picar o hacer jugo.',
            'price' => 18.49,
            'stock' => 50,
            'category_id' => 2, 
            'user_id' => 3,
            'request_id' => 3,
            'image_path' => '/manzana_roja.jpg',
            'is_featured' => true, 
        ]);
    }
}
