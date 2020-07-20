<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // Rest omitted for brevity

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];

        // jwt는 크게 헤더(header).내용(payload).서명(signature)으로 구성
        // iss(Issuer): 토큰 발급자
        // sub(Subject): 토큰 제목(기본값은 user id)
        // iat(Issued At): 토큰 발행일(unix timestamp)
        // exp(Expiry): 토큰의 만료시간
        // nbf(Not Before): 토큰을 사용할 수 있는 시작 시간
        // jti(JWT Id): JWT의 고유 식별자. 주로 중복적인 처리를 방지하기 위하여 사용.
        // prv: 사용자 공급자 클래스(User Provider class)의 해쉬값. 다중 guard를 사용하기 위해 tymondesigns/jwt-auth에 추가한 특별한 코드

    }
}
