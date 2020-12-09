<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
  public function run()
  {
    DB::table('users')->insert([
      'name' => "Junheyok",
      'email' => 'Junheyok@mail.com',
      'password' => Hash::make('password'),
    ]);

    // -----------------------------------------------------------
    // 모델 팩토리 활용
    factory(App\User::class, 49)->create();
  }
}
