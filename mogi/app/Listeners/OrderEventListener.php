<?php

namespace App\Listeners;

use App\Events\OrderCreated;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class OrderEventListener
{
  public function __construct()
  {
  }

  public function handle(OrderCreated $event)
  {
    if ($event->action === 'email') {
      // dd("mail OK", $event->who_are_you);
    }
  }
}
