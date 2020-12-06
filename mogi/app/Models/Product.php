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

  /* 모델에 없던 프로퍼티를 접근자로 만들어 사용할 때 */
  /* App\Models\Product::find(1)->quantity */
  protected $appends = [
    'quantity',
  ];

  /* RELATIONSHIPS */
  public function orders()
  {
    return $this->belongsToMany('App\Models\Order')->withTimestamps()->withPivot('quantity');
  }

  /* Accessors */
  public function getQuantityAttribute()
  {
    return $this->quantity();
  }
}
