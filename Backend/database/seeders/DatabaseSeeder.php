<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Llama al UserSeeder para llenar la tabla de usuarios
        $this->call([
            TypeUsersTableSeeder::class, 
            UserSeeder::class,
            CategorySeeder::class,
        ]);
    }
}
