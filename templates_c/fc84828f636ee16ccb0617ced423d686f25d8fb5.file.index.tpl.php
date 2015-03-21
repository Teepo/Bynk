<?php /* Smarty version Smarty-3.1.14, created on 2015-03-20 18:49:50
         compiled from "/Users/anthony/Dropbox/Project/Bynk/views/room/tpl/index.tpl" */ ?>
<?php /*%%SmartyHeaderCode:156530499754f3541e371493-74195729%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'fc84828f636ee16ccb0617ced423d686f25d8fb5' => 
    array (
      0 => '/Users/anthony/Dropbox/Project/Bynk/views/room/tpl/index.tpl',
      1 => 1426548512,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '156530499754f3541e371493-74195729',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.14',
  'unifunc' => 'content_54f3541e3d93a9_50966963',
  'variables' => 
  array (
    'room' => 0,
    'root_tab' => 0,
    'exist' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_54f3541e3d93a9_50966963')) {function content_54f3541e3d93a9_50966963($_smarty_tpl) {?><?php if (!isset($_smarty_tpl->tpl_vars['room']->value)){?><?php if (isset($_smarty_tpl->tpl_vars['root_tab']->value['room'])){?><?php $_smarty_tpl->tpl_vars["room"] = new Smarty_variable($_smarty_tpl->tpl_vars['root_tab']->value['room'], null, 0);?><?php }?><?php }?><?php if (!isset($_smarty_tpl->tpl_vars['exist']->value)){?><?php if (isset($_smarty_tpl->tpl_vars['root_tab']->value['exist'])){?><?php $_smarty_tpl->tpl_vars["exist"] = new Smarty_variable($_smarty_tpl->tpl_vars['root_tab']->value['exist'], null, 0);?><?php }?><?php }?><?php echo $_smarty_tpl->getSubTemplate ("views/header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array('id'=>"room",'js'=>"/js/tools/peer.js",'css'=>"/views/room/css/main.css"), 0);?>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    ROOM.init(
      "<?php echo $_smarty_tpl->tpl_vars['room']->value->id;?>
",
      "<?php echo $_smarty_tpl->tpl_vars['room']->value->name;?>
",
      "<?php echo $_smarty_tpl->tpl_vars['room']->value->key;?>
",
      "<?php echo $_smarty_tpl->tpl_vars['exist']->value;?>
"
    );
  });
</script>
<div id="main"><nav class="_l"><ul class="list recent _nob"><li class="row"></li></ul><ul class="list onlineob"></ul><ul class="list request"></ul></nav><section><form><textarea></textarea><input type="submit" class="button" /></form></section></div><?php echo $_smarty_tpl->getSubTemplate ("views/footer.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>

<?php }} ?>