<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderTableSeeder extends Seeder
{
  public function run()
  {
    DB::table('orders')->insert([
      'user_id' => "1",
      'name' => "神田　三郎",
      'email' => "神田三郎@gmail.com",
      'address' => "東京都千代田区神田紺屋町",
      'billable_amount' => 900,
      'message' => "失礼ですが、お名前がなんとお読みすればよろしいのでしょうか。",
      'deposit_status' => "入金済", // 入金済, 入金待ち
      'shipping_status' => "発送済", // 発送済, 発送準備中, 未
      'created_at' => "2020-10-31 09:00:00",
      'updated_at' => "2020-10-31 09:00:00",
      // 'created_at' => \Carbon\Carbon::now()->subYear(1)->addMonth(1),
    ]);

    DB::table('orders')->insert([
      'user_id' => "1",
      'name' => "田中　三郎",
      'email' => "田中三郎@gmail.com",
      'address' => "東京都千代田区神田紺屋町",
      'billable_amount' => 2000,
      'message' => "そうしていただけると助かります。",
      'deposit_status' => "入金済", // 入金済, 入金待ち
      'shipping_status' => "発送済", // 発送済, 発送準備中, 未
      'created_at' => "2020-11-03 10:30:00",
      'updated_at' => "2020-11-03 10:30:00",
      // 'created_at' => \Carbon\Carbon::now()->subYear(1)->addMonth(1),
    ]);

    DB::table('orders')->insert([
      'user_id' => "1",
      'name' => "山田　次郎",
      'email' => "山田次郎@gmail.com",
      'address' => "東京都千代田区神田紺屋町",
      'billable_amount' => 3000,
      'message' => "お取次ぎいたしますので、少々お待ちいただけますか。",
      'deposit_status' => "入金済", // 入金済, 入金待ち
      'shipping_status' => "発送準備中", // 発送済, 発送準備中, 未
      'created_at' => "2020-11-04 11:00:00",
      'updated_at' => "2020-11-04 11:00:00",
      // 'created_at' => \Carbon\Carbon::now()->subYear(1)->addMonth(1),
    ]);

    DB::table('orders')->insert([
      'user_id' => "1",
      'name' => "神田　花子",
      'email' => "神田花子@gmail.com",
      'address' => "東京都千代田区神田紺屋町",
      'billable_amount' => 3000,
      'message' => "お気遣いは無用に願います。",
      'deposit_status' => "入金済", // 入金済, 入金待ち
      'shipping_status' => "発送準備中", // 発送済, 発送準備中, 未
      'created_at' => "2020-11-05 12:30:00",
      'updated_at' => "2020-11-05 12:30:00",
      // 'created_at' => \Carbon\Carbon::now()->subYear(1)->addMonth(1),
    ]);

    DB::table('orders')->insert([
      'user_id' => "1",
      'name' => "山田　花子",
      'email' => "神田三郎@gmail.com",
      'address' => "東京都千代田区神田紺屋町",
      'billable_amount' => 2000,
      'message' => "本日は時間を割りテ頂きまして、ありがとうございました。",
      'deposit_status' => "入金待ち", // 入金済, 入金待ち
      'shipping_status' => "未", // 発送済, 発送準備中, 未
      'created_at' => "2020-11-06 13:00:00",
      'updated_at' => "2020-11-06 13:00:00",
      // 'created_at' => \Carbon\Carbon::now()->subYear(1)->addMonth(1),
    ]);

    DB::table('orders')->insert([
      'user_id' => "1",
      'name' => "神田　一郎",
      'email' => "神田三郎@gmail.com",
      'address' => "東京都千代田区神田紺屋町",
      'billable_amount' => 600,
      'message' => "無理を承知の上で、そこを何とかお願いいたします。",
      'deposit_status' => "入金待ち", // 入金済, 入金待ち
      'shipping_status' => "未", // 発送済, 発送準備中, 未
      'created_at' => "2020-11-07 14:30:00",
      'updated_at' => "2020-11-07 14:30:00",
      // 'created_at' => \Carbon\Carbon::now()->subYear(1)->addMonth(1),
    ]);

    DB::table('orders')->insert([
      'user_id' => "1",
      'name' => "田中　太郎",
      'email' => "神田三郎@gmail.com",
      'address' => "東京都千代田区神田紺屋町",
      'billable_amount' => 300,
      'message' => "一両日中には良いお返事が差し上げられるのではないかと思っております。",
      'deposit_status' => "入金待ち", // 入金済, 入金待ち
      'shipping_status' => "未", // 発送済, 発送準備中, 未
      'created_at' => "2020-11-08 00:00:00",
      'updated_at' => "2020-11-08 00:00:00",
      // 'created_at' => \Carbon\Carbon::now()->subYear(1)->addMonth(1),
    ]);
  }
}
