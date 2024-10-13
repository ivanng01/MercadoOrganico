<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProductsController;
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

Route::controller(LoginController::class)->group(function(){
    Route::post('/login_user', 'login_session');
    Route::post('/create_user', 'create_user');
});

Route::controller(ProductsController::class)->group(function(){
    Route::post('/create_product', 'create_product');
    Route::delete('/delete_product/{id}', 'delete_product');
    Route::put('/update_product/{id}', 'update_product');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/log_out', [LoginController::class, 'logout_user']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});