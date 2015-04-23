{strip}

{if !isset($rooms)}
  {if isset($root_tab.rooms)}
    {assign var="rooms" value=$root_tab.rooms}
  {/if}
{/if}

{foreach from=$rooms item="room" name="loop_room"}

  <li class="row _table {if $room.open}_open{else}_close{/if}" data-id="{$room.id}">
    <div class="disp circle _cell">
      <div class="img">
        <img src="http://www.qilla.in/wp-content/uploads/2015/02/iron-man-movie60.png" />
      </div>
    </div>

    <p class="_cell">
      {$room.title|ucfirst|default:$room.url|ucfirst}
    </p>
  </li>
{/foreach}

{/strip}
