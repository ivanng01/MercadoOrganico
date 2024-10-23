<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;

/**
 * @OA\Schema(
 *     schema="Role",
 *     type="object",
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="name", type="string", example="Admin"),
 *     @OA\Property(property="description", type="string", example="Usuario administrador")
 * )
 */
class RoleController extends Controller
{
    /**
     * @OA\Get(
     *     path="/roles",
     *     tags={"Roles"},
     *     security={{"bearerAuth": {}}}, 
     *     summary="Obtener todos los roles",
     *     description="Devuelve una lista de roles. Solo los administradores (rol id=1) pueden acceder a esta operación.",
     *     @OA\Response(
     *         response=200,
     *         description="Lista de roles",
     *         @OA\Schema(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Role")
     *         )
     *     ),
     *     @OA\Response(response=403, description="Acceso denegado"),
     *     @OA\Response(response=500, description="Error interno del servidor")
     * )
     */
    public function index()
    {
        $roles = Role::all();
        return response()->json($roles, 200);
    }

    /**
     * @OA\Post(
     *     path="/roles",
     *     tags={"Roles"},
     *     security={{"bearerAuth": {}}}, 
     *     summary="Crear un nuevo rol",
     *     description="Crea un nuevo rol en el sistema. Solo los administradores (rol id=1) pueden realizar esta operación.",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Role")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Rol creado exitosamente",
     *         @OA\Schema(ref="#/components/schemas/Role")
     *     ),
     *     @OA\Response(response=403, description="Acceso denegado"),
     *     @OA\Response(response=500, description="Error interno del servidor")
     * )
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $role = Role::create($request->all());

        return response()->json($role, 201);
    }

    /**
     * @OA\Get(
     *     path="/roles/{id}",
     *     tags={"Roles"},
     *     security={{"bearerAuth": {}}}, 
     *     summary="Obtener un rol por ID",
     *     description="Devuelve los detalles de un rol específico. Solo los administradores (rol id=1) pueden realizar esta operación.",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del rol",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Detalles del rol",
     *         @OA\Schema(ref="#/components/schemas/Role")
     *     ),
     *     @OA\Response(response=403, description="Acceso denegado"),
     *     @OA\Response(response=404, description="Rol no encontrado"),
     *     @OA\Response(response=500, description="Error interno del servidor")
     * )
     */
    public function show($id)
    {
        $role = Role::find($id);
        if (!$role) {
            return response()->json(['message' => 'Rol no encontrado.'], 404);
        }

        return response()->json($role, 200);
    }

    /**
     * @OA\Patch(
     *     path="/roles/{id}",
     *     tags={"Roles"},
     *     security={{"bearerAuth": {}}}, 
     *     summary="Actualizar un rol existente",
     *     description="Actualiza los detalles de un rol específico. Solo los administradores (rol id=1) pueden realizar esta operación.",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del rol",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Role")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Rol actualizado exitosamente",
     *         @OA\Schema(ref="#/components/schemas/Role")
     *     ),
     *     @OA\Response(response=403, description="Acceso denegado"),
     *     @OA\Response(response=404, description="Rol no encontrado"),
     *     @OA\Response(response=400, description="Solicitud inválida"),
     *     @OA\Response(response=500, description="Error interno del servidor")
     * )
     */
    public function update(Request $request, $id)
    {
        $role = Role::find($id);
        if (!$role) {
            return response()->json(['message' => 'Rol no encontrado.'], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $role->update($request->all());
        return response()->json($role, 200);
    }

    /**
     * @OA\Delete(
     *     path="/roles/{id}",
     *     tags={"Roles"},
     *     security={{"bearerAuth": {}}}, 
     *     summary="Eliminar un rol",
     *     description="Elimina un rol específico del sistema. Solo los administradores (rol id=1) pueden realizar esta operación.",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del rol",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=204, description="Rol eliminado exitosamente"),
     *     @OA\Response(response=403, description="Acceso denegado"),
     *     @OA\Response(response=404, description="Rol no encontrado"),
     *     @OA\Response(response=500, description="Error interno del servidor")
     * )
     */
    public function destroy($id)
    {
        $role = Role::find($id);
        if (!$role) {
            return response()->json(['message' => 'Rol no encontrado.'], 404);
        }

        $role->delete();
        return response()->json(null, 204);
    }
}
