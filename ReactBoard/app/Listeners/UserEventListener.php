<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class UserEventListener
{
  public function __construct()
  {
    //
  }

  public function handle(\App\Events\UserCreated $event)
  {
    if ($event->action === 'created') {
      // 유저 가입
    }
  }
}
