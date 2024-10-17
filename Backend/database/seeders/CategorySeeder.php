<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::create([
            'name' => 'Naturales',
            'description' => 'Categoria de naturales',
            'parent_id' => 1,
        ]);

        Category::updateOrCreate([
            'name' => 'Sinteticos',
            'description' => 'Categoria de sinteticos',
            'parent_id' => 2,
        ]);

    }
}
