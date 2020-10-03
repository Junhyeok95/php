<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // App\User::create([
        //     'name' => sprintf('%s %s', Str::random(3), Str::random(4)),
        //     'email' => Str::random(10) . '@mail.com',
        //     'password' => bcrypt('password'),
        // ]);

        // DB::table('users')->insert([
        //     'name' => Str::random(10),
        //     'email' => Str::random(10).'@gmail.com',
        //     'password' => Hash::make('password'),
        // ]);

        DB::table('users')->insert([
            'name' => "T E S T",
            'email' => 'test@mail.com',
            'password' => Hash::make('password'),
        ]);

        // -----------------------------------------------------------

        // 모든 유저 제거
        // App\User::truncate();
        // DB::table('uses')->truncate();

        // 모델 팩토리 활용
        factory(App\User::class, 14)->create();
    }
}
