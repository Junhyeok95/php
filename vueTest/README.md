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
