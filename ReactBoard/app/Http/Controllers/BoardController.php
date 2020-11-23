<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\BoardRequest;

class BoardController extends Controller
{

  public function __construct()
  {
    //로그인 하지 않아도 index(게시판 홈), show(게시판 뷰)는 볼 수 있음
    $this->middleware('JWT', ['except' => ['index', 'show']]);
  }

  // 사용자 인증
  // public function __construct()
  // {
  //     $this->middleware('auth');
  // }

  // 인가 - 권한 및 처리 로직 정의
  // app/Providers/AuthServiceProvider.php

  // 인가 - 권한 및 처리 로직 적용
  // \App\Board $boards or Request $request
  // $this->authorize('xxxxx', $xxxxx)

  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    // $cnt = count(\App\Board::get());
    // return response()->json(["mydata",$cnt]);

    // N+1 쿼리 문제 해결
    // $boards = \App\Board::get();
    // 즉시 로드를 사용하는 이유는 모르겠다만 ...
    // with() 는 항상 엘로퀀트 모델 바로 다음에 위치
    // with()메서드의 인자는 테이블 이름이 아니고 관계 이름 ,,, 모델에 정의 해놓은거
    // $boards = \App\Board::with('user')->get();

    // json["a","b","c"] 란?
    // res.data[0] = a
    // res.data[0] = b
    // res.data[0] = c
    // return response()->json($boards);

    // 이건.. 페이징 .. blade render() 뭐지?
    $paginate = \App\Board::latest()->paginate(10);
    return response()->json($paginate);
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    return response()->json("create");
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(BoardRequest $request)
  {
    $board = auth()->user()->boards()->create(
      array_merge(
        ['user_id' => auth()->user()->id],
        $request->all()
      )
    );

    // dump("이벤트");
    // event(
    //   // 'board.created', // 프로바이더에 등록 후 생략
    //   new \App\Events\BoardCreated(($board))
    // );
    // dump("이벤트");

    return response()->json($board);
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show(\App\Board $board)
  {
    // 글 상세 보기
    return response()->json($board);
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function edit(\App\Board $board)
  {
    // 수정 창 보기
    return response()->json($board);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(\App\Board $board, BoardRequest $request)
  {
    if (!auth()->user()->id === $board->user_id) {
      return response()->json("err");
    }
    $board->update($request->all());
    return response()->json($board);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy(\App\Board $board)
  {
    return response()->json(auth()->user()->id === $board->user_id ? $board->delete() : false);
  }
}
