<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $guarded = [''];


    // public function sender()
    public function from()
    {
        return $this->belongsTo(User::class, 'from');
    }
    // public function receiver()
    public function to()
    {
        return $this->belongsTo(User::class, 'to');
    }
}
