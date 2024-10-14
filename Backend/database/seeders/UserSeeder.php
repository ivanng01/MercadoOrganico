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
            ['email' => 'example@example.com'], // Cambia esto al correo que desees
            [
                'name' => 'John', // Nombre
                'lastname' => 'Doe', // Apellido
                'username' => 'johndoe', // Nombre de usuario
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
    }
}
