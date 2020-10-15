<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\User;
use App\Board;

class BoardsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::all();

        // create() 와는 다르게 make 로 인스턴스 생성 후 save 함
        $users->each(function ($user) {
            for ($i = 0; $i < 10; $i++) {
                $user->boards()->save(
                    // 팩토리 활용
                    factory(Board::class)->make()
                );
            }
        });
    }
}
