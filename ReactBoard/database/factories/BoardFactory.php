<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Board;
use Faker\Generator as Faker;

$factory->define(Board::class, function (Faker $faker) {
  // $date = $faker->dateTimeThisMonth;
  $date = Carbon\Carbon::now();
  return [
    // https://github.com/fzaninotto/Faker 참고
    'title' => $faker->sentence(),
    'content' => $faker->paragraph(),
    'created_at' => $date,
    'updated_at' => $date,
  ];
});
