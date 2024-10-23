<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = [
            ['name' => 'administrador', 'description' => 'Usuario con acceso total al sistema', 'status' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'productor', 'description' => 'Usuario encargado de gestionar productos', 'status' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'cliente', 'description' => 'Usuario que puede comprar productos', 'status' => 1, 'created_at' => now(), 'updated_at' => now()],
        ];

        DB::table('roles')->insert($roles);
    }
}
