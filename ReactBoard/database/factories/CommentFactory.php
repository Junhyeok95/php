<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Comment;
use Faker\Generator as Faker;

$factory->define(Comment::class, function (Faker $faker) {
  $userIds = \App\User::pluck('id')->toArray(); // 유저 전부
  $boardIds = \App\Board::pluck('id')->toArray(); // 보드 전부

  return [
    'content' => $faker->paragraph(),
    'board_id' => function () use ($faker, $boardIds) {
      return $faker->randomElement($boardIds);
    },
    'user_id' => function () use ($faker, $userIds) {
      return $faker->randomElement($userIds);
    },
  ];
});
