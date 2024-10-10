<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUser;
use App\Models\Failed_login;
use App\Models\User;
use App\Models\Notification_user;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;



class LoginController extends Controller
{
    // Metodo login
    public function login_session(Request $request){
        $credentials = $request->only('username', 'password');
        $validator = Validator::make($credentials, [
            'username' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        if (Auth::attempt($credentials)) {
            $user = $request->user();
            if(!is_null($user->tokens())){
                $user->tokens()->delete();
            }
            
            $tokenResult = $user->createToken('Personal Access Token: '.$user->username);
            $token = $tokenResult->plainTextToken;

            $update_session = User::find($user->id);
            $update_session->session = 1;
            $update_session->update();

            return response()->json([
                'response' => [
                    "user" => User::find($user->id),
                    "token" => $token
                ],
                'success' => 'Login satisfactorio'
            ], 200);

        }else{
            $login_user = User::where("username", $request->username)->get();
            if (!empty($login_user)) {
                $faileds_login = Failed_login::getFailedLogins($login_user[0]["id"]);
                if (count($faileds_login) == 3) {         
                    Notification_user::createTrack($login_user[0]["id"], 1);

                    $update_session = User::find($login_user[0]["id"]);
                    $update_session->status = 0;
                    $update_session->update();

                    return response()->json([
                        'errors' => 'Maximo de intentos alcanzados, se bloqueo el usuario'
                    ], 400);
                }else{
                    $create_fail_login = new Failed_login();
                    $create_fail_login->user_id = $login_user[0]["id"];
                    $create_fail_login->save();
                }
            }

            return response()->json([
                'errors' => 'Los datos ingresados son incorrectos'
            ], 400);
        }
    }

    // Metodo cerrar sesion
    public function logout_user(Request $request)
    {
        // Obtén el usuario autenticado directamente
        $user = $request->user();
    
        // Verifica que el usuario exista
        if ($user) {
            // Elimina todos los tokens del usuario
            $user->tokens()->delete();
    
            // Actualiza la sesión del usuario
            $user->session = 0;
            $user->save(); // O usa update()
    
            return response()->json([
                'success' => 'Sesión cerrada',
            ], 200);
        }
    
        return response()->json([
            'error' => 'Usuario no encontrado',
        ], 404);
    }
    // Metodo create_user para crear usuario
    public function create_user(Request $request) {
        
        $credentials = $request->only('email', 'username', 'name', 'lastname', 'password', 'type_user', 'phone_number', 'gender', 'birth_date', 'picture');
        $validator = Validator::make($credentials, [
            'email' => [
                'required',
                'email',
                'unique:users,email',
                'regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/',
                'max:64'
            ],
            'username' => 'required|string|alpha_dash|unique:users,username|min:3|max:15',
            'name' => 'required|string|min:2|max:50',
            'lastname' => 'required|string|min:2|max:50',
            'password' => 'required|string|min:8|max:30',
            'type_user' => 'required|integer|in:1,2',
            'gender' => 'required|in:male,female,other',
            'birth_date' => 'required|date',
            'picture' => 'nullable|string|max:255',
            'phone_number' => [
                'required',
                'string',
                'regex:/^\+?[1-9]\d{7,19}$/',
            ],

        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
        
        $user = User::create([
            'username' => $request->input('username'),
            'name' => $request->input('name'),
            'lastname' => $request->input('lastname'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'phone_number' => $request->input('phone_number'),
            'type_user' => $request->input('type_user'),
            'gender' => $request->input('gender'),
            'birth_date' => $request->input('birth_date'),
            'picture' => $request->input('picture'),
            'status' => 1,
            'session' => 1,
        ]);
        
        $dataUser = User::find($user->id);
        return response()->json(['message' => 'Usuario creado', 'user' => $dataUser], 201);
    }

}