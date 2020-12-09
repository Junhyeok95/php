<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
  protected $fillable = ['user_id', 'borad_id', 'content'];

  public function user()
  {
    return $this->belongsTo(User::class);
  }

  public function boards()
  {
    return $this->belongsTo(Board::class);
  }
}
