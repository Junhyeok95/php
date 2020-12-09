<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Board extends Model
{
  protected $fillable = ['user_id', 'title', 'content'];

  public function user()
  {
    // 외래 키를 별도로 설정하는 방법 : belongsTo(User::class, 'my_id');
    return $this->belongsTo(User::class);
  }

  public function comments()
  {
    return $this->hasMany(Comment::class);
  }

  public function tags()
  {
    return $this->belongsToMany(Tag::class);
  }
}
