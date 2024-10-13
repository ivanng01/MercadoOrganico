<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

/**
 * Controlador de productos.
 */
class ProductsController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/create_product",
     *     tags={"Products"},
     *     summary="Crear producto",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name", "description", "price", "category_id", "status", "stock", "is_featured"},
     *             @OA\Property(property="name", type="string", description="Nombre del producto"),
     *             @OA\Property(property="description", type="string", description="Descripción del producto"),
     *             @OA\Property(property="price", type="number", format="float", description="Precio del producto"),
     *             @OA\Property(property="category_id", type="integer", description="ID de la categoría"),
     *             @OA\Property(property="status", type="string", description="Estado del producto"),
     *             @OA\Property(property="stock", type="integer", description="Cantidad en stock"),
     *             @OA\Property(property="is_featured", type="boolean", description="¿Es un producto destacado?"),
     *             example={
     *                 "name": "Producto Ejemplo",
     *                 "description": "Descripción del producto ejemplo.",
     *                 "price": 99.99,
     *                 "category_id": 1,
     *                 "status": "disponible",
     *                 "stock": 100,
     *                 "is_featured": 1
     *             }
     *         )
     *     ),
     *     @OA\Response(response=201, description="Producto creado exitosamente"),
     *     @OA\Response(response=400, description="Los datos ingresados son incorrectos"),
     *     @OA\Response(response=422, description="Error de validación")
     * )
     */
    public function create_product(Request $request) {
        $this->validateProduct($request);

        $product = Product::create([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'price' => $request->input('price'),
            'category_id' => $request->input('category_id'),
            'status' => $request->input('status'),
            'stock' => $request->input('stock'),
            'is_featured' => $request->input('is_featured'),
        ]);

        return response()->json(['message' => 'Product created successfully', 'product' => $product], 201);
    }

    /**
     * @OA\Delete(
     *     path="/api/delete_product/{id}",
     *     tags={"Products"},
     *     summary="Eliminar producto",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer", description="ID del producto a eliminar")
     *     ),
     *     @OA\Response(response=200, description="Producto eliminado exitosamente"),
     *     @OA\Response(response=404, description="Producto no encontrado"),
     *     @OA\Response(response=400, description="Error en la solicitud")
     * )
     */
    public function delete_product($id) {
        $product = Product::find($id);

        if ($product) {
            $product->delete();
            return response()->json(['message' => 'Product deleted successfully.']);
        }

        return response()->json(['message' => 'Product not found.'], 404);
    }

  /**
 * @OA\Post(
 *     path="/api/update_product/{id}",
 *     tags={"Products"},
 *     summary="Actualizar producto, posdata poner también _method put en POSTMAN",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         @OA\Schema(type="integer", description="ID del producto a actualizar")
 *     ),
 *     @OA\Parameter(
 *         name="_method",
 *         in="query",
 *         required=true,
 *         @OA\Schema(type="string", description="Método para la actualización, debe ser 'PUT'")
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"name", "description", "price", "category_id", "status", "stock", "is_featured"},
 *             @OA\Property(property="name", type="string", description="Nombre del producto"),
 *             @OA\Property(property="description", type="string", description="Descripción del producto"),
 *             @OA\Property(property="price", type="number", format="float", description="Precio del producto"),
 *             @OA\Property(property="category_id", type="integer", description="ID de la categoría"),
 *             @OA\Property(property="status", type="string", description="Estado del producto"),
 *             @OA\Property(property="stock", type="integer", description="Cantidad en stock"),
 *             @OA\Property(property="is_featured", type="boolean", description="¿Es un producto destacado?"),
 *             example={
 *                 "name": "Producto Actualizado",
 *                 "description": "Descripción actualizada del producto.",
 *                 "price": 79.99,
 *                 "category_id": 2,
 *                 "status": "available",
 *                 "stock": 50,
 *                 "is_featured": false
 *             }
 *         )
 *     ),
 *     @OA\Response(response=200, description="Producto actualizado exitosamente"),
 *     @OA\Response(response=404, description="Producto no encontrado"),
 *     @OA\Response(response=400, description="Los datos ingresados son incorrectos"),
 *     @OA\Response(response=422, description="Error de validación")
 * )
 */  

    public function update_product(Request $request, $id) {
        $this->validateProduct($request);
    
        $product = Product::find($id);
        
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        // Update only the allowed fields
        $product->update($request->all());
    
        return response()->json(['message' => 'Product updated successfully', 'product' => $product]);
    }

    private function validateProduct(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'price' => 'required|numeric',
            'category_id' => 'required|numeric',
            'status' => 'required|string',
            'stock' => 'required|numeric',
            'is_featured' => 'required|boolean',
        ]);
    }
}
