<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class BoardCreated
{
  use Dispatchable, InteractsWithSockets, SerializesModels;

  public $board;


  /**
   * Create a new event instance.
   *
   * @return void
   */
  public function __construct(\App\Board $board)
  {
    dump("이벤트 발생");
    $this->board = $board;
  }

  /**
   * Get the channels the event should broadcast on.
   *
   * @return \Illuminate\Broadcasting\Channel|array
   */
  public function broadcastOn()
  {
    return new PrivateChannel('channel-name');
  }
}

// 설명 : 컨트롤러에서의 명령어
// dump("이벤트");
// event(
//   // 'board.created', // 프로바이더에 등록 후 생략
//   new \App\Events\BoardCreated(($board))
// );
// dump("이벤트");
