<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class ProductController extends Controller
{
  public function __construct()
  {
    // $this->middleware('JWT', ['except' => ['index', 'store']]);
  }

  public function index()
  {
    return response()->json("index");
  }

  public function create()
  {
    //
  }

  public function store(Request $request)
  {
    // $order = auth()->user()->orders()->create(
    $order = User::find(1)->orders()->create( // 관리자
      array_merge(
        // ['user_id' => auth()->user()->id],
        ['user_id' => 1], // 관리자
        $request->all() // product_id, quantity 필요
      )
    );

    $order->products()->sync([$request->product_id => ['quantity' => $request->quantity]]);

    dd($order);

    return response()->json("store");
  }

  public function show($id)
  {
    //
  }

  public function edit($id)
  {
    //
  }

  public function update(Request $request, $id)
  {
    //
  }

  public function destroy($id)
  {
    //
  }
}
