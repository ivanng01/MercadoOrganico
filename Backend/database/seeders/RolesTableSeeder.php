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
        DB::table('roles')->insert([
            ['name' => 'administrador', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'productor', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'cliente', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
