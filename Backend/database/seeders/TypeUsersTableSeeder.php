<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TypeUsersTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('type_users')->insert([
            ['type_user' => 'cliente', 'estado' => 1],
            ['type_user' => 'productor', 'estado' => 1],
            ['type_user' => 'administrador', 'estado' => 1],
        ]);
    }
}
