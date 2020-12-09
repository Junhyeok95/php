<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBoardsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('boards', function (Blueprint $table) {
      $table->bigIncrements('id'); // Alias of $table->bigIncrements('id')
      $table->foreignId('user_id')->index(); // Alias of $table->unsignedBigInteger('user_id')
      $table->string('title');
      $table->text('content');
      $table->unsignedBigInteger('view')->nullable()->default(0)->comment('조회수');;
      $table->timestamps();

      $table->foreign('user_id')->references('id')->on('users')->onUpdete('cascade')->onDelete('cascade');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('boards');
  }
}
