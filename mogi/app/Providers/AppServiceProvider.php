<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema; // 추가

class AppServiceProvider extends ServiceProvider
{
  public function register()
  {
    //
  }

  public function boot()
  {
    Schema::defaultStringLength(191);
  }
}
