<?php

namespace App\Http\Controllers;

use OpenApi\Annotations as OA;

/**
 * @OA\Info(
 *     title="Ecommerce de productos orgánicos",
 *     version="1.0.0",
 *     description="Documentación para la API de ecommerce de productos orgánicos",
 * )
 * 
 * @OA\Server(
 *     url="https://backend-raices.vercel.app/api/api",
 *     description="Servidor de producción"
 * )
 * @OA\Server(
 *     url="http://localhost:8000/api",
 *     description="Servidor local de desarrollo"
 * )
 * 
 * @OA\SecurityScheme(
 *     securityScheme="bearerAuth",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="JWT",
 *     description="Ingrese el token"
 * )
 */
class OpenApiDocumentation {}
