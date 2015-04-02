var PEER = {};

PEER.API_KEY = '5lny0sbelakmx6r';

PEER.current = null;

PEER.connections = [];

PEER.broadcast = function(data) {

    console.log('[PEER] broadcast() > ', data);

    for(var c in PEER.current.connections)
    {
        for (var x in PEER.current.connections[c])
            PEER.current.connections[c][x].send(data);
    }
};

PEER.onData = function(data) {
    console.log('[PEER] onData() > ', data);

    PEER.dataDispatcher(data);
};

PEER.dataDispatcher = function(data) {

    if (typeof PEER[data.label] != "undefined")
        PEER[data.label](data);
};

PEER.drawMessage = function(data) {
    CHAT.drawMessage(data);
};

PEER.connectTo = function(data) {

    console.log('[CLIENT] connectTo() >', data);

    data.ids.forEach(function(id) {

        if (id != PEER.current.peer
          || PEER.connections.indexOf(id) <= 0)
        {
            PEER.current.connect(id);
        }
        else
            console.log('[CLIENT] connectTo() > You try to connect to yourself or in another peer already connected.');
    });
};