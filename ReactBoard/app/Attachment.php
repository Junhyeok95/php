<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Attachment extends Model
{
  protected $fillable = ['board_id', 'filename', 'bytes', 'mime', 'url'];

  public function board()
  {
    return $this->belongsTo(Board::class);
  }
}
