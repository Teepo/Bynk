var CHAT = {};

CHAT.current = null;
CHAT.list = null;
CHAT.form = null;

CHAT.drawMessage = function(msg) {

    var dom = Template.process('.templates ._chat._message')({
        'message' : msg
    });

    CHAT.list.insertAdjacentHTML('beforeEnd', dom);
};