<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Category;
use Illuminate\Http\Request;

/**
 * @OA\Schema(
 *     schema="Category",
 *     type="object",
 *     @OA\Property(property="id", type="integer", description="ID de la categoría"),
 *     @OA\Property(property="name", type="string", description="Nombre de la categoría"),
 *     @OA\Property(property="description", type="string", description="Descripción de la categoría"),
 *     @OA\Property(property="parent_id", type="integer", description="ID de la categoría padre (opcional)")
 * )
 */


class CategoryController extends Controller
{
    /**
     * @OA\Post(
     *     path="/categories",
     *     tags={"Categories"},
     *     summary="Crear una nueva categoría",
     *     security={{"bearerAuth": {}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name"},
     *             @OA\Property(property="name", type="string", description="Nombre de la categoría"),
     *             @OA\Property(property="description", type="string", description="Descripción de la categoría"),
     *             @OA\Property(property="parent_id", type="integer", description="ID de la categoría padre (opcional)")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Categoría creada con éxito",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", description="Mensaje de éxito"),
     *             @OA\Property(property="category", type="object", ref="#/components/schemas/Category")
     *         )
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="No tienes permiso para crear categorías"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Datos de entrada no válidos",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", description="Mensaje de error"),
     *             @OA\Property(property="errors", type="object", description="Errores de validación")
     *         )
     *     )
     * )
     */
    public function create(Request $request)
    {
        $authenticatedUser = $request->user();

        if ($authenticatedUser->type_user < 3) {
            return response()->json(['message' => 'No tienes permiso para crear categorías.'], 403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'parent_id' => 'nullable|exists:categories,id',
        ]);

        $category = Category::create([
            'name' => $request->name,
            'description' => $request->description,
            'parent_id' => $request->parent_id,
        ]);

        return response()->json(['message' => 'Categoría creada con éxito', 'category' => $category], 201);
    }

    /**
     * @OA\Patch(
     *     path="/categories/{id}",
     *     tags={"Categories"},
     *     summary="Actualizar una categoría existente",
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de la categoría a actualizar",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=false,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string", description="Nombre de la categoría"),
     *             @OA\Property(property="description", type="string", description="Descripción de la categoría"),
     *             @OA\Property(property="parent_id", type="integer", description="ID de la categoría padre (opcional)")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Categoría actualizada con éxito",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", description="Mensaje de éxito"),
     *             @OA\Property(property="category", type="object", ref="#/components/schemas/Category")
     *         )
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="No tienes permiso para actualizar categorías"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Categoría no encontrada"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Datos de entrada no válidos",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", description="Mensaje de error"),
     *             @OA\Property(property="errors", type="object", description="Errores de validación")
     *         )
     *     )
     * )
     */
    public function update(Request $request, $id)
    {
        $authenticatedUser = $request->user();

        if ($authenticatedUser->type_user < 3) {
            return response()->json(['message' => 'No tienes permiso para actualizar categorías.'], 403);
        }

        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'parent_id' => 'nullable|exists:categories,id',
        ]);

        $category = Category::findOrFail($id);

        if (!$category) {
            return response()->json(['message' => 'Categoría no encontrada.'], 404);
        }

        $category->update($request->only(['name', 'description', 'parent_id']));

        return response()->json(['message' => 'Categoría actualizada con éxito', 'category' => $category], 200);
    }
}
