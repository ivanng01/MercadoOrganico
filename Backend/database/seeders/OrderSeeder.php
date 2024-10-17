<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Order;
use Carbon\Carbon;  

class OrderSeeder extends Seeder
{
    public function run()
    {
        $users = User::all();

        foreach ($users as $user) {
            // Creo una nueva orden manualmente
            Order::create([
                'user_id' => $user->id,
                'total_amount' => rand(5000, 20000), // Monto total aleatorio
                'payment_method' => 'Pendiente', // Método de pago
                'shipping_status' => 'pending', // Estado de envío
                'order_date' => Carbon::now(), // Establezco la fecha actual
            ]);
        }
    }
}