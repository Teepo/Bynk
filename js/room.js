var ROOM = {}

ROOM.id = null;
ROOM.name = null;
ROOM.key = null;
ROOM.existed_before = null;

ROOM.init = function(id, name, key, existed_before) {

    ROOM.id = id;
    ROOM.name = name;
    ROOM.key = key;
    ROOM.existed_before = parseInt(existed_before);

    if (ROOM.existed_before == 0)
        ROOM.create();
    else
        ROOM.join();
};

ROOM.create = function() {

    Lazy.prevent(null, '/js/peer.server.js', function() { PEER.server.new(ROOM.name); });
};

ROOM.update_key = function() {
    XHR.get('/room/set_key/name/' + ROOM.name + '/key/' + ROOM.key);
};

ROOM.join = function() {
    Lazy.prevent(null,'/js/peer.client.js', function() { PEER.client.connect() });
};

ROOM.disconnect = function(event) {
    PEER.current.close();
};
