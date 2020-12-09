<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  public function run()
  {
    // Model::unguard(), Model::reguard() -> ㄷㅐ량 할당 제약 사항을 풀었다가 잠금, 5.2이상은 자동으로 처리됨
    if (config('databases.default') !== 'sqlite') {
      DB::statement('SET FOREIGN_KEY_CHECKS=0');
    }

    DB::table('users')->truncate(); // Deletes
    DB::table('boards')->truncate();
    DB::table('comments')->truncate();

    $this->call(UsersTableSeeder::class);
    $this->call(BoardsTableSeeder::class);
    $this->call(CommentsTableSeeder::class);

    // ---------- 태그 ----------
    /* 태그 */
    App\Tag::truncate();
    DB::table('board_tag')->truncate();
    $tags = config('project.tags');

    foreach ($tags as $slug => $name) {
      App\Tag::create([
        'name' => $name,
        'slug' => Str::slug($slug)
      ]);
    }
    $this->command->info('태그 성공 : tags table');

    /* 변수 */
    $faker = app(Faker\Generator::class);
    $users = App\User::all();
    $boards = App\Board::all();
    $tags = App\Tag::all();

    /* 연결 */
    foreach ($boards as $board) {
      $board->tags()->sync(
        $faker->randomElements(
          $tags->pluck('id')->toArray(),
          rand(1, 3)
        )
      );
    }
    // ---------- 태그 ----------

    if (config('databases.default') !== 'sqlite') {
      DB::statement('SET FOREIGN_KEY_CHECKS=1');
    }
  }
}
