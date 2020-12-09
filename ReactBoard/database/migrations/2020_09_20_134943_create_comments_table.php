<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommentsTable extends Migration
{
  public function up()
  {
    Schema::create('comments', function (Blueprint $table) {
      $table->id();
      $table->foreignId('user_id')->index();
      $table->foreignId('board_id');
      $table->text('content');
      $table->timestamps();

      // $table->foreign('user_id')->references('id')->on('users');
      // $table->foreign('board_id')->references('id')->on('users');
    });
  }

  public function down()
  {
    // Schema::table('comments', function (Blueprint $table) {
    //   $table->dropForeign('comments_user_id_foreign');
    //   $table->dropForeign('comments_board_id_foreign');
    // });

    Schema::dropIfExists('comments');
  }
}
