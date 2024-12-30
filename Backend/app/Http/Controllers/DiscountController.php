<?php
namespace App\Http\Controllers;
use App\Models\Product;
use App\Models\Discount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * @OA\Tag(
 *     name="Discounts",
 *     description="Operaciones relacionadas con descuentos"
 * )
 */


class DiscountController extends Controller
{
     /**
     * @OA\Post(
     *     path="/products/{productId}/discounts",
     *     tags={"Discounts"},
     *     summary="Crear y asignar un descuento a un producto",
     *     @OA\Parameter(
     *         name="productId",
     *         in="path",
     *         description="ID del producto al que se asignará el descuento",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Discount")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Descuento creado y asignado al producto exitosamente",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string"),
     *             @OA\Property(property="discounted_price", type="number"),
     *             @OA\Property(property="discount", ref="#/components/schemas/Discount")
     *         )
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Acceso no autorizado",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error al agregar descuento",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string")
     *         )
     *     )
     * )
     */
    public function createAndAssignDiscount(Request $request, $productId)
    {

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'discount_type' => 'required|in:percentage,fixed',
            'value' => 'required|numeric',
            'description' => 'nullable|string',
        ]);
    
        $product = Product::findOrFail($productId);
    
        if ($product->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
    
        if ($product->discounts()->exists()) {
            return response()->json(['message' => 'Este producto ya tiene un descuento activo. Por favor, elimínalo antes de agregar uno nuevo.'], 400);
        }
    
        $discount = Discount::create($validatedData);
    
        if ($discount->discount_type === 'percentage') {
            $product->discounted_price = $product->price * (1 - ($discount->value / 100));
        } elseif ($discount->discount_type === 'fixed') {
            $product->discounted_price = max(0, $product->price - $discount->value);
        }
    
        $product->save();
    
        $product->discounts()->attach($discount->id);
    
        return response()->json([
            'message' => 'Discount created and assigned to product successfully',
            'discounted_price' => $product->discounted_price,
            'discount' => $discount
        ]);
    }
    
    /**
     * @OA\Delete(
     *     path="/products/{productId}/discounts",
     *     tags={"Discounts"},
     *     summary="Eliminar todos los descuentos de un producto",
     *     @OA\Parameter(
     *         name="productId",
     *         in="path",
     *         description="ID del producto del cual se eliminarán los descuentos",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Descuento removido exitosamente",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Acceso no autorizado",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string")
     *         )
     *     )
     * )
     */

    /**
     * @OA\Schema(
     *     schema="Discount",
     *     type="object",
     *     @OA\Property(property="name", type="string", description="Nombre del descuento"),
     *     @OA\Property(property="discount_type", type="string", description="Tipo de descuento (percentage, fixed)", enum={"percentage", "fixed"}),
     *     @OA\Property(property="value", type="number", description="Valor del descuento"),
     *     @OA\Property(property="description", type="string", description="Descripción opcional del descuento")
     * )
     */

    public function removeAllDiscountsFromProduct(Request $request, $productId)
    {
        $product = Product::findOrFail($productId);
        
        if ($product->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        
        $product->discounts()->detach();
        

        $product->discounted_price = null;
        $product->save();
        
        return response()->json([
            'message' => 'Descuento removido.'
        ]);
    }
    


}
