#

```
php artisan serve

```

## install

```
composer create-project --prefer-dist laravel/laravel mogi
copy .env.example .env
php artisan key:generate
composer require laravel/ui
php artisan ui react --auth

npm install
npm i -S react-router-dom react-bootstrap bootstrap styled-components

composer require tymon/jwt-auth
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
php artisan jwt:secret
php artisan make:middleware JWT
php artisan make:controller AuthController
php artisan make:request RegisterRequest

composer dump-autoload
php artisan migrate:refresh --seed

php artisan make:model Order
php artisan make:model Product
php artisan make:controller OrderController --resource
php artisan make:controller ProductController --resource

php artisan make:migration create_orders_table --create=orders
php artisan make:migration create_products_table --create=products
php artisan make:migration create_order_product_table --create=order_product

```
