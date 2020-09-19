<?php

use Illuminate\Support\Facades\Route;

Auth::routes();

Route::get('/', function () {
    return view('app');
});

Route::get('/login', function () {
    return view('app');
});

Route::get('/register', function () {
    return view('app');
});

Route::resource('boards', 'BoardController');