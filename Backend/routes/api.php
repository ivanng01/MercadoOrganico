<?php

use App\Http\Controllers\LoginController;
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

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/log_out', [LoginController::class, 'logout_user']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});