# start

```
php artisan serve
```

# create

```
composer create-project --prefer-dist laravel/laravel laravelVueTest
```

# init

```
composer require laravel/ui --dev // 이전에는 preset 으로 사용했음
php artisan ui vue
npm install
npm install --global cross-env
npm run dev
```

# auth // php intelephense -> off

```
php artisan ui vue --auth
npm install webpack --save
php artisan migrate
npm run dev
npm run watch // js update
```

## 하 ..

```
composer require laravel-frontend-presets/tailwindcss --dev
php artisan ui tailwindcss --auth
npm install && npm run dev
```

## ing ~~

```
php artisan make:model Message -c -m
php artisan migrate:refresh
```

## pusher

```
composer require pusher/pusher-php-server "~4.0"
npm install --save laravel-echo pusher-js
.env
  BROADCAST_DRIVER=pusher
  PUSHER_APP_ID
  PUSHER_APP_KEY
  PUSHER_APP_SECRET
  PUSHER_APP_CLUSTER
php artisan config:clear
php artisan make:event MessageSent
```

## vue-chat-scroll

```
npm i vue-chat-scroll
```
