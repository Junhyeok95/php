<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBoardTagTable extends Migration
{
  public function up()
  {
    // 다대다 관례 -> 두 테이블 이름을 단수로 변경하고 알파벳 순으로 연결한다 ...
    // 외래 키의 열 이름은 모델_이름_id로 사용한다
    Schema::create('board_tag', function (Blueprint $table) {
      $table->bigIncrements('id'); // Alias of $table->bigIncrements('id')
      $table->unsignedBigInteger('board_id');
      $table->unsignedBigInteger('tag_id');

      $table->foreign('board_id')->references('id')->on('boards')->onDelete('cascade');
      $table->foreign('tag_id')->references('id')->on('tags')->onDelete('cascade');
    });
  }

  public function down()
  {
    Schema::dropIfExists('board_tag');
  }
}
