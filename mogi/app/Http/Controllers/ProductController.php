<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Product;

class ProductController extends Controller
{
  public function __construct()
  {
    $this->middleware('JWT', ['except' => ['index']]);
  }

  public function index()
  {
    $products = Product::all();
    return response()->json($products);
  }
}
