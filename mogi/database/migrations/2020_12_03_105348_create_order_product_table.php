<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderProductTable extends Migration
{
  public function up()
  {
    Schema::create('order_product', function (Blueprint $table) {
      // $table->bigIncrements('id'); // $table->id();

      /* 다대다 */
      $table->unsignedBigInteger('order_id')->index()->comment('주문 ID');
      $table->unsignedBigInteger('product_id')->index()->comment('상품 ID');
      $table->unsignedBigInteger('quantity')->default(1)->comment('상품 수량');
      $table->timestamps();

      $table->foreign('order_id')->references('id')->on('orders'); // ->onDelete('cascade');
      $table->foreign('product_id')->references('id')->on('products'); // ->onDelete('cascade');
    });
  }

  public function down()
  {
    Schema::table('order_product', function (Blueprint $table) {
      // 테이블 명 + 제약조건 명 + foreign
      $table->dropForeign('order_product_order_id_foreign');
      $table->dropForeign('order_product_product_id_foreign');
    });

    Schema::dropIfExists('order_product');
  }
}
