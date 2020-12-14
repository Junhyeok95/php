<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
  public function up()
  {
    Schema::create('products', function (Blueprint $table) {
      $table->bigIncrements('id'); // $table->id();

      /* products */
      $table->string('name')->unique()->comment('상품명');
      $table->integer('price')->default(0)->comment('상품 가격');
      $table->integer('stock')->default(0)->comment('재고 수량');

      $table->string('url')->comment('이미지');

      $table->timestamps();
    });
  }

  public function down()
  {
    Schema::dropIfExists('products');
  }
}
