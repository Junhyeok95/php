<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;
use App\User;

class AuthControllerTest extends TestCase
{
    // 1. 테스트가 끝나면 지워버린다는 의미,
    use RefreshDatabase, WithFaker;

    // 2. test를 앞에 붙이거나 /** @test */ 를 앞에 달아야한다... 아마..?

    /** @test */
    public function a_user_can_be_registered()
    {
        // 에러 발생 시 헨들링
        $this->withoutExceptionHandling();
        $data = [
            'first_name' => $this->faker->firstName, // WithFaker인 faker로 단어를 생성
            'last_name' => $this->faker->lastName,
            'email' => $this->faker->email,
            'password' => 'password',
            'password_confirmation' => 'password'
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
        $this->artisan('passport:install');

        $password = 'password';

        $user = factory(User::class)->create([
            'password' => Hash::make($password)
        ]);

        $response = $this->post('/api/login', [
            'email' => $user->email,
            'password' => $password
        ]);

        $response->assertStatus(Response::HTTP_OK)
            ->assertJsonStructure([
                'token', 'user'
            ]);
    }
}
