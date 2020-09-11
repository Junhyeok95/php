<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('app');
});

Route::get('/board', function () {
    return view('app');
});

Auth::routes();