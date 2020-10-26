<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    protected $namespace = 'App\Http\Controllers';

    public const HOME = '/';

    public function boot()
    {
        //
        parent::boot();

        // URL 파라미터와 모델을 연결하여 간단하게 사용
        // 암시적 바인딩으로 코드를 처음 보는 사람은 한 번에 이해할 수 없다는 단점이 있음
        // public function show( \App\Board $boards ) -> model::findOrFail($id);
        // 아래의 명시적 바인딩을 주입 할 경우 /boards/5 하면 자동으로 위에 담긴다
        // Route::model('boards',\App\Board::class); // -> 명시적 바인딩
    }

    public function map()
    {
        $this->mapApiRoutes();
        $this->mapWebRoutes();
    }

    protected function mapWebRoutes()
    {
        Route::middleware('web')
            ->namespace($this->namespace)
            ->group(base_path('routes/web.php'));
    }

    protected function mapApiRoutes()
    {
        Route::prefix('api') // prefix 접두사 ex) api.ip:port
            ->middleware('api')
            ->namespace($this->namespace)
            ->group(base_path('routes/api.php'));
    }
}
