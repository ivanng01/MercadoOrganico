<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ApiResponseMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        if ($response instanceof JsonResponse) {
            $data = $response->getData(true);
            $statusCode = $response->getStatusCode();

            $isSuccess = $statusCode < 400;
            $status = $isSuccess ? 'success' : 'error';
            $message = $isSuccess ? 'Operación exitosa.' : 'Error en la operación.';

            if (isset($data['current_page'])) {
                $formattedData = [
                    'status' => $status,
                    'code' => $statusCode,
                    'message' => $message,
                    'data' => $data['data'],
                    'meta' => [
                        'current_page' => $data['current_page'],
                        'last_page' => $data['last_page'],
                        'per_page' => $data['per_page'],
                        'total' => $data['total'],
                        'links' => $data['links'],
                    ],
                ];
            } else {
                $formattedData = [
                    'status' => $status,
                    'code' => $statusCode,
                    'message' => $message,
                    'data' => $data,
                ];
            }

            return response()->json($formattedData, $statusCode);
        }

        return $response;
    }
}
