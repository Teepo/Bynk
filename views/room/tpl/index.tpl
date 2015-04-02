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

{include file="views/header.tpl" id="room"}

{literal}
<script>

document.addEventListener('DOMContentLoaded', function() {

    Lazy.prevent([
      [null, "http://cdn.peerjs.com/0.3/peer.js"],
      [null, "/js/peer.js"],
      [null, "/js/peer.server.js"],
      [null, "/js/peer.client.js"],
      [null, "/views/room/css/main.css"],
      [null, "/views/chat/css/main.css"],
      [null, "/views/chat/js/chat.js"],
      [null, "/views/room/js/room.js", function() {

          ROOM.init(
            "{/literal}{$room->id}{literal}",
            "{/literal}{$room->name}{literal}",
            "{/literal}{$room->key}{literal}",
            "{/literal}{$exist}{literal}"
          );

      }]
    ]);
});
</script>
{/literal}

<div id="main">

  {include file="views/chat/tpl/display.tpl"}

</div>

{/strip}
