# README del Backend
> [!TIP]
> Iniciar el backend en modo desarrollo.

## Instalación y Ejecución

Para instalar y ejecutar:

1. Clona el repositorio.
2. Navega al directorio del proyecto:
   ```bash
   cd Backend
   ```
3. Instala las dependencias.
   ```bash
   composer install
   ```
 
4. Copia el archivo .env.example a .env y configura las variables de entorno.

5. Ejecuta php artisan key:generate para generar la clave de la aplicación.
   ```bash
   php artisan key:generate
   ```

6. Ejecuta php artisan migrate para aplicar las migraciones de la base de datos.
   ```bash
   php artisan migrate
   ```

7. Inicia el servidor:
   ```bash
   php artisan serve
   ```
8. Accede a la API en http://localhost:8000