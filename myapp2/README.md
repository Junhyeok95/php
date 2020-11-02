## laravel 8 + react + jwt

> 검색 키워드 : 추가, 임시, 변경, 설명

---

```
composer install
cp .env.example .env
php artisan key:generate

composer require laravel/ui
php artisan ui react --auth

composer require tymon/jwt-auth
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
echo "\nJWT_TTL=60" >> .env
php artisan jwt:secret

php artisan make:controller Api/Auth/JWTAuthController
php artisan make:request RegisterRequest
php artisan make:controller Api/BaseApiController.php
```
