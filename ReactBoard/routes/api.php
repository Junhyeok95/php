<?php

use Illuminate\Support\Facades\Route;

Route::group([
  'middleware' => 'api',
  'prefix' => 'auth'
], function () {
  Route::post('login', 'AuthController@login')->name('jwt.login');;
  Route::post('register', 'AuthController@register')->name('jwt.register');
  Route::post('logout', 'AuthController@logout')->name('jwt.logout');;
  Route::post('refresh', 'AuthController@refresh')->name('jwt.refresh');;
  Route::post('me', 'AuthController@me')->name('jwt.me');;
});

Route::resource('boards', 'BoardController');
Route::get('/{slug}/boards', 'BoardController@index');
