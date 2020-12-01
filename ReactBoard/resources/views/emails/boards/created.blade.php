<h1>
  <small>
    {{ $board->user->name }}
  </small>
  <br />
  {{ $board->title }}
</h1>
<p>
  {{ $board->content }}
  <br />
  <small>
    {{ $board->created_at }}
  </small>
</p>
<hr />
<br />
<footer>
  이 메일은 {{ config('app.url') }} 에서 보냈습니다.
</footer>
<hr />