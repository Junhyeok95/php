<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\JWTAuth;


class JWTAuthController extends Controller
{
    // 로그인
    public function login(Request $request)
    {

        $credentials = $request(['email', 'password']);

        $token = null;

        if (!$token = JWTAuth::attemp($credentials)) {
            return response()->json([
                'status' => false,
                'message' => 'Unauthorized'
            ]);
        }
    }

    // 회원가입
    public function register(RegisterRequest $request)
    {
        $newUser = User::create($request->all());

        return $this->login($request);
    }
}
