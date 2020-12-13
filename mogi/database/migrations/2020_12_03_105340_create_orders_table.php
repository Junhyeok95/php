<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateOrdersTable extends Migration
{
  public function up()
  {
    Schema::create('orders', function (Blueprint $table) {
      $table->bigIncrements('id'); // $table->id();

      /* 관리자 */
      $table->unsignedBigInteger('user_id')->index()->comment('관리자'); // $table->foreignId('user_id');

      /* customers */
      $table->string('name')->comment('구매자 이름');
      $table->string('email')->comment('연락용 이메일');
      $table->string('address')->nullable()->comment('주소');
      // $table->string('phone_number', 20)->nullable()->comment('전화번호');

      /* orders */
      $table->bigInteger('billable_amount')->nullable()->comment('주문금액'); // 合計金額
      $table->text('message')->nullable()->comment('주문메시지');
      $table->string('deposit_status')->default("入金待ち")->nullable()->comment('입금 상태'); // 入金状況
      $table->string('shipping_status')->default("未")->nullable()->comment('배송 상태'); // 発送状況
      $table->timestamps(); // 発注日

      /* order-product */
      // 수량

      $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
    });
  }

  public function down()
  {
    Schema::table('orders', function (Blueprint $table) {
      $table->dropForeign('orders_user_id_foreign');
    });

    Schema::dropIfExists('orders');
  }
}
