<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
  public function run()
  {
    if (config('databases.default') !== 'sqlite') {
      DB::statement('SET FOREIGN_KEY_CHECKS=0');
    }

    DB::table('users')->truncate();
    \App\Models\User::factory(1)->create();

    if (config('databases.default') !== 'sqlite') {
      DB::statement('SET FOREIGN_KEY_CHECKS=1');
    }
  }
}
