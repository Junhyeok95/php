<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Order;

class DatabaseSeeder extends Seeder
{
  public function run()
  {
    if (config('databases.default') !== 'sqlite') {
      DB::statement('SET FOREIGN_KEY_CHECKS=0');
    }

    // 관리자
    DB::table('users')->truncate();
    \App\Models\User::factory(1)->create();

    // 제품
    DB::table('products')->truncate();
    $this->call(ProductsTableSeeder::class);

    // 주문
    DB::table('orders')->truncate();
    // seeder
    $statement = "ALTER TABLE orders AUTO_INCREMENT = 4;";
    DB::unprepared($statement);
    $this->call(OrderTableSeeder::class);

    // 주문_제품 sync
    DB::table('order_product')->truncate();
    $temp_uniform_kind = [1, 3, 4, 1, 2, 1, 1];
    $temp_uniform_quantity = [3, 4, 5, 10, 5, 2, 1];
    $temp_created_at = [
      "2020-10-31 09:00:00",
      "2020-11-03 10:30:00",
      "2020-11-04 11:00:00",
      "2020-11-05 12:30:00",
      "2020-11-06 13:00:00",
      "2020-11-07 14:30:00",
      "2020-11-08 00:00:00"
    ];
    $index = 0;
    $orders = Order::all();

    foreach ($orders as $order) {
      $order->products()->sync([$temp_uniform_kind[$index] => ['quantity' => $temp_uniform_quantity[$index], 'created_at' => $temp_created_at[$index]]]);
      $index++;
    }

    if (config('databases.default') !== 'sqlite') {
      DB::statement('SET FOREIGN_KEY_CHECKS=1');
    }
  }
}
