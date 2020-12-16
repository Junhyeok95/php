<?php

namespace App\Providers;

use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

use \App\Events\OrderCreated;
use \App\Listeners\OrderEventListener;

class EventServiceProvider extends ServiceProvider
{
  protected $listen = [
    OrderCreated::class => [
      OrderEventListener::class,
    ],
  ];

  public function boot()
  {
  }
}
