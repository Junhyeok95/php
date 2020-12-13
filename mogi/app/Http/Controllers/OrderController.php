<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Order;
use App\Models\Product;

class OrderController extends Controller
{
  public function __construct()
  {
    $this->middleware('JWT', ['except' => ['store']]);
  }

  public function index()
  {
    // Validation 필요
    $total = [];
    $orders = User::find(1)->orders()->get(); // Order::all();
    $products = Product::all();

    foreach ($orders as $order) {
      $list = [];
      array_push($list, [
        'id' => $order->id, // 주문 테이블 id
        'user_id' => $order->user_id, // 관리자 id

        'name' => $order->name, // 구매자 이름
        'email' => $order->email, // 구매자 이메일
        'address' => $order->address, // 구매자 주소

        'product_id' => $order->products()->first()->pivot->product_id, // 제품 아이디
        'product_name' => $products->get($order->products()->first()->pivot->product_id)->name, // 제품 이름
        'product_price' => $products->get($order->products()->first()->pivot->product_id)->price, // 제품 가격

        'quantity' => $order->products()->first()->pivot->quantity, // 주문 제품 수량
        'created_at' => $order->products()->first()->pivot->created_at, // 주문 제품 날짜

        'billable_amount' => ($products->get($order->products()->first()->pivot->product_id)->price * $order->products()->first()->pivot->quantity), // 구매자 총 금액
        'message' => $order->message, // 구매자 메세지
        'deposit_status' => $order->deposit_status, // 입금 상태
        'shipping_status' => $order->shipping_status // 배송 상태
      ]);
      $total = array_merge($list, $total);
    }
    // dd(json_encode($total));

    $products = Product::all();

    return response()->json([$total, $products]);
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
    return response()->json($order);
  }

  public function show(\App\Models\Order $order)
  {
    return response()->json($order);
  }

  public function edit(\App\Models\Order $order)
  {
    return response()->json(auth()->user()->id === $order->user_id ? $order : false);
  }

  public function update(Request $request, \App\Models\Order $order)
  {
    // dd($request->all());
    return response()->json($order);
  }

  public function destroy(\App\Models\Order $order)
  {
    return response()->json(auth()->user()->id === $order->user_id ? $order->delete() : false);
  }
}
