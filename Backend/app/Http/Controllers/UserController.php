<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * @OA\Get(
     *     path="/users",
     *     summary="Obtener todos los usuarios",
     *     security={{"bearerAuth": {}}},
     *     tags={"Users"},
     *     @OA\Response(
     *         response=200,
     *         description="Una lista de usuarios",
     *         @OA\JsonContent(type="array", @OA\Items(type="object", example={"id": 1, "username": "johndoe123", "email": "johndoe@example.com"}))
     *     )
     * )
     */
    public function index()
    {
        $users = User::all();
        
        return response()->json(['users' => $users], 200);
    }

    /**
     * @OA\Get(
     *     path="/users/{id}",
     *     summary="Obtener un usuario por ID",
     *     security={{"bearerAuth": {}}},
     *     tags={"Users"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Un objeto de usuario",
     *         @OA\JsonContent(type="object", example={"id": 1, "username": "johndoe123", "email": "johndoe@example.com"})
     *     ),
     *     @OA\Response(response=404, description="Usuario no encontrado")
     * )
     */
    public function show(User $user)
    {
        return response()->json(['user' => $user], 200);
    }

    /**
     * @OA\Get(
     *     path="/users/profile",
     *     summary="Obtener el perfil del usuario autenticado",
     *     security={{"bearerAuth": {}}},
     *     tags={"Users"},
     *     @OA\Response(
     *         response=200,
     *         description="Perfil de usuario obtenido exitosamente",
     *         @OA\JsonContent(type="object", example={"id": 1, "username": "johndoe123", "email": "johndoe@example.com"})
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="No autenticado"
     *     )
     * )
     */
    public function profile(Request $request)
    {
        return response()->json($request->user());
    }

    /**
      * @OA\Patch(
      *     path="/users/{id}",
      *     summary="Actualizar parcialmente un usuario",
      *     description="Permite la actualización parcial de un usuario especificando solo los campos que se desean modificar. Se pueden actualizar todos los campos, excepto email, username y password.",
      *     tags={"Users"},
      *     security={{"bearerAuth": {}}},
      *     @OA\Parameter(
      *         name="id",
      *         in="path",
      *         required=true,
      *         @OA\Schema(type="integer")
      *     ),
      *     @OA\RequestBody(
      *         required=false,
      *         @OA\JsonContent(type="object", example={"firstname": "Antonio", "lastname": "Banderas", "type_user": 1})
      *     ),
      *     @OA\Response(
      *         response=200,
      *         description="Usuario actualizado parcialmente exitosamente.",
      *         @OA\JsonContent(type="object", example={"id": 1, "username": "antonio54", "firstname": "Antonio", "lastname": "Banderas", "email": "antoniobanderas@gmail.com"})
      *     ),
      *     @OA\Response(response=404, description="Usuario no encontrado")
      * )
      */

    public function update(Request $request, User $user)
    {
        $validatedData = $request->validate([
            'firstname' => 'sometimes|required|string|max:255',
            'lastname' => 'sometimes|required|string|max:255',
            'type_user' => 'sometimes|required|integer',
            'status' => 'sometimes|required|integer',
            'session' => 'sometimes|required|integer',
            'gender' => 'sometimes|nullable|string',
            'birth_date' => 'sometimes|nullable|date',
            'phone_number' => 'sometimes|nullable|string|max:15',
            'picture' => 'sometimes|nullable|string',
        ]);

        $user->update($validatedData);

        return response()->json(['user' => $user], 200);
    }

    /**
     * @OA\Delete(
     *     path="/users/{id}",
     *     summary="Eliminar un usuario",
     *     security={{"bearerAuth": {}}},
     *     tags={"Users"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Usuario eliminado exitosamente"
     *     ),
     *     @OA\Response(response=404, description="Usuario no encontrado")
     * )
     */
    public function destroy(User $user)
    {
        return response()->json([
            'message' => 'Funcionalidad de eliminación no implementada aún.'
        ], 501); 
    }
}
