<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
  protected $fillable = ['user_id', 'borad_id', 'content'];

  public function boards()
  {
    return $this->belongsTo(Board::class);
  }
}
