<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\BoardRequest;
use Illuminate\Support\Facades\DB;

class BoardController extends Controller
{
  public function __construct()
  {
    $this->middleware('JWT', ['except' => ['index', 'show', 'create', 'edit']]);
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
    if ($request->file()) {
      $files = $request->file();
      foreach ($files as $file) {
        $filename = \Str::random(5) . filter_var($file->getClientOriginalName(), FILTER_SANITIZE_URL);
        $board->attachments()->create([
          'url' => DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'upload' . DIRECTORY_SEPARATOR . 'board' . DIRECTORY_SEPARATOR . $filename,
          'filename' => $filename,
          'bytes' => $file->getSize(),
          'mime' => $file->getClientMimeType(),
        ]);
        move_uploaded_file($file, public_path('images' . DIRECTORY_SEPARATOR . 'upload' . DIRECTORY_SEPARATOR . 'board' . DIRECTORY_SEPARATOR . $filename));
      }
    }

    return response()->json($board);
  }

  public function show(\App\Board $board)
  {
    $number = $board->id;
    $cnt = \App\Board::get()->count();
    $prevNumber = $number + 1;
    $nextNumber = $number - 1;

    $board['now'] = $number; // show id
    $board['user_name'] = \App\User::whereId($board->user_id)->first()->name; // 글쓴이
    if ($cnt !== $number) {
      $board['prev_title'] = \App\Board::whereId($prevNumber)->first()->title; // 이전글
    }
    if ($number > 1) {
      $board['next_title'] = \App\Board::whereId($nextNumber)->first()->title; // 다음글
    }
    $urls = [];
    if ($board->attachments()->get()->first()) {
      foreach ($board->attachments()->get() as $data) {
        array_push($urls, $data->url);
      }
    }
    $board['urls'] = $urls; // 첨부파일
    $board->increment('view', 1);
    return response()->json($board);
  }

  public function edit(\App\Board $board)
  {
    $urls = [];
    if ($board->attachments()->get()->first()) {
      foreach ($board->attachments()->get() as $data) {
        array_push($urls, $data->url);
      }
    }
    $board['urls'] = $urls; // 첨부파일
    return response()->json($board);
  }

  public function update(\App\Board $board, Request $request)
  {
    return response()->json(auth()->user()->id === $board->user_id ? $board->update($request->all()) : false);
  }

  public function destroy(\App\Board $board)
  {
    return response()->json(auth()->user()->id === $board->user_id ? $board->delete() : false);
  }
}
