<?php

use Illuminate\Support\Facades\Route;

Auth::routes();

Route::get('/', function () {
    return view('app');
});

Route::get('/board', function () {
    return view('app');
});

Route::get('/login', function () {
    return view('app');
});

Route::get('/register', function () {
    return view('app');
});