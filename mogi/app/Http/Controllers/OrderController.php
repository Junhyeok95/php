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
    $products = Product::all();
    $monthly_sales = [];

    $orders = User::find(1)->orders()->get(); // Order::all();
    foreach ($orders as $order) {
      $list = [];
      array_push($list, [
        'id' => $order->id, // 주문 테이블 id
        'user_id' => $order->user_id, // 관리자 id

        'name' => $order->name, // 구매자 이름
        'email' => $order->email, // 구매자 이메일
        'address' => $order->address, // 구매자 주소

        'product_id' => $order->products()->first()->pivot->product_id, // 제품 아이디
        'product_name' => $products->find($order->products()->first()->pivot->product_id)->name, // 제품 이름
        'product_price' => $products->find($order->products()->first()->pivot->product_id)->price, // 제품 가격

        'quantity' => $order->products()->first()->pivot->quantity, // 주문 제품 수량
        'created_at' => $order->products()->first()->pivot->created_at, // 주문 제품 날짜

        'billable_amount' => ($products->find($order->products()->first()->pivot->product_id)->price * $order->products()->first()->pivot->quantity), // 구매자 총 금액
        'message' => $order->message, // 구매자 메세지
        'deposit_status' => $order->deposit_status, // 입금 상태
        'shipping_status' => $order->shipping_status // 배송 상태
      ]);
      $total = array_merge($list, $total);
    }

    $sales_i = $sales_j = $sales_k = 0;
    $this_month = \Carbon\Carbon::now();
    $this_m = $order->whereYear('created_at', $this_month->year)->whereMonth('created_at', $this_month->month)->where('deposit_status', '入金済')->get();
    $last_month = \Carbon\Carbon::now()->subMonth(1);
    $last_m = $order->whereYear('created_at', $last_month->year)->whereMonth('created_at', $last_month->month)->where('deposit_status', '入金済')->get();
    $the_month_before_last = \Carbon\Carbon::now()->subMonth(2);
    $the_m = $order->whereYear('created_at', $the_month_before_last->year)->whereMonth('created_at', $the_month_before_last->month)->where('deposit_status', '入金済')->get();

    foreach ($this_m as $i) {
      $sales_i += $i->billable_amount;
    }
    if ($sales_i != 0) {
      array_push($monthly_sales, [
        "key" => $this_month->year . "年-" . $this_month->month . "月",
        "value" => $sales_i
      ]);
    }
    foreach ($last_m as $j) {
      $sales_j += $j->billable_amount;
    }
    if ($sales_j != 0) {
      array_push($monthly_sales, [
        "key" => $last_month->year . "年-" . $last_month->month . "月",
        "value"  => $sales_j
      ]);
    }
    foreach ($the_m as $k) {
      $sales_k += $k->billable_amount;
    }
    if ($sales_k != 0) {
      array_push($monthly_sales, [
        "key" => $the_month_before_last->year . "年-" . $the_month_before_last->month . "月",
        "value"  => $sales_k
      ]);
    }
    return response()->json([$total, $products, $monthly_sales]);
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
    $order['account'] = "1234-56-7890";
    $order['quantity'] = $request->quantity;
    $product_name = Product::find($request->product_id)->name;
    $order['product_name'] = $product_name;
    $order['product_url'] = public_path() . "/" . "images" . "/" . substr($product_name, -1, 1) . ".png";

    // email 발송
    event(new \App\Events\OrderCreated($order));

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
    if ($request->type === "edit_update") {
      $order->update($request->all());
      $order->products()->sync([Product::whereName($request->product_name)->first()->id => ['quantity' => $request->quantity, 'created_at' => $order->products()->first()->pivot->created_at]]);
      return response()->json($order);
    }
    return response()->json(false);
  }

  public function destroy(\App\Models\Order $order)
  {
    return response()->json(auth()->user()->id === $order->user_id ? $order->delete() : false);
  }
}
