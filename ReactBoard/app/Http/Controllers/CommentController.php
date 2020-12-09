<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class CommentController extends Controller
{
  public function __construct()
  {
    $this->middleware('JWT', ['except' => ['index', 'show']]);
  }

  public function index()
  {
    // $query = new \App\Board;
    // $query->all();
    // dd(json_encode($query));
    return response()->json("comment");
  }

  public function create()
  {
  }

  public function store(Request $request)
  {
  }

  public function show($id) // == board id
  {
    $comments = DB::table('comments')->where('board_id', $id)->get();

    $total = [];
    foreach ($comments as $comment) {
      $list = [];
      array_push($list, [
        'id' => $comment->id,
        'user_id' => $comment->user_id,
        'user_name' => \App\User::whereId($comment->user_id)->first()->name,
        'board_id' => $comment->board_id,
        'content' => $comment->content,
        'created_at' => $comment->created_at,
      ]);
      $total = array_merge($list, $total);
    }
    return response()->json($total);
  }

  public function edit($id)
  {
  }

  public function update(Request $request, $id)
  {
  }

  public function destroy($id)
  {
  }
}
