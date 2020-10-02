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

```
