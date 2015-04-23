{strip}

{if !isset($room)}
  {if isset($root_tab.room)}
    {assign var="room" value=$root_tab.room}
  {/if}
{/if}

{if !isset($exist)}
  {if isset($root_tab.exist)}
    {assign var="exist" value=$root_tab.exist}
  {/if}
{/if}

{if !isset($open)}
  {if isset($root_tab.open)}
    {assign var="open" value=$root_tab.open}
  {/if}
{/if}

{include file="views/header.tpl" id="room"}

{literal}
<script>

document.addEventListener('DOMContentLoaded', function() {

    Lazy.prevent([
      [null, "/js/tools/peer.js"],
      [null, "/js/peer.js"],
      [null, "/js/peer.server.js"],
      [null, "/js/peer.client.js"],
      [null, "/views/room/css/main.css"],
      [null, "/views/chat/css/main.css"],
      [null, "/views/chat/js/chat.js"],
      [null, "/views/room/js/room.js", function() {

          ROOM.init(
            "{/literal}{$room->id}{literal}",
            "{/literal}{$room->url}{literal}",
            "{/literal}{$room->key}{literal}",
            "{/literal}{$exist}{literal}",
            "{/literal}{$room->open}{literal}"
          );

      }]
    ]);
});
</script>
{/literal}

<div id="main">

  <aside id="rooms">
    <section>
      <header>
        <form action="/api/room/search/" autocomplete id="form-search-room">
          <input type="search" name="search" />
          <input type="submit" class="button" value="" />
        </form>
      </header>
      <ul class="list handler _relative _nob"></ul>
    </section>
  </aside>

  <section id="content">

    <header>
      <h2 class="_ib">
        {$room.title|ucfirst|default:$room.url|ucfirst}
        <div class="icon edit _r">
          <i></i>
        </div>
      </h2>

      <div class="buttons">
        <div class="button _on">&nbsp;</div>
        <div class="button _off _red">&nbsp;</div>
        <div class="icon settings">
          <i></i>
        </div>
      </div>
    </header>

    <section id="videos" class="_l"></section>

    {include file="views/chat/tpl/display.tpl"}
  </section>

  {include file="views/room/tpl/inc/loading.tpl"}

</div>

{/strip}
