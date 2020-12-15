<h1>注文内容</h1>
<hr />
<p>
  <h2>{{$order->name}}様、ご注文ありがとうございます。</h2>
  <h2>ご注文内容についてご案内いたします。</h2>
  <br />
  <div>
    <img src="{{$message->embed($order->product_url)}}" alt="">
  </div>
  <h3>商品名：{{$order->product_name}}<br />
    購入個数：{{$order->quantity}}<br />
    注文価格：{{$order->billable_amount}}</h3>

  <h3>住所：{{$order->address}}<br />
    振込口座：{{$order->account}}</h3>
</p>
<hr />
<footer>
  発信地：神田ユニフォーム店
</footer>