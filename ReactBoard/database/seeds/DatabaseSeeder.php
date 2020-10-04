<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Model::unguard(), Model::reguard() -> ㄷㅐ량 할당 제약 사항을 풀었다가 잠금, 5.2이상은 자동으로 처리됨
        if (config('databases.default') !== 'sqlite') {
            DB::statement('SET FOREIGN_KEY_CHECKS=0');
        }

        // 외래키 무시 후 실행
        // App\User::truncate();
        // App\Board::truncate();

        DB::table('Users')->truncate();
        DB::table('boards')->truncate();

        // $this->call(UserSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(BoardsTableSeeder::class);

        if (config('databases.default') !== 'sqlite') {
            DB::statement('SET FOREIGN_KEY_CHECKS=1');
        }
    }
}
