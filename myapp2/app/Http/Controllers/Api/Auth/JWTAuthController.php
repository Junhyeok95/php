<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Api\BaseApiController;
// use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\JWTAuth;
use Symfony\component\HttpFoundation\Response;


class JWTAuthController extends BaseApiController // extends
{
    // https://jwt-auth.readthedocs.io/en/develop/auth-guard/
    public function __construct()
    {
        parent::__construct(); // 부모 생성자 호출
    }

    // 로그인
    public function login(Request $request)
    {
        $credentials = $request(['email', 'password']);

        $token = auth()->attempt($credentials);

        if (!$token = JWTAuth::attemp($credentials)) {
            return response()->json([
                'status' => false,
                'message' => 'Unauthorized'
            ], RESPONSE::HTTP_UNAUTHORIZED);
        }
    }

    // 회원가입
    public function register(RegisterRequest $request)
    {
        $newUser = User::create($request->all());

        return $this->login($request);
    }
}
