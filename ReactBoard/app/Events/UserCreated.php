<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UserCreated
{
  use Dispatchable, InteractsWithSockets, SerializesModels;

  public $user;
  public $action;

  public function __construct(\App\User $user, $action = 'created')
  {
    $this->user = $user;
    $this->action = $action;
  }

  public function broadcastOn()
  {
    return new PrivateChannel('channel-name');
  }
}
