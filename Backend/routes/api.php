<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ShoppingCartController;
use App\Http\Controllers\RoleController;

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

// Rutas públicas
Route::controller(AuthenticationController::class)->group(function () {
    Route::post('/auth/register', 'createUser');
    Route::post('/auth/login', 'loginSession');
});

// Rutas públicas para productos
Route::controller(ProductController::class)->group(function () {
    Route::get('/products', 'index');
});

// Rutas públicas para categorías
Route::controller(CategoryController::class)->group(function () {
    Route::get('/categories', 'index');
});

// Rutas protegidas por autenticación
Route::middleware('auth:sanctum')->group(function () {
    // Rutas de autenticación
    Route::post('/auth/logout', [AuthenticationController::class, 'logoutUser']);

    // Rutas de usuarios
    Route::prefix('users')->group(function () {
        Route::controller(UserController::class)->group(function () {
            // Ruta de perfil sin restricción de roles
            Route::get('/profile', 'profile');

            // Rutas restringidas a roles 1 y 2
            Route::middleware('role:1,2')->group(function () {
                Route::get('/', 'index');
                Route::get('/{id}', 'show');
                Route::patch('/{id}', 'update');
                Route::delete('/{id}', 'destroy');
            });
        });
    });

// Rutas de categorías (solo administradores)
Route::prefix('categories')->controller(CategoryController::class)->group(function () {
    Route::middleware('role:1')->group(function () {
        Route::post('/', 'create'); 
        Route::patch('/{id}', 'update'); 
        Route::delete('/{id}', 'delete'); 
    });
});

    // Rutas de productos
    Route::prefix('products')->controller(ProductController::class)->group(function () {
        Route::middleware('role:1,2')->group(function () {
            Route::post('/', 'create');
            Route::patch('/{id}', 'update');
            Route::delete('/{id}', 'delete');

            // Solo Administradores
            Route::middleware('role:1')->group(function () {
                Route::get('/requests/waitlist', 'getProductsInWaitlist');
                Route::put('/requests/waitlist/{id}/approve', 'approveRequest');
                Route::put('/requests/waitlist/{id}/reject', 'rejectRequest');
            });
        });
    });

    // Rutas del carrito de compras
    Route::prefix('cart')->group(function () {
        Route::controller(ShoppingCartController::class)->group(function () {
            Route::post('/add', 'addProduct');
            Route::get('/', 'viewCart');
            Route::post('/update', 'updateProduct');
            Route::delete('/remove', 'removeProduct');
            Route::post('/checkout', 'checkout');
        });
    });

    // Rutas para roles, solo administradores tienen acceso
    Route::prefix('roles')->group(function () {
        Route::middleware('role:1')->controller(RoleController::class)->group(function () {
            Route::get('/', 'index');
            Route::post('/', 'store');
            Route::get('/{id}', 'show');
            Route::patch('/{id}', 'update');
            Route::delete('/{id}', 'destroy');
        });
    });
});
