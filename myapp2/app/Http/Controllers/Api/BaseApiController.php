<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BaseApiController extends Controller
{
  // 설명 guards , api , driver == jwt 그러므로 필요한 항목
  public function __construct()
  {
    Auth::shouldUse('api'); // == auth()->setDefaultDriver('api')
  }
}
