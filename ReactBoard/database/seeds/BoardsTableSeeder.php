<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\User;
use App\Board;
use Faker\Generator as Faker;

class BoardsTableSeeder extends Seeder
{
  public function run()
  {
    $users = User::all();

    // create() 와는 다르게 make 로 인스턴스 생성 후 save 함
    $users->each(function ($user) {
      for ($i = 0; $i < 1; $i++) {
        $user->boards()->save(
          // 팩토리 활용
          factory(Board::class)->make()
        );
      }
    });
    $users->each(function ($user) {
      for ($i = 0; $i < 1; $i++) {
        $user->boards()->save(
          // 팩토리 활용
          factory(Board::class)->make()
        );
      }
    });
    $users->each(function ($user) {
      for ($i = 0; $i < 1; $i++) {
        $user->boards()->save(
          // 팩토리 활용
          factory(Board::class)->make()
        );
      }
    });

    // 마지막 글
    DB::table('boards')->insert([
      'user_id' => 1,
      'title' => "게시판",
      'content' => "게시판 내용",
      'view' => "7",
      "created_at" =>  \Carbon\Carbon::now(),
      "updated_at" => \Carbon\Carbon::now(),
    ]);
  }
}
