{strip}

<!DOCTYPE>
<html>
  <head>

	<meta charset="utf8">
	<title>Bynk</title>

	<link rel="stylesheet" media="screen" href="/css/reset.css">
	<link rel="stylesheet" media="screen" href="/css/display.css">

    <script src="https://code.jquery.com/jquery-2.1.3.min.js"></script>

    {* TOOLS *}
    <script type="text/javascript" src="/js/tools/lazy.js"></script>
    <script type="text/javascript" src="/js/tools/url.js"></script>
    <script type="text/javascript" src="/js/tools/xhr.js"></script>
    <script type="text/javascript" src="/js/tools/event.js"></script>
    <script type="text/javascript" src="/js/tools/lives.js"></script>

    <script type="text/javascript" src="/js/conf.js"></script>
	<script type="text/javascript" src="/js/bynk.js"></script>
	<script type="text/javascript" src="/js/peer.js"></script>
	<script type="text/javascript" src="/js/room.js"></script>
	<script type="text/javascript" src="/js/video.js"></script>

	{if isset($css)}
	  <link rel="stylesheet" media="screen" href="{$css}">
	{/if}

	{if isset($js)}
	  <script type="text/javascript" src="{$js}"></script>
	{/if}

	{if isset($extra)}
      {$extra}
	{/if}

  </head>
  <body{if isset($id)} id="{$id}"{/if}>

{/strip}