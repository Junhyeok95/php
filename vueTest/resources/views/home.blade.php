@extends('layouts.app')

@section('content')
<div class="flex-1 h-full">
    <chat-vue :current-user="{{ auth()->id() }}" />
</div> @endsection