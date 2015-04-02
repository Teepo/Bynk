var ROOM = {}

ROOM.id = null;
ROOM.name = null;
ROOM.key = null;
ROOM.existed_before = null;

ROOM.form = null;
ROOM.header = null;

ROOM.init = function(id, name, key, existed_before) {

    ROOM.id = id;
    ROOM.name = name;
    ROOM.key = key;
    ROOM.existed_before = parseInt(existed_before);

    if (ROOM.existed_before == 0)
        ROOM.create();
    else
        ROOM.join();

    ROOM.header = document.querySelector('#room .chat header');
    ROOM.form = document.querySelector('#room form');

    ROOM.header.querySelector('.button._on').addEventListener('click', CHAT.launchVideo);
    ROOM.header.querySelector('.button._off').addEventListener('click', CHAT.killVideo);
    ROOM.form.addEventListener('keyup', ROOM.postMessage);
};

ROOM.create = function() {

    PEER.server.new(ROOM.name);
};

ROOM.update_key = function() {

    XHR.get('/room/set_key/name/' + ROOM.name + '/key/' + ROOM.key);
};

ROOM.join = function() {

    PEER.client.join();
};

ROOM.postMessage = function(event) {

    if (event.keyCode == 13)
    {
        var msg = event.target.value;

        if (msg.trim() != "")
        {
            CHAT.postMessage(msg);
            CHAT.form.querySelector('textarea').value = "";
        }
    }

    event.preventDefault();
    event.stopPropagation();
    return false;
};

ROOM.disconnect = function(event) {

    PEER.current.close();
};