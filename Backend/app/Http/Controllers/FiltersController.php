<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;

class FiltersController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/products/search",
     *     summary="Buscar productos",
     *     description="Devuelve una lista de productos basados en los parámetros de búsqueda.",
     *     @OA\Parameter(
     *         name="product_name",
     *         in="query",
     *         description="Nombre del producto para buscar.",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="category_name",
     *         in="query",
     *         description="Nombre de la categoría para filtrar los productos.",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Lista de productos filtrados.",
     *         @OA\JsonContent(
     *             @OA\Property(property="products", type="array", @OA\Items(ref="#/components/schemas/Product"))
     *         )
     *     ),
     *     @OA\Response(response=404, description="No se encontraron productos.")
     * )
     */

    public function search(Request $request)
    {
        $query = Product::query();

        if ($request->has('product_name') && !empty($request->input('product_name'))) {
            $query->where('name', 'like', '%' . $request->input('product_name') . '%');
        }

        if ($request->has('category_name') && !empty($request->input('category_name'))) {
            $category = Category::where('name', $request->input('category_name'))->first();

            if ($category) {
                $query->where('category_id', $category->id);
            } else {
                return response()->json([
                    'status' => 'error',
                    'code' => 404,
                    'message' => 'Categoría no encontrada.'
                ], 404);
            }
        }

        $products = $query->get();

        if ($products->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'code' => 404,
                'message' => 'Producto(s) inexistente(s).'
            ], 404);
        }

        return response()->json(['products' => $products], 200);
    }
}
