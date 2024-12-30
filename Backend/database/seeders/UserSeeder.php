<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $commonPassword = bcrypt('securePassword123');

        User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'username' => 'adminUser',
                'firstname' => 'Admin',
                'lastname' => 'User',
                'password' => $commonPassword,
                'phone_number' => '+544107851478',
                'role_id' => 1,
                'gender' => 'male',
                'birth_date' => '1985-01-01',
                'picture' => '/admin_picture.jpg',
                'status' => 1,
                'session' => 0,
            ]
        );

        User::updateOrCreate(
            ['email' => 'producer@example.com'],
            [
                'username' => 'producerUser',
                'firstname' => 'Production',
                'lastname' => 'User',
                'password' => $commonPassword,
                'phone_number' => '+544107851479',
                'role_id' => 2,
                'gender' => 'female',
                'birth_date' => '1990-02-02',
                'picture' => '/producer_picture.jpg',
                'status' => 1,
                'session' => 0,
            ]
        );

        User::updateOrCreate(
            ['email' => 'client@example.com'],
            [
                'username' => 'clientUser',
                'firstname' => 'Client',
                'lastname' => 'User',
                'password' => $commonPassword,
                'phone_number' => '+544107851480',
                'role_id' => 3,
                'gender' => 'male',
                'birth_date' => '1995-03-03',
                'picture' => '/client_picture.jpg',
                'status' => 1,
                'session' => 0,
            ]
        );
    }
}
