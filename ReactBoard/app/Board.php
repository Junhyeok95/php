<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Board extends Model
{
    protected $fillable = ['title', 'content'];

    public function user()
    {
        // 외래 키를 별도로 설정하는 방법 : belongsTo(User::class, 'my_id');
        return $this->belongsTo(User::class);
    }
}
