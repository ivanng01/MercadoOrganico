<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProductRequest; 

class ProductRequestSeeder extends Seeder
{
    public function run()
    {
        ProductRequest::create([
            'name' => 'Solicitud de Productos Orgánicos - Aprobada',
            'description' => 'Solicitud para vender productos orgánicos aprobada.',
            'user_id' => 1, 
            'status' => 'approved',
            'admin_id' => 1,
        ]);

        ProductRequest::create([
            'name' => 'Solicitud de Productos Orgánicos - En Espera',
            'description' => 'Solicitud para vender productos orgánicos en espera.',
            'user_id' => 2,
            'status' => 'pending',
            'admin_id' => 1,
        ]);

        ProductRequest::create([
            'name' => 'Solicitud de Productos Orgánicos - Rechazada',
            'description' => 'Solicitud para vender productos orgánicos rechazada.',
            'user_id' => 3,
            'status' => 'rejected',
            'admin_id' => 2, 
        ]);
    }
}
