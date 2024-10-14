<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUser;
use App\Models\Failed_login;
use App\Models\User;
use App\Models\NotificationUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    /**
     * @OA\Post(
     *     path="/login_user",
     *     tags={"Authentication"},
     *     summary="Iniciar sesión",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"identifier", "password"},
     *             @OA\Property(property="identifier", type="string", description="Nombre de usuario o email"),
     *             @OA\Property(property="password", type="string"),
     *             example={
     *                 "example1": {
     *                     "identifier": "example@example.com",
     *                     "password": "password"
     *                 },
     *                 "example2": {
     *                     "identifier": "johndoe",
     *                     "password": "password"
     *                 }
     *             }
     *         )
     *     ),
     *     @OA\Response(response=200, description="Login satisfactorio"),
     *     @OA\Response(response=400, description="Los datos ingresados son incorrectos"),
     *     @OA\Response(response=422, description="Error de validación")
     * )
     */

    public function login_session(Request $request) {
        $credentials = $request->only('identifier', 'password'); 
        $validator = Validator::make($credentials, [
            'identifier' => 'required', 
            'password' => 'required',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
    
        $user = User::where('username', $request->identifier)
                    ->orWhere('email', $request->identifier)
                    ->first();
    
        if ($user && Auth::attempt(['username' => $user->username, 'password' => $credentials['password']])) {
            if (!is_null($user->tokens())) {
                $user->tokens()->delete();
            }
            
            $tokenResult = $user->createToken('Personal Access Token: ' . $user->username);
            $token = $tokenResult->plainTextToken;
    
            $update_session = User::find($user->id);
            $update_session->session = 1;
            $update_session->update();
    
            return response()->json([
                'response' => [
                    "user" => $user,
                    "token" => $token
                ],
                'success' => 'Login satisfactorio'
            ], 200);
    
        } else {
            if ($user) {
                $faileds_login = Failed_login::getFailedLogins($user->id);
                if (count($faileds_login) == 3) {         
                    NotificationUser::createTrack($user->id, 1);
    
                    $update_session = User::find($user->id);
                    $update_session->status = 0;
                    $update_session->update();
    
                    return response()->json([
                        'errors' => 'Máximo de intentos alcanzados, se bloqueó el usuario'
                    ], 400);
                } else {
                    $create_fail_login = new Failed_login();
                    $create_fail_login->user_id = $user->id;
                    $create_fail_login->save();
                }
            }
    
            return response()->json([
                'errors' => 'Los datos ingresados son incorrectos'
            ], 400);
        }
    }

    /**
    * @OA\Post(
    *     path="/log_out",
    *     tags={"Authentication"},
    *     summary="Cerrar sesión",
    *     description="Este endpoint cierra la sesión del usuario. Se requiere autenticación.",
    *     security={{"bearerAuth": {}}},
    *     @OA\Response(response=200, description="Sesión cerrada"),
    *     @OA\Response(response=401, description="No autorizado, el usuario no está autenticado"),
    *     @OA\Response(response=404, description="Usuario no encontrado")
    * )
    */

    public function logout_user(Request $request)
    {
        $user = $request->user();
    
        if ($user) {
            $user->tokens()->delete();
    
            $user->session = 0;
            $user->save(); 
    
            return response()->json([
                'success' => 'Sesión cerrada',
            ], 200);
        }
    
        return response()->json([
            'error' => 'Usuario no encontrado',
        ], 404);
    }


    /**
     * @OA\Post(
     *     path="/create_user",
     *     tags={"User Management"},
     *     summary="Crear usuario",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email","username","name","lastname","password","type_user","phone_number","gender","birth_date"},
     *             @OA\Property(property="email", type="string"),
     *             @OA\Property(property="username", type="string"),
     *             @OA\Property(property="name", type="string"),
     *             @OA\Property(property="lastname", type="string"),
     *             @OA\Property(property="password", type="string"),
     *             @OA\Property(property="type_user", type="integer"),
     *             @OA\Property(property="phone_number", type="string"),
     *             @OA\Property(property="gender", type="string"),
     *             @OA\Property(property="birth_date", type="string", format="date"),
     *             @OA\Property(property="picture", type="string")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Usuario creado"),
     *     @OA\Response(response=422, description="Error de validación")
     * )
     */
    public function create_user(Request $request) {
        
        $credentials = $request->only('email', 'username', 'firstname', 'lastname', 'password', 'type_user', 'phone_number', 'gender', 'birth_date', 'picture');
        $validator = Validator::make($credentials, [
            'email' => [
                'required',
                'email',
                'unique:users,email',
                'regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/',
                'max:64'
            ],
            'username' => 'required|string|alpha_dash|unique:users,username|min:3|max:15',
            'firstname' => 'required|string|min:2|max:50',
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
        return response()->json(['errors' => $validator->errors()], 422);
    }

    $user = User::create([
        'username' => $request->input('username'),
        'firstname' => $request->input('firstname'), 
        'lastname' => $request->input('lastname'),
        'email' => $request->input('email'),
        'password' => Hash::make($request->input('password')),
        'phone_number' => null,
        'type_user' => 1, 
        'gender' => null, 
        'birth_date' => null,
        'picture' => null,
        'status' => 1, 
        'session' => 1, 
    ]);

    $dataUser = User::find($user->id);
    return response()->json(['message' => 'Usuario creado', 'user' => $dataUser], 201);
}

}