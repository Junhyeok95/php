## install
```
composer create-project --prefer-dist laravel/laravel [awsTest]
```

## make Tip
php artisan make:middleware CheckAge                          // 미들웨어                     app/Http/Middleware
php artisan make:controller ShowProfile --invokable           // 단일 동작 컨트롤러             app/Http/Controllers/
php artisan make:controller PhotoController --resource        // 리소스 컨트롤러                app/Http/Controllers/
php artisan make:controller API/PhotoController --api         // api용 컨트롤러               app/Http/Controllers/API/
php artisan make:model MyModel                                // 모델 생성                    app/
php artisan make:model MyModel2 --migration                   // 모델 옵션                    app/
php artisan make:migration create_posts_table --create=posts2 // 마이 명 , 생성 테이블 명         database/migrations/
php artisan make:migration create_posts_table3 --table=posts4 // 마이 명 , 사용 테이블 명         database/migrations/
php artisan make:seeder UsersTablesSeeder                     // 시더                         database/seeds/
    artisan db:seed --class=UsersTablesSeeder                 // 실행