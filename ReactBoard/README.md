###

```
php artisan serve

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
php artisan make:model Photo
php artisan make:migration create_board_table
php artisan make:migration create_photos_table --create=photos

php artisan make:controller BoardController --resource
```
