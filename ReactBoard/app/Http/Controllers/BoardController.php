<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\BoardRequest;

class BoardController extends Controller
{

  public function __construct()
  {
    $this->middleware('JWT', ['except' => ['index', 'show']]);
  }

  public function index(Request $request)
  {
    $paginate = \App\Board::latest()->paginate($request->perPage);
    return response()->json($paginate);
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
