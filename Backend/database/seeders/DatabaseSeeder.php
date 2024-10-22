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
        $this->call([
            TypeUsersTableSeeder::class, 
            UserSeeder::class,
            RolesTableSeeder::class,
            CategorySeeder::class,
            ProductRequestSeeder::class,
            ProductSeeder::class,
            OrderSeeder::class,
            OrderItemSeeder::class,
            ShoppingCartSeeder::class,
        ]);
    }
}
