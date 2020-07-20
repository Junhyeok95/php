## Tip

CMD + Shift + P -> Format Document

## install

```
composer create-project --prefer-dist laravel/laravel [jwtTest]
php artisan key:generate
```

## middleware // https://jwt-auth.readthedocs.io/en/develop/ 학습

```
composer require tymon/jwt-auth
Tymon\JWTAuth\Providers\LaravelServiceProvider::class, // config/app.php의 providers추가
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
php artisan jwt:secret
php artisan migrate
php artisan make:controller JWTAuthController
```
