{strip}

<section class="chat">

  <header>
    <h2>John Doe</h2>

    <div class="button _off _red _r">KILL WEBCAM</div>
    <div class="button _on _r">WEBCAM</div>
  </header>

  <ul class="list _nob"></ul>

  <form class="w100">
    <textarea class="w100" placeholder="Type your message ..."></textarea>
  </form>

</section>

<div class="templates">
  <div class="_chat _message">

    {htmlcomment}{literal}
    <li class="row">
      <div class="disp circle">
        <img src="http://placekitten.com/g/40/40" />
      </div>
      <p>
        <%=data.message%>
      </p>
    </li>
    {/literal}{/htmlcomment}
  </div>
</div>

{/strip}
