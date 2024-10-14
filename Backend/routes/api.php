<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
            Route::delete('/{user}', 'destroy');
        });
    });
    
    Route::prefix('products')->group(function () {
        Route::controller(ProductController::class)->group(function () {
            Route::get('/', 'index');  
            Route::post('/', 'create'); 
            Route::put('/{id}', 'update');  
            Route::delete('/{id}', 'delete'); 
        });
    });
});
