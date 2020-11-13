<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
  /**
   * A list of the exception types that are not reported.
   *
   * @var array
   */
  protected $dontReport = [
    //
  ];

  /**
   * A list of the inputs that are never flashed for validation exceptions.
   *
   * @var array
   */
  protected $dontFlash = [
    'password',
    'password_confirmation',
  ];

  /**
   * Register the exception handling callbacks for the application.
   *
   * @return void
   */
  public function register()
  {
    //
  }

  // public function render($request, Throwable $exception)
  // {
  //   if ($exception instanceof TokenExpiredException) {
  //     return response()->json(['error' => 'Token is expired'], Response::HTTP_UNAUTHORIZED);
  //     return response(['error' => 'Token is expired11'], Response::HTTP_UNAUTHORIZED);
  //   } else if ($exception instanceof TokenInvalidException) {
  //     return response(['error' => 'Token is invalid'], Response::HTTP_UNAUTHORIZED);
  //   } else if ($exception instanceof JWTException) {
  //     return response(['error' => 'Token is not provided'], Response::HTTP_UNAUTHORIZED);
  //   } else if ($exception instanceof TokenBlacklistedException) {
  //     return response(['error' => 'Token can not be used, get new one'], Response::HTTP_UNAUTHORIZED);
  //   }
  //   return parent::render($request, $exception);
  // }
}
