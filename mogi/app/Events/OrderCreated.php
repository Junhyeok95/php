<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class OrderCreated
{
  use Dispatchable, InteractsWithSockets, SerializesModels;

  public $order, $who_are_you;

  public function __construct(\App\Models\Order $order)
  {
    $this->order = $order;
    $this->who_are_you = $order->email;
    $this->action = "email";

    // 이벤트 처리
    \Mail::send(
      'buy',
      compact('order'),
      function ($message) use ($order) {
        $res_email = $order->email;
        $message->to($res_email);
        $message->subject(`神田ユニフォーム店：{$order->name}様のご注文内容`);
      }
    );
  }

  public function broadcastOn()
  {
    return new PrivateChannel('channel-name');
  }
}
