<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ShoppingCartController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Rutas públicas

Route::controller(AuthenticationController::class)->group(function(){
    Route::post('/auth/register', 'createUser'); 
    Route::post('/auth/login', 'loginSession');  
});

// Rutas protegidas por autenticación

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthenticationController::class, 'logoutUser']);    
    
    Route::prefix('users')->group(function () {
        Route::controller(UserController::class)->group(function () {
            Route::get('/', 'index'); 
            Route::get('/profile', 'profile');
            Route::get('/{user}', 'show'); 
            Route::patch('/{user}', 'update');
            Route::patch('/{user}/type', 'changeType'); 
            Route::delete('/{user}', 'destroy');
        });
    });

    Route::prefix('categories')->middleware('auth:api')->group(function () {
        Route::get('/', [CategoryController::class, 'index']);
        Route::post('/', [CategoryController::class, 'create']); 
        Route::patch('/{id}', [CategoryController::class, 'update']); 
        Route::delete('/{id}', [CategoryController::class, 'delete']); 
    });
    
    Route::prefix('products')->middleware('auth:api')->group(function () {
        Route::controller(ProductController::class)->group(function () {
            Route::get('/', 'index');  
            Route::post('/', 'create'); 
            Route::put('/{id}', 'update');  
            Route::delete('/{id}', 'delete'); 
        });
    });


    Route::prefix('cart')->middleware('auth:api')->group(function () {
        Route::controller(ShoppingCartController::class)->group(function () {
        Route::post('/cart/add', [ShoppingCartController::class, 'addProduct']);
        Route::get('/cart', [ShoppingCartController::class, 'viewCart']);
        Route::post('/cart/update', [ShoppingCartController::class, 'updateProduct']);
        Route::delete('/cart/remove', [ShoppingCartController::class, 'removeProduct']);
        Route::post('/cart/checkout', [ShoppingCartController::class, 'checkout']);
        });
    });

});
