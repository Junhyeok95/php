# Laravel + React + JWT

## start

```
php artisan serve
rm ./public/images/upload/board/*
php artisan migrate:refresh --seed
```

### install

```

composer create-project --prefer-dist laravel/laravel ReactBoard
copy .env.example .env
php artisan key:generate
php artisan migrate

composer require laravel/ui
php artisan ui react --auth
npm install

npm i -S react-router-dom
npm i -S react-bootstrap bootstrap
npm i -S styled-components

npm i -S quill

php artisan make:model Board
php artisan make:migration create_boards_table --create=boards
php artisan make:controller BoardController --resource
php artisan route:list

php artisan make:model Comment
php artisan make:migration create_comments_table --create=comments
php artisan make:controller CommentController --resource

php artisan make:model Tag
php artisan make:migration create_tags_table --create=tags
php artisan make:controller TagController --resource

php artisan make:migration create_board_tag_table --create=board_tag

php artisan make:seeder UsersTableSeeder
php artisan db:seed --class=UsersTableSeeder 또는
DatabaseSeeder.php 의 $this->call(UsersTableSeeder::class);

composer dump-autoload
php artisan migrate:refresh --seed

php artisan make:factory BoardFactory --model=Board
php artisan make:seeder BoardsTableSeeder

composer require tymon/jwt-auth
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
php artisan jwt:secret

php artisan make:controller AuthController
php artisan make:request RegisterRequest
php artisan make:request BoardRequest

php artisan make:listener BoardEventListener --event=board.created
php artisan make:event BoardCreated
php artisan make:middleware JWT

php artisan make:listener UserEventListener
php artisan make:event UserCreated
php artisan event:generate

php artisan make:seeder CommentsTableSeeder
php artisan db:seed --class=CommentsTableSeeder
php artisan make:factory CommentFactory --model=Comment
php artisan make:request CommentRequest

php artisan make:model Attachment
php artisan make:migration create_attachments_table --create=attachments
```
