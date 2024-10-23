<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\ShoppingCart;
use App\Models\Order;
use App\Models\OrderItem;

/**
 * @OA\Schema(
 *     schema="CartItem",
 *     type="object",
 *     @OA\Property(property="product_id", type="integer", description="ID del producto"),
 *     @OA\Property(property="quantity", type="integer", description="Cantidad del producto en el carrito"),
 *     @OA\Property(property="product", type="object", description="Detalles del producto",
 *         @OA\Property(property="id", type="integer", description="ID del producto"),
 *         @OA\Property(property="name", type="string", description="Nombre del producto"),
 *         @OA\Property(property="price", type="number", format="float", description="Precio del producto"),
 *     )
 * )
 */

class ShoppingCartController extends Controller
{
    
    /**
     * @OA\Post(
     *     path="/cart/products",
     *     tags={"Cart"},
     *     summary="Agregar un producto al carrito",
     *     security={{"bearerAuth": {}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"product_id", "quantity"},
     *             @OA\Property(property="product_id", type="integer", description="ID del producto"),
     *             @OA\Property(property="quantity", type="integer", description="Cantidad del producto")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Producto añadido al carrito",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", description="Mensaje de éxito")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Stock insuficiente",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", description="Mensaje de error")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Producto no encontrado",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", description="Mensaje de error")
     *         )
     *     )
     * )
     */

    public function addProduct(Request $request)
    {
    $request->validate([
        'product_id' => 'required|exists:products,id',
        'quantity' => 'required|integer|min:1'
    ]);

    $productId = $request->product_id;
    $quantity = $request->quantity;
    $userId = auth()->id();

    $product = Product::find($productId);

    if ($product->stock < $quantity) {
        return response()->json(['message' => 'Stock insuficiente para este producto'], 400);
    }

    $cartItem = ShoppingCart::where('user_id', $userId)->where('product_id', $productId)->first();

    if ($cartItem) {
        $newQuantity = $cartItem->quantity + $quantity;

        if ($product->stock < $newQuantity) {
            return response()->json(['message' => 'No hay suficiente stock para esta cantidad'], 400);
        }

        $cartItem->quantity = $newQuantity;
        $cartItem->save();
    } else {
        ShoppingCart::create([
            'user_id' => $userId,
            'product_id' => $productId,
            'quantity' => $quantity,
        ]);
    }

    return response()->json(['message' => 'Producto añadido al carrito']);
    }

    /**
     * @OA\Get(
     *     path="/cart",
     *     tags={"Cart"},
     *     summary="Ver productos en el carrito",
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de productos en el carrito",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="cartItems", type="array", 
     *                 @OA\Items(ref="#/components/schemas/CartItem")),
     *             @OA\Property(property="totalPrice", type="number", format="float", description="Precio total del carrito")
     *         )
     *     )
     * )
     */
    public function viewCart()
    {
        $userId = auth()->id();
        $cartItems = ShoppingCart::with('product')
                        ->where('user_id', $userId)
                        ->get();

        $totalPrice = $cartItems->sum(function ($item) {
            return $item->product->price * $item->quantity;
        });

        return response()->json(['cartItems' => $cartItems, 'totalPrice' => $totalPrice]);
    }

    /**
     * @OA\Patch(
     *     path="/cart/products",
     *     tags={"Cart"},
     *     summary="Actualizar cantidad de un producto en el carrito",
     *     security={{"bearerAuth": {}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"product_id", "quantity"},
     *             @OA\Property(property="product_id", type="integer", description="ID del producto"),
     *             @OA\Property(property="quantity", type="integer", description="Nueva cantidad del producto")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Cantidad actualizada",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", description="Mensaje de éxito")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Producto no encontrado en el carrito",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", description="Mensaje de error")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Stock insuficiente",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", description="Mensaje de error")
     *         )
     *     )
     * )
     */

    public function updateProduct(Request $request)
    {
    $request->validate([
        'product_id' => 'required|exists:products,id',
        'quantity' => 'required|integer|min:1'
    ]);

    $userId = auth()->id();
    $productId = $request->product_id;
    $quantity = $request->quantity;

    $cartItem = ShoppingCart::where('user_id', $userId)->where('product_id', $productId)->first();
    $product = Product::find($productId);

    if (!$cartItem) {
        return response()->json(['message' => 'Producto no encontrado en el carrito'], 404);
    }

    if ($product->stock < $quantity) {
        return response()->json(['message' => 'Stock insuficiente para esta cantidad'], 400);
    }

    $cartItem->quantity = $quantity;
    $cartItem->save();

    return response()->json(['message' => 'Cantidad actualizada']);
    }

    /**
     * @OA\Delete(
     *     path="/cart/products",
     *     tags={"Cart"},
     *     summary="Eliminar un producto del carrito",
     *     security={{"bearerAuth": {}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"product_id"},
     *             @OA\Property(property="product_id", type="integer", description="ID del producto a eliminar")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Producto eliminado del carrito",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", description="Mensaje de éxito")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Producto no encontrado en el carrito",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", description="Mensaje de error")
     *         )
     *     )
     * )
     */
    public function removeProduct(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id'
        ]);

        $userId = auth()->id();
        $cartItem = ShoppingCart::where('user_id', $userId)->where('product_id', $request->product_id)->first();

        if ($cartItem) {
            $cartItem->delete();
            return response()->json(['message' => 'Producto eliminado del carrito']);
        }

        return response()->json(['message' => 'Producto no encontrado en el carrito'], 404);
    }


    /**
 * @OA\Post(
 *     path="/cart/checkout",
 *     tags={"Cart"},
 *     summary="Confirmar compra y crear un pedido",
 *     security={{"bearerAuth": {}}},
 *     @OA\Response(
 *         response=200,
 *         description="Pedido realizado exitosamente",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", description="Mensaje de éxito")
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Carrito vacío o stock insuficiente",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", description="Mensaje de error")
 *         )
 *     )
 * )
 */
    public function checkout()
    {
    $userId = auth()->id();
    $cartItems = ShoppingCart::where('user_id', $userId)->get();

    if ($cartItems->isEmpty()) {
        return response()->json(['message' => 'El carrito está vacío'], 400);
    }

    foreach ($cartItems as $cartItem) {
        if ($cartItem->product->stock < $cartItem->quantity) {
            return response()->json(['message' => 'Stock insuficiente para el producto ' . $cartItem->product->name], 400);
        }
    }
        $order = Order::create([
        'user_id' => $userId,
        'order_date' => now(),
        'total_amount' => $cartItems->sum(function ($item) {
            return $item->product->price * $item->quantity;
        }),
        'payment_method' => 'Pendiente',
        'shipping_status' => 'pending'
    ]);

    foreach ($cartItems as $cartItem) {
        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $cartItem->product_id,
            'quantity' => $cartItem->quantity,
            'price' => $cartItem->product->price
        ]);

        $product = $cartItem->product;
        $product->stock -= $cartItem->quantity;
        $product->save();

        $cartItem->delete();
    }

    return response()->json(['message' => 'Pedido realizado exitosamente']);
    }
}
