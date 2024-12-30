<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Exceptions\HttpResponseException;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        throw new HttpResponseException(response()->json([
            "status" => "error",
            "code" => 401,
            "message" => "Error en la operación.",
            "data" => [
                "message" => "Debe estar autenticado para acceder a este recurso."
            ]
        ], 401));
    }
}
