<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Product;

class ProductController extends Controller
{
  public function __construct()
  {
    $this->middleware('JWT', ['except' => ['index', 'store']]);
  }

  public function index()
  {
    $products = Product::all();
    return response()->json($products);
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
    return response()->json("store");
  }
}
