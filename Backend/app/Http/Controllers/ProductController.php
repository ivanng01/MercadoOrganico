<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\ProductRequest;
use Cloudinary\Cloudinary;

/**
 * 
 * @OA\Tag(
 *     name="Products",
 *     description="Para todos los usuarios (Con restricciones)"
 * )
 *
 * @OA\Schema(
 *     schema="Product",
 *     type="object",
 *     @OA\Property(property="id", type="integer"),
 *     @OA\Property(property="name", type="string"),
 *     @OA\Property(property="description", type="string"),
 *     @OA\Property(property="price", type="number", format="float"),
 *     @OA\Property(property="category_id", type="integer"),
 *     @OA\Property(property="stock", type="integer"),
 *     @OA\Property(property="image", type="string"),
 *     @OA\Property(property="is_featured", type="boolean"),
 * )
 */


class ProductController extends Controller

{

    /**
     * @OA\Get(
     *     path="/products",
     *     tags={"Products"},
     *     summary="Obtener lista de productos con filtros opcionales y ordenamiento",
     *     @OA\Parameter(
     *         name="category_id",
     *         in="query",
     *         description="ID de la categoría",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="status",
     *         in="query",
     *         description="Estado del producto (available, unavailable, etc.)",
     *         required=false,
     *         @OA\Schema(
     *             type="string",
     *             enum={"available", "unavailable", "out of stock", "discontinued"},
     *             default="available"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="user_id",
     *         in="query",
     *         description="ID del usuario que creó el producto",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="is_featured",
     *         in="query",
     *         description="Filtrar productos destacados (1 para sí, 0 para no)",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="min_price",
     *         in="query",
     *         description="Precio mínimo del producto",
     *         required=false,
     *         @OA\Schema(type="number", format="float")
     *     ),
     *     @OA\Parameter(
     *         name="max_price",
     *         in="query",
     *         description="Precio máximo del producto",
     *         required=false,
     *         @OA\Schema(type="number", format="float")
     *     ),
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         description="Número de página para paginación",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="limit",
     *         in="query",
     *         description="Cantidad de productos por página",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="search",
     *         in="query",
     *         description="Palabra clave para buscar en el nombre o descripción del producto",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="sort",
     *         in="query",
     *         description="Ordenamiento de productos. Ejemplos: price_asc, price_desc, alpha_asc, alpha_desc",
     *         required=false,
     *         @OA\Schema(
     *             type="string",
     *             enum={"price_asc", "price_desc", "alpha_asc", "alpha_desc"}
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Lista de productos obtenida exitosamente",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Product")
     *         )
     *     ),
     *     @OA\Response(response=404, description="No se encontraron productos con los criterios.")
     * )
     */

    public function index(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'category_id' => 'nullable|integer',
                'status' => 'nullable|string',
                'user_id' => 'nullable|integer',
                'is_featured' => 'nullable|numeric',
                'min_price' => 'nullable|numeric|min:0',
                'max_price' => 'nullable|numeric|min:0',
                'limit' => 'nullable|integer|min:1|max:100',
                'page' => 'nullable|integer|min:1',
                'search' => 'nullable|string',
                'sort' => 'nullable|string|in:price_asc,price_desc,alpha_asc,alpha_desc',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $e->validator->errors(),
            ], 422);
        }

        $limit = $validatedData['limit'] ?? 15;
        $page = $validatedData['page'] ?? 1;
        $approvedRequestIds = ProductRequest::where('status', 'approved')->pluck('id');

        $query = Product::whereIn('request_id', $approvedRequestIds)
            ->when($validatedData['category_id'] ?? null, fn($q, $id) => $q->where('category_id', $id))
            ->when($validatedData['status'] ?? null, fn($q, $status) => $q->where('status', $status))
            ->when($validatedData['user_id'] ?? null, fn($q, $user) => $q->where('user_id', $user))
            ->when(array_key_exists('is_featured', $validatedData), fn($q) => $q->where('is_featured', $validatedData['is_featured']))
            ->when($validatedData['min_price'] ?? null, fn($q, $min) => $q->where('price', '>=', $min))
            ->when($validatedData['max_price'] ?? null, fn($q, $max) => $q->where('price', '<=', $max))
            ->when($validatedData['search'] ?? null, fn($q, $searchTerm) => $q->where(function ($q) use ($searchTerm) {
                $q->where('name', 'like', "%{$searchTerm}%")
                    ->orWhere('description', 'like', "%{$searchTerm}%");
            }))
            ->when($validatedData['sort'] ?? null, function ($q, $sort) {
                switch ($sort) {
                    case 'price_asc':
                        $q->orderBy('price', 'asc');
                        break;
                    case 'price_desc':
                        $q->orderBy('price', 'desc');
                        break;
                    case 'alpha_asc':
                        $q->orderBy('name', 'asc');
                        break;
                    case 'alpha_desc':
                        $q->orderBy('name', 'desc');
                        break;
                }
            });

        $products = $query->paginate($limit, ['*'], 'page', $page);

        $queryParams = http_build_query(array_filter($validatedData, function ($key) {
            return !in_array($key, ['page', 'limit']);
        }, ARRAY_FILTER_USE_KEY));

        $links = [
            'first' => $products->url(1) . '&limit=' . $limit . ($queryParams ? "&$queryParams" : ''),
            'last' => $products->url($products->lastPage()) . '&limit=' . $limit . ($queryParams ? "&$queryParams" : ''),
            'prev' => $products->previousPageUrl() ? $products->previousPageUrl() . '&limit=' . $limit . ($queryParams ? "&$queryParams" : '') : null,
            'next' => $products->nextPageUrl() ? $products->nextPageUrl() . '&limit=' . $limit . ($queryParams ? "&$queryParams" : '') : null,
        ];

        if ($products->isEmpty()) {
            return response()->json(['message' => 'No se encontraron productos con los criterios.'], 404);
        }

        return response()->json([
            'current_page' => $products->currentPage(),
            'last_page' => $products->lastPage(),
            'per_page' => $products->perPage(),
            'total' => $products->total(),
            'data' => $products->items(),
            'links' => $links,
        ], 200);
    }

    /**
     * @OA\Post(
     *     path="/products",
     *     tags={"Products"},
     *     summary="Crear producto",
     *     security={{"bearerAuth": {}}},
     *     @OA\RequestBody(
     *         required=true,
     *         description="Datos del producto a crear. Todos los campos son obligatorios.",
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 type="object",
     *                 required={"name", "description", "price", "category_id", "stock"},
     *                 @OA\Property(
     *                     property="name",
     *                     type="string",
     *                     example="Café Orgánico de Oaxaca x 500 gr"
     *                 ),
     *                 @OA\Property(
     *                     property="description",
     *                     type="string",
     *                     example="Café 100% orgánico cultivado en las montañas de Oaxaca, sin pesticidas ni fertilizantes sintéticos, garantizando un sabor auténtico y rico."
     *                 ),
     *                 @OA\Property(
     *                     property="price",
     *                     type="number",
     *                     format="float",
     *                     example=25.00
     *                 ),
     *                 @OA\Property(
     *                     property="category_id", 
     *                     type="integer", 
     *                     description="ID de la categoría del producto. Posibles valores: 1 (Huevos), 2 (Verduras), 3 (Lácteos y Sustitutos), 4 (Condimentos y Salsas), 5 (Carnes y Sustitutos), 6 (Miel y Edulcorantes), 7 (Bebidas), 8 (Productos de Panadería), 9 (Frutas), 10 (Granos y Legumbres).",
     *                     enum={1, 2, 3, 4, 5, 6, 7, 8, 9, 10},
     *                     example=10
     *                 ),
     *                 @OA\Property(
     *                     property="stock",
     *                     type="integer",
     *                     example=100
     *                 ),
     *                 @OA\Property(
     *                     property="is_featured",
     *                     type="numeric",
     *                     example=0,
     *                     description="Indica si el producto es destacado (0=false):(1=true)"
     *                 ),
     *                 @OA\Property(
     *                     property="image",
     *                     type="string",
     *                     format="binary",
     *                     description="Imagen del producto. Se debe enviar como un archivo."
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Producto creado exitosamente.",
     *         @OA\JsonContent(ref="#/components/schemas/Product")
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Los datos ingresados son incorrectos."
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Error de validación."
     *     )
     * )
     */

    public function create(Request $request)
    {
        try {
            $this->validateProduct($request);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => $e->validator->errors()], 422);
        }

        $user = $request->user();

        $productRequest = ProductRequest::create([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'user_id' => $user->id,
            'status' => 'pending',
        ]);

        $status = $request->input('stock') > 0 ? 'available' : 'unavailable';

        $imagePath = null;
        if ($request->hasFile('image')) {

            $cloudinary = new Cloudinary();
            $uploadedFile = $cloudinary->uploadApi()->upload($request->file('image')->getRealPath());
            $imagePath = $uploadedFile['secure_url'];
        }

        $product = Product::create([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'price' => $request->input('price'),
            'category_id' => $request->input('category_id'),
            'status' => $status,
            'stock' => $request->input('stock'),
            'is_featured' => $request->input('is_featured', false),
            'user_id' => $user->id,
            'request_id' => $productRequest->id,
            'image_path' => $imagePath,
        ]);

        return response()->json($product, 201);
    }

    /**
     * @OA\Get(
     *     path="/products/{id}",
     *     tags={"Products"},
     *     summary="Obtener un producto por su ID",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del producto a obtener",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Producto encontrado", 
     *         @OA\JsonContent(ref="#/components/schemas/Product")
     *     ),
     *     @OA\Response(response=404, description="Producto no encontrado")
     * )
     */

    public function show($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        return response()->json($product, 200);
    }

    /**
     * @OA\Post(
     *     path="/products/{id}",
     *     tags={"Products"},
     *     summary="Actualizar un producto existente por ID",
     *     description="Permite actualizar los datos de un producto. Solo se modificarán los campos proporcionados. Utiliza _method=PATCH en los parámetros de consulta para simular el método PATCH.",
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del producto a actualizar",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="_method",
     *         in="query",
     *         required=true,
     *         description="Método para simular el PATCH. Debe enviarse como un parámetro en la consulta.",
     *         @OA\Schema(type="string", example="PATCH")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         description="Datos del producto que se desea actualizar. Solo se actualizarán los campos enviados.",
     *         @OA\MediaType(
     *             mediaType="application/x-www-form-urlencoded",
     *             @OA\Schema(
     *                 type="object",
     *                 @OA\Property(property="name", type="string", description="Nombre del producto"),
     *                 @OA\Property(property="description", type="string", description="Descripción detallada del producto"),
     *                 @OA\Property(property="price", type="number", format="float", description="Precio del producto"),
     *                 @OA\Property(property="category_id", type="integer", description="ID de la categoría asociada"),
     *                 @OA\Property(property="is_featured", type="boolean", description="Indica si el producto es destacado"),
     *                 @OA\Property(
     *                     property="image",
     *                     type="string",
     *                     format="binary",
     *                     description="Archivo de imagen del producto en formato JPEG, PNG o WEBP"
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Producto actualizado exitosamente",
     *         @OA\JsonContent(ref="#/components/schemas/Product")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Producto no encontrado",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Producto no encontrado")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Los datos ingresados son incorrectos",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Error en la solicitud")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Error de validación",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="No se proporcionaron datos para actualizar.")
     *         )
     *     )
     * )
     */


    public function update(Request $request, $id)
    {
        $allowedFields = [
            'name',
            'description',
            'price',
            'category_id',
            'status',
            'is_featured',
            'image'
        ];

        $dataToUpdate = collect($request->only($allowedFields))->filter(function ($value) {
            return !is_null($value);
        });

        if ($dataToUpdate->isEmpty()) {
            return response()->json(['message' => 'No se proporcionaron datos para actualizar.'], 422);
        }

        try {
            $product = Product::findOrFail($id);

            if ($request->hasFile('image')) {
                $cloudinaryImage = $request->file('image')->storeOnCloudinary('products');
                $dataToUpdate['image_path'] = $cloudinaryImage->getSecurePath();
            }

            $product->update($dataToUpdate->toArray());
            $product->refresh();

            return response()->json([
                'message' => 'Producto actualizado exitosamente',
                'product' => $product
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al actualizar el producto',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    /**
     * @OA\Delete(
     *     path="/products/{id}",
     *     tags={"Products"},
     *     summary="Eliminar producto (Soft Delete)",
     *     description="Marca un producto como eliminado sin borrarlo permanentemente.",
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer", description="ID del producto a eliminar")
     *     ),
     *     @OA\Response(response=200, description="Producto eliminado exitosamente"),
     *     @OA\Response(response=404, description="Producto no encontrado"),
     *     @OA\Response(response=400, description="Error en la solicitud")
     * )
     */

    public function delete($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Producto no encontrado.'], 404);
        }

        $product->delete();

        return response()->json(['message' => 'Producto eliminado exitosamente.']);
    }

    /**
     * @OA\Put(
     *     path="/products/{id}/restore",
     *     tags={"Products"},
     *     summary="Restaurar producto eliminado",
     *     description="Restaura un producto que ha sido eliminado con Soft Delete.",
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer", description="ID del producto a restaurar")
     *     ),
     *     @OA\Response(response=200, description="Producto restaurado exitosamente"),
     *     @OA\Response(response=404, description="Producto no encontrado"),
     *     @OA\Response(response=400, description="Error en la solicitud")
     * )
     */

    public function restore($id)
    {
        $product = Product::withTrashed()->find($id);

        if (!$product) {
            return response()->json(['message' => 'Producto no encontrado.'], 404);
        }

        $product->restore();
        return response()->json(['message' => 'Producto restaurado exitosamente.']);
    }

    /**
     * @OA\Get(
     *     path="/products/requests/waitlist/",
     *     tags={"Products"},
     *     summary="Obtener los productos en lista de espera",
     *     description="Este endpoint permite a un administrador listar los productos en la lista de espera.",
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(response=201, description="Productos"),
     *     @OA\Response(response=403, description="No tiene permisos para acceder"),
     *     @OA\Response(response=422, description="Error")
     * )
     */

    public function getProductsInWaitlist()
    {
        $pendingRequests = ProductRequest::where('status', 'pending')->get();

        return response()->json(['requests' => $pendingRequests], 200);
    }

    /**
     * @OA\Put(
     *     path="/products/requests/waitlist/{id}/approve",
     *     tags={"Products"},
     *     summary="Aprobar un producto en la lista de espera, se proporciona el id del producto",
     *     description="Este endpoint permite a un administrador aprobar una solicitud de producto en la lista de espera.",
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de la solicitud de producto que se desea aprobar.",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Solicitud aprobada con éxito.",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Solicitud aprobada."),
     *             @OA\Property(
     *                 property="request",
     *                 ref="#/components/schemas/Product"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="No tiene permiso para acceder a esta acción."
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Solicitud no encontrada o ya procesada."
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Error en la solicitud."
     *     )
     * )
     */

    public function approveRequest($id, Request $request)
    {
        $authenticatedUser = $request->user();

        $requestToUpdate = ProductRequest::find($id);

        if (!$requestToUpdate || $requestToUpdate->status !== 'pending') {
            return response()->json(['message' => 'Solicitud no encontrada o ya procesada.'], 404);
        }

        $requestToUpdate->status = 'approved';
        $requestToUpdate->admin_id = $authenticatedUser->id;
        $requestToUpdate->save();

        return response()->json([
            'message' => 'Solicitud aprobada.',
            'request' => $requestToUpdate
        ], 200);
    }

    /**
     * @OA\Put(
     *     path="/products/requests/waitlist/{id}/reject",
     *     tags={"Products"},
     *     summary="Rechazar un producto en la lista de espera",
     *     description="Este endpoint permite a un administrador rechazar una solicitud de producto en la lista de espera.",
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de la solicitud de producto que se desea rechazar.",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Solicitud rechazada con éxito.",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Solicitud rechazada."),
     *             @OA\Property(
     *                 property="request",
     *                 ref="#/components/schemas/Product"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="No tiene permiso para acceder a esta acción."
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Solicitud no encontrada o ya procesada."
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Error en la solicitud."
     *     )
     * )
     */

    public function rejectRequest($id, Request $request)
    {
        $requestToUpdate = ProductRequest::find($id);

        if (!$requestToUpdate || $requestToUpdate->status !== 'pending') {
            return response()->json(['message' => 'Solicitud no encontrada o ya procesada.'], 404);
        }

        $requestToUpdate->status = 'rejected';
        $requestToUpdate->admin_id = $request->user()->id;
        $requestToUpdate->save();

        return response()->json([
            'message' => 'Solicitud rechazada.',
            'request' => $requestToUpdate
        ], 200);
    }


    private function validateProduct(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'price' => 'required|numeric',
            'category_id' => 'required|numeric',
            'stock' => 'required|numeric',
            'is_featured' => 'nullable|numeric',
            'image' => 'required|file|mimes:jpeg,png,jpg,webp|max:2048',
        ]);
    }
}