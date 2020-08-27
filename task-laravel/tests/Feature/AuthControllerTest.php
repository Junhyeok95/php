<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;
use App\User;

class AuthControllerTest extends TestCase
{
    // 1. 테스트가 끝나면 지워버린다는 의미,
    use RefreshDatabase, WithFaker;

    // 2. test를 앞에 붙이거나 /** @test */ 를 앞에 달아야한다... 아마..?

    private string $password = 'password'; // php 7.4? 부터 타입 적용 가능

    /** @test */
    public function a_user_can_be_registered()
    {
        // 에러 발생 시 헨들링
        $this->withoutExceptionHandling();
        $data = [
            'first_name' => $this->faker->firstName, // WithFaker인 faker로 단어를 생성
            'last_name' => $this->faker->lastName,
            'email' => $this->faker->email,
            'password' => $this->password,
            'password_confirmation' => $this->password
        ];

        $response = $this->post('/api/register', $data);

        $response->assertStatus(201)->assertJsonStructure(['user']);

        $this->assertDatabaseHas('users', [
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
        ]);
    }

    /** @test */
    public function a_user_can_log_in()
    {
        // 에러 발생 시 헨들링
        $this->withoutExceptionHandling();
        $this->artisan('passport:install');

        $user = factory(User::class)->create([
            'password' => Hash::make($this->password)
        ]);

        $response = $this->post('/api/login', [
            'email' => $user->email,
            'password' => $this->password
        ]);

        $response->assertStatus(Response::HTTP_OK)->assertJsonStructure([
            'token', 'user'
        ]);

        $this->assertSame(1, DB::table('oauth_access_tokens')->Count());
    }

    /** @test */
    public function a_user_can_log_out()
    {
        // 에러 발생 시 헨들링
        $this->withoutExceptionHandling();
        $this->artisan('passport:install');
        $user = factory(User::class)->create();

        $token = $user->createToken('Personal Access Token')->accessToken;
        $this->assertEquals(0, DB::table('oauth_access_tokens')->first()->revoked);

        // Bearer 뒤에 공백 필수다 ㅠㅠ
        $response = $this->post('/api/logout', [], ['Authorization' => 'Bearer ' . $token]);
        $response->assertStatus(Response::HTTP_OK)->assertJsonStructure([
            'message', 'user'
        ]);
        $this->assertEquals(1, DB::table('oauth_access_tokens')->first()->revoked);
    }
}
