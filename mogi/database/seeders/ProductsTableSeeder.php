<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductsTableSeeder extends Seeder
{
  public function run()
  {
    DB::table('products')->insert([
      'name' => "ユニフォーム A",
      'price' => '300',
      'stock' => '30',
    ]);

    DB::table('products')->insert([
      'name' => "ユニフォーム B",
      'price' => '400',
      'stock' => '30',
    ]);

    DB::table('products')->insert([
      'name' => "ユニフォーム C",
      'price' => '500',
      'stock' => '30',
    ]);

    DB::table('products')->insert([
      'name' => "ユニフォーム D",
      'price' => '600',
      'stock' => '30',
    ]);

    DB::table('products')->insert([
      'name' => "ユニフォーム E",
      'price' => '700',
      'stock' => '30',
    ]);
  }
}
