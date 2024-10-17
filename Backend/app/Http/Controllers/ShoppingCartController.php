<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\ShoppingCart;
use App\Models\Order;
use App\Models\OrderItem;

class ShoppingCartController extends Controller
{
    // Agrego producto al carrito
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

    // Verifico si el producto ya está en el carrito
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

    //Veo productos en el carrito
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

    //Actualizo cantidad de un producto en el carrito
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

    // Elimino producto del carrito
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

    // Confirmo compra y creo pedido
    public function checkout()
    {
    $userId = auth()->id();
    $cartItems = ShoppingCart::where('user_id', $userId)->get();

    if ($cartItems->isEmpty()) {
        return response()->json(['message' => 'El carrito está vacío'], 400);
    }

    //Valido si hay suficiente stock para cada producto en el carrito
    foreach ($cartItems as $cartItem) {
        if ($cartItem->product->stock < $cartItem->quantity) {
            return response()->json(['message' => 'Stock insuficiente para el producto ' . $cartItem->product->name], 400);
        }
    }

    //Creo el pedido
    $order = Order::create([
        'user_id' => $userId,
        'order_date' => now(),
        'total_amount' => $cartItems->sum(function ($item) {
            return $item->product->price * $item->quantity;
        }),
        'payment_method' => 'Pendiente',
        'shipping_status' => 'pending'
    ]);

    //Proceso cada producto en el carrito
    foreach ($cartItems as $cartItem) {
        //Creo items de pedido
        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $cartItem->product_id,
            'quantity' => $cartItem->quantity,
            'price' => $cartItem->product->price
        ]);

        //Decremento el stock del producto
        $product = $cartItem->product;
        $product->stock -= $cartItem->quantity;
        $product->save();

        //Elimino del carrito después de agregar al pedido
        $cartItem->delete();
    }

    return response()->json(['message' => 'Pedido realizado exitosamente']);
    }

}
