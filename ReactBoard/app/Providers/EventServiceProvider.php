<?php

namespace App\Providers;

use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
  /**
   * The event listener mappings for the application.
   *
   * @var array
   */
  protected $listen = [
    Registered::class => [
      SendEmailVerificationNotification::class,
    ],
  ];

  /**
   * Register any events for your application.
   *
   * @return void
   */
  public function boot()
  {
    parent::boot();

    // dump("이벤트 제공자");
    // \Event::listen('이벤트 이름', 함수 {});
    // \Event::listen(이벤트 채널, 이벤트 리스너);
    // 첫 번째 인자로 지정한 이벤트가 발생하면, 두 번째 인자의 클래스에게 처리를 위임한다.
    \Event::listen(
      \App\Events\BoardCreated::class, // 'board.created',
      \App\Listeners\BoardEventListener::class
    );
  }
}
