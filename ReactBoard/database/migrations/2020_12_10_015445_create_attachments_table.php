<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAttachmentsTable extends Migration
{
  public function up()
  {
    Schema::create('attachments', function (Blueprint $table) {
      $table->bigIncrements('id');
      $table->foreignId('board_id')->nullable()->index();
      $table->string('filename');
      $table->string('url');

      $table->integer('bytes')->nullable()->unsigned();
      $table->string('mime')->nullable();
      $table->timestamps();
    });
  }

  public function down()
  {
    Schema::dropIfExists('attachments');
  }
}
