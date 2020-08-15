<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        // $uesrs = \App\User::all();
        $uesrs = User::all();

        return response()->json(['users' => $uesrs], 200);
    }
}
