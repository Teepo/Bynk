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

{include
  file="views/header.tpl"
  id="room"
  js="/js/tools/peer.js"
  css="/views/room/css/main.css"}

{literal}
<script>
  document.addEventListener('DOMContentLoaded', function() {
    ROOM.init(
      "{/literal}{$room->id}{literal}",
      "{/literal}{$room->name}{literal}",
      "{/literal}{$room->key}{literal}",
      "{/literal}{$exist}{literal}"
    );
  });
</script>
{/literal}

<div id="main">

  <nav class="_l">

    <ul class="list recent _nob">
      <li class="row">
      </li>
    </ul>

    <ul class="list onlineob">
    </ul>

    <ul class="list request">
    </ul>

  </nav>

  <section>

    <form>
      <textarea></textarea>

      <input type="submit" class="button" />
    </form>
  </section>

</div>

{include file="views/footer.tpl"}

{/strip}
