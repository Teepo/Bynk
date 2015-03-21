PEER.client = {};

PEER.client.connect = function() {

    PEER.current = new Peer({
        key: PEER.API_KEY,
        debug: 3
    });

    PEER.client._connect = PEER.current.connect;
    PEER.current = PEER.current.connect(ROOM.key);
    PEER.current.connect = PEER.client._connect;

    PEER.current.on('open', PEER.client.onOpen);

    PEER.connections.push(ROOM.key);
};

PEER.client.onOpen = function(data) {
    PEER.current.on('data', PEER.client.onData);
};

PEER.client.onData = function(data) {

    console.log('[PEER CLIENT] onData()', data);

    if (typeof data.label == "undefined")
        return false;

    if (typeof PEER.client[data.label] != "undefined")
        PEER.client[data.label](data);
    else
        console.log('[PEER CLIENT] > Try to launch PEER.client.' + data.label + '(), but seems not exist.');
};

PEER.client.connectTo = function(data) {

    console.log('connectTo()', data.ids);

    data.ids.forEach(function(id) {

        if (id != PEER.current.peer
          || PEER.connections.indexOf(id) <= 0)
            PEER.current.provider.connect(id);
        else {
            console.log('[PEER CLIENT] connectTo() > You try to connect to yourself or in another peer already connected.');
        }
    });
};