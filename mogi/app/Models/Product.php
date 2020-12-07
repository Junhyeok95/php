<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
  use HasFactory;

  protected $fillable = [
    /* Product */
    'name',
    'price',
    'stock',
  ];

  /* RELATIONSHIPS */
  public function orders()
  {
    return $this->belongsToMany('App\Models\Order')->withTimestamps()->withPivot('quantity');
  }
}
