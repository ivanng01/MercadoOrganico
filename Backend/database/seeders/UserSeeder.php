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
        // Crea o actualiza un usuario con un correo específico
        User::updateOrCreate(
            ['email' => 'user@example.com'], // Cambia esto al correo que desees
            [
                'username' => 'johndoe', // Nombre de usuario
                'firstname' => 'John', // Nombre
                'lastname' => 'Doe', // Apellido
                'password' => bcrypt('password'), // Contraseña (encriptada)
                'phone_number' => '+544107851478', // Número de teléfono
                'type_user' => 1, // Tipo de usuario (ajusta según tu lógica)
                'gender' => 'male', // Género
                'birth_date' => '1990-01-01', // Fecha de nacimiento
                'picture' => 'path/to/picture.jpg', // Ruta de la imagen
                'status' => 1, // Estado del usuario
                'session' => 0, // Estado del usuario

            ]
        );

         // Segundo usuario con type_user = 2
         User::updateOrCreate(
            ['email' => 'user2@example.com'],
            [
                'username' => 'janedoe',
                'firstname' => 'Jane',
                'lastname' => 'Doe',
                'password' => bcrypt('password123'),
                'phone_number' => '+544107851479',
                'type_user' => 2,
                'gender' => 'female',
                'birth_date' => '1992-02-02',
                'picture' => 'path/to/picture2.jpg',
                'status' => 1,
                'session' => 0,
            ]
        );

        // Tercer usuario con type_user = 3
        User::updateOrCreate(
            ['email' => 'user3@example.com'],
            [
                'username' => 'liadone',
                'firstname' => 'Lia',
                'lastname' => 'Done',
                'password' => bcrypt('securepassword'),
                'phone_number' => '+544107851480',
                'type_user' => 3,
                'gender' => 'male',
                'birth_date' => '1995-03-03',
                'picture' => 'path/to/picture3.jpg',
                'status' => 1,
                'session' => 0,
            ]
        );
    }
}
