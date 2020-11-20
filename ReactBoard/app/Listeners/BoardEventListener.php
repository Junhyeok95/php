<?php

namespace App\Listeners;

// use App\Events\board.created; 삭제
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class BoardEventListener
{
  /**
   * Create the event listener.
   *
   * @return void
   */
  public function __construct()
  {
    //
  }

  /**
   * Handle the event.
   *
   * @param  board.created  $event
   * @return void
   */
  // public function handle(\App\Board $board) 이것을 수정
  public function handle(\App\Events\BoardCreated $event)
  {
    dump("이벤트 핸들러");
    dump($event);
  }
}
