<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProductRequest;

class ProductRequestSeeder extends Seeder
{
    public function run()
    {
        ProductRequest::create([
            'name' => 'Solicitud de Nueces',
            'description' => 'Solicitud para nueces blancas',
            'user_id' => 2, 
            'status' => 'approved', 
        ]);

        ProductRequest::create([
            'name' => 'Solicitud de Frutillas',
            'description' => 'Solicitud para frutillas frescas',
            'user_id' => 2,
            'status' => 'approved',
        ]);

        ProductRequest::create([
            'name' => 'Solicitud de Carne',
            'description' => 'Solicitud para carne cultivada',
            'user_id' => 3,
            'status' => 'approved',
        ]);
    }
}
