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
Route::get('{slug}/boards', 'BoardController@index');

Route::get('mail', function () {
  $board = App\Board::with('user')->find(1);
  return Mail::send(
    'emails.boards.created',
    compact('board'),
    function ($message) use ($board) {
      $message->to('btryaalpha@gmail.com');
      $message->subject('게시판 등록 : ' . $board->user->name);
    }
  );
});
