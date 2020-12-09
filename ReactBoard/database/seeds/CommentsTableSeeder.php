<?php

use Illuminate\Database\Seeder;

class CommentsTableSeeder extends Seeder
{
  public function run()
  {
    $boardsCount = count(\App\Board::all());
    factory(App\Comment::class, $boardsCount * 2)->create();
  }
}
