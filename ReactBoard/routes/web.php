<?php

use Illuminate\Support\Facades\Route;
// 같은 URL을 2번 정의하면 아래 쪽에 정의한 라우트가 먼저 정의한 라우트를 오버라이드한다.

Route::view('/{path?}/{path2?}', 'app');

// vendor/laravel/ui/auth-backend
Auth::routes();
