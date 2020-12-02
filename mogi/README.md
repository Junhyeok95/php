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
```
