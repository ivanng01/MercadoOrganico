<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

/**
 * @OA\Schema(
 *     schema="User",
 *     type="object",
 *     @OA\Property(property="id", type="integer"),
 *     @OA\Property(property="username", type="string"),
 *     @OA\Property(property="firstname", type="string"),
 *     @OA\Property(property="lastname", type="string"),
 *     @OA\Property(property="email", type="string", format="email"),
 *     @OA\Property(property="password", type="string", format="password"),
 *     @OA\Property(property="phone_number", type="string"),
 *     @OA\Property(property="birth_date", type="string", format="date"),
 *     @OA\Property(property="picture", type="string", format="uri"),
 *     @OA\Property(property="gender", type="string"),
 *     @OA\Property(property="status", type="integer"),
 *     @OA\Property(property="session", type="integer"),
 *     @OA\Property(property="remember_token", type="string"),
 *     @OA\Property(property="role_id", type="integer"),
 *     @OA\Property(property="email_verified_at", type="string", format="date-time", nullable=true),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time"),
 * )
 */

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

    public function index(Request $request)
    {
        $query = User::with(['role']);

        $filters = [
            'username',
            'firstname',
            'lastname',
            'email',
            'role_id',
            'status',
            'session',
            'gender',
            'birth_date',
            'phone_number',
            'created_at',
            'updated_at',
        ];

        foreach ($filters as $filter) {
            if ($request->filled($filter)) {
                $query->where($filter, $request->query($filter));
            }
        }

        $users = $query->paginate(10);

        return response()->json($users, 200);
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
    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado.'], 404);
        }
        return response()->json([$user], 200);
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
    public function profile()
    {
        $user = auth()->user()->load('role');

        return response()->json([$user], 200);
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
     *         @OA\JsonContent(type="object", example={"firstname": "Antonio", "lastname": "Banderas", "role_id": 1})
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Usuario actualizado parcialmente exitosamente.",
     *         @OA\JsonContent(type="object", example={"id": 1, "username": "antonio54", "firstname": "Antonio", "lastname": "Banderas", "email": "antoniobanderas@gmail.com"})
     *     ),
     *     @OA\Response(response=404, description="Usuario no encontrado")
     * )
     */

    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado.'], 404);
        }

        $validatedData = $request->validate([
            'firstname' => 'sometimes|required|string|max:255',
            'lastname' => 'sometimes|required|string|max:255',
            'role_id' => 'sometimes|required|integer',
            'status' => 'sometimes|required|integer',
            'session' => 'sometimes|required|integer',
            'gender' => 'sometimes|nullable|string',
            'birth_date' => 'sometimes|nullable|date',
            'phone_number' => 'sometimes|nullable|string|max:15',
            'picture' => 'sometimes|nullable|string',
        ]);

        $user->update($validatedData);

        return response()->json($user, 200);
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
     *     @OA\Response(response=403, description="No tienes permiso para eliminar el usuario"),
     *     @OA\Response(response=404, description="Usuario no encontrado")
     * )
     */

    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado.'], 404);
        }

        $user->delete();

        return response()->json(null, 204);
    }
}
