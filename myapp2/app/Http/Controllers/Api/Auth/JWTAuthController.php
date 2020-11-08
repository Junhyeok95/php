<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Api\BaseApiController;
// use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Symfony\component\HttpFoundation\Response;


class JWTAuthController extends BaseApiController // extends
{
  public function __construct()
  {
    parent::__construct(); // 부모 생성자 호출
    // $this->middleware('auth:api', ['except' => ['login']]);
  }

  // 로그인
  public function login()
  {
    $credentials = request(['email', 'password']);

    if (!$token = auth()->attempt($credentials)) {
      return response()->json([
        'status' => false,
        'message' => 'Unauthorized'
      ], RESPONSE::HTTP_UNAUTHORIZED);
    } else {
      return response()->json([
        'access_token' => $token,
        'token_type' => 'bearer',
        'expires_in' => auth()->factory()->getTTL() * 60
      ]);
    }
  }

  // 회원가입
  public function register(RegisterRequest $request) // Http->Requests
  {
    $newUser = User::create($request->all());
    // dd($newUser);

    return $this->login($request);
  }
}
