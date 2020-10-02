<?php

use Illuminate\Support\Facades\Route;
// 같은 URL을 2번 정의하면 아래 쪽에 정의한 라우트가 먼저 정의한 라우트를 오버라이드한다.

Route::resource('boards', 'BoardController');

Route::get('/', function () {
    return view('app');
});
Route::get('/{path}', function () {
    return view('app');
});
Route::get('/{path}/{path2}', function () {
    return view('app');
});

// vendor/laravel/ui/auth-backend
Auth::routes();
