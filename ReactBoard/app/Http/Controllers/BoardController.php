<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\BoardRequest;
use Illuminate\Support\Facades\DB;

class BoardController extends Controller
{
  public function __construct()
  {
    $this->middleware('JWT', ['except' => ['index', 'show']]);
  }

  public function index(Request $request, $slug = null)
  {
    $query = $slug ? \App\Tag::whereSlug($slug)->firstOrFail()->boards() : new \App\Board;
    $paginate = $query->orderBy('id', 'desc')->paginate($request->perPage); // orderBy 대신 lstest

    for ($i = 0; $i < $paginate->count(); $i++) {
      $paginate[$i]['user_name'] = \App\User::whereId($paginate[$i]->user_id)->first()->name;
      $paginate[$i]['content'] = null; // 데이터 낭비 방지
    }

    // dd(json_encode($paginate));
    // dd(json_encode($paginate->count()));

    return response()->json([$paginate, $slug]);
  }

  public function create()
  {
    return response()->json("create");
  }

  public function store(BoardRequest $request)
  {
    $board = auth()->user()->boards()->create(
      array_merge(
        ['user_id' => auth()->user()->id],
        $request->all()
      )
    );
    return response()->json($board);
  }

  public function show(\App\Board $board)
  {
    $board->increment('view', 1);
    $board['user_name'] = \App\User::whereId($board->user_id)->first()->name;
    return response()->json($board);
  }

  public function edit(\App\Board $board)
  {
    return response()->json(auth()->user()->id === $board->user_id ? $board : false);
  }

  public function update(\App\Board $board, BoardRequest $request)
  {
    return response()->json(auth()->user()->id === $board->user_id ? $board->update($request->all()) : false);
  }

  public function destroy(\App\Board $board)
  {
    return response()->json(auth()->user()->id === $board->user_id ? $board->delete() : false);
  }
}
