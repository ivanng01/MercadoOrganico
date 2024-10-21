<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    public function run()
    {
        Product::create([
            'name' => 'Nueces blancas',
            'description' => 'Nueces blancas de España',
            'price' => 10.99,
            'stock' => 50,
            'category_id' => 1, 
            'user_id' => 2,
            'request_id' => 1,
            'image_path' => null,
        ]);

        Product::create([
            'name' => 'Frutillas',
            'description' => 'Frescas, importadas de Italia',
            'price' => 10.99,
            'stock' => 50,
            'category_id' => 1, 
            'user_id' => 2,
            'request_id' => 2,
            'image_path' => null,
        ]);

        Product::create([
            'name' => 'Carne cultivada',
            'description' => 'Estacionada con 5 meses',
            'price' => 15.49,
            'stock' => 30,
            'category_id' => 2, 
            'user_id' => 3,
            'request_id' => 3,
            'image_path' => null,
        ]);
        
    }
}

