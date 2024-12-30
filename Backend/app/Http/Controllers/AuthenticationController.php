<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

/**
 * @OA\Tag(
 *     name="Authentication",
 *     description="Para todos los usuarios"
 * )
 */

class AuthenticationController extends Controller
{
    /**
     * @OA\Post(
     *     path="/auth/register",
     *     tags={"Authentication"},
     *     summary="Registra un usuario cliente",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email","username","firstname","lastname","password","phone_number","gender","birth_date"},
     *             @OA\Property(property="email", type="string"),
     *             @OA\Property(property="username", type="string"),
     *             @OA\Property(property="firstname", type="string"),
     *             @OA\Property(property="lastname", type="string"),
     *             @OA\Property(property="password", type="string"),
     *         )
     *     ),
     *     @OA\Response(response=201, description="Usuario creado"),
     *     @OA\Response(response=422, description="Error de validación")
     * )
     */
    public function createUser(Request $request)
    {
        $credentials = $request->only('email', 'username', 'firstname', 'lastname', 'password');

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
            'gender' => null,
            'birth_date' => null,
            'picture' => null,
            'status' => 1,
            'session' => 1,
        ]);

        return response()->json(['message' => 'Usuario creado', 'data' => $user], 201);
    }

    /**
     * @OA\Post(
     *     path="/auth/login",
     *     tags={"Authentication"},
     *     summary="Iniciar sesión",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"identifier", "password"},
     *             @OA\Property(property="identifier", type="string", description="Nombre de usuario o email"),
     *             @OA\Property(property="password", type="string", description="Contraseña"),
     *             example={
     *                 "identifier": "olivia.perez@gmail.com",
     *                 "password": "12345678"
     *             }
     *         )
     *     ),
     *     @OA\Response(response=200, description="Login satisfactorio"),
     *     @OA\Response(response=400, description="Los datos ingresados son incorrectos"),
     *     @OA\Response(response=422, description="Error de validación")
     * )
     */

    public function loginSession(Request $request)
    {
        $credentials = $request->only('identifier', 'password');
        $validator = Validator::make($credentials, [
            'identifier' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::with('role')
            ->where('username', $request->identifier)
            ->orWhere('email', $request->identifier)
            ->first();

        if ($user && Auth::attempt(['username' => $user->username, 'password' => $credentials['password']])) {
            $user->tokens()->delete();

            $tokenResult = $user->createToken('Personal Access Token: ' . $user->username);
            $token = $tokenResult->plainTextToken;

            $user->session = 1;
            $user->save();

            return response()->json([
                "user" => new UserResource($user),                
                "token" => $token,
                'message' => 'Login satisfactorio'
            ], 200);
        } else {
            return response()->json(['errors' => 'Los datos ingresados son incorrectos'], 400);
        }
    }

    /**
     * @OA\Post(
     *     path="/auth/logout",
     *     tags={"Authentication"},
     *     summary="Cerrar sesión",
     *     description="Este endpoint cierra la sesión del usuario. Se requiere autenticación.",
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(response=200, description="Sesión cerrada"),
     *     @OA\Response(response=401, description="No autorizado, el usuario no está autenticado"),
     *     @OA\Response(response=404, description="Usuario no encontrado")
     * )
     */
    public function logoutUser(Request $request)
    {
        $user = $request->user();

        if ($user) {
            $user->tokens()->delete();
            $user->session = 0;
            $user->save();

            return response()->json(['message' => 'Sesión cerrada'], 200);
        }

        return response()->json(['errors' => 'Usuario no encontrado'], 404);
    }
}
