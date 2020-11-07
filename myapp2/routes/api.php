<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\JWTAuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
  return $request->user();
});

Route::group(['prefix' => 'auth'], function () {
  // Route::post('login', 'App\Http\Controllers\Api\Auth\JWTAuthController@login ')->name('jwt.login');
  Route::post('login', [JWTAuthController::class, 'login'])->name('jwt.login');
  Route::post('register', [JWTAuthController::class, 'register'])->name('jwt.register');
});

Route::post('/ttt', function (Request $request) {
  $all = $request->all();
  return response()->json(["api", $all]);
});
