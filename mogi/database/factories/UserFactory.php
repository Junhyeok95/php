<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
  protected $model = User::class;

  public function definition()
  {
    return [
      'name' => "冨田茜",
      'email' => "staff@kanda-it-school.com",
      'email_verified_at' => now(),
      'password' => 'password', // App\Models\User setPasswordAttribute
      'remember_token' => Str::random(10),
    ];
  }
}
