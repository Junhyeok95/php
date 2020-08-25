###

```
composer create-project --prefer-dist laravel/laravel task-laravel
create database task_laravel;
php artisan migrate

php artisan make:test AuthControllerTest
php artisan make:controller AuthController
```

###

테스트 실행하는 법

1. 커맨드라인 -> vendor/bin/phpunit tests
2. 커맨드라인 -> vendor/bin/phpunit tests --filter [메소드 명]
3. IDE의 단축키를 활용
