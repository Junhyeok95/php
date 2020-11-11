<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BaseApiController extends Controller
{
  public function __construct()
  {
    if (auth()->getDefaultDriver() == 'web') {
      // 이걸 넣는 이유가 뭘까? auth guard?
      auth()->setDefaultDriver('api');
      // dd(auth()->getDefaultDriver());
    }
  }
}
