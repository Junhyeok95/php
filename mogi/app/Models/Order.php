<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
  use HasFactory;

  protected $fillable = [
    /* Customer */
    'email',
    'name',
    'address',
    // 'phone_number',

    /* Order */
    'billable_amount',
    'message',
    'deposit_status',
    'shipping_status',
  ];

  /* RELATIONSHIPS */
  public function user()
  {
    return $this->belongsTo(User::class);
  }

  public function products()
  {
    // 중간 테이블은 pivot 이고 시간과 칼럼을 추가하는 방법
    return $this->belongsToMany(Product::class)->withTimestamps()->withPivot('quantity');
  }
}
