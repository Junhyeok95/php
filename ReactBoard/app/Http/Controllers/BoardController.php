<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BoardController extends Controller
{

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

        $boards = \App\Board::get();

        // json["a","b","c"] 란?
        // res.data[0] = a
        // res.data[0] = b
        // res.data[0] = c
        return response()->json($boards);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // 글 상세 보기
        return view('app');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        // 글 수정 폼
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // 글 수정 처리
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // 글 삭제
    }
}
