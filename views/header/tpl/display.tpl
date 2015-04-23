{strip}

{if !$id}{/if}

<nav>
  <ul>
    <li{if $id == "home"} class="selected"{/if}>
      <a href="#">HOME</a>
    </li>

    <li{if $id == "room"} class="selected"{/if}>
      <a href="#">CHAT</a>
    </li>

    <li{if $id == "settinfs"} class="selected"{/if}>
      <a href="#">SETTINGS</a>
    </li>
  </ul>
</nav>

{/strip}
