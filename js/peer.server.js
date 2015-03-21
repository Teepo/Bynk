PEER.server = {};

PEER.server.new = function (key) {

    PEER.current = new Peer({
        id: key,
        key: PEER.API_KEY,
        debug: 3
    });

    PEER.current.on('open', PEER.server.onOpen);
    PEER.current.on('connection', PEER.server.onConnection);
    PEER.current.on('data', PEER.server.onData);
    PEER.current.on('close', PEER.server.onClose);
    PEER.current.on('disconnect', PEER.server.onClose);
};

PEER.server.onOpen = function() {
    ROOM.key = PEER.current.id;
    ROOM.update_key();
};

// Quand un dude arrive
PEER.server.onConnection = function(data) {

    setTimeout(function() {

        console.log('[PEER SERVER] onConnection()', data);

        data.send({
            label: 'connectTo',
            ids: PEER.connections
        });

        PEER.connections.push(data.provider.id);

        // connect to my new client too.
        PEER.current.connect(data.provider.id);

    }, 2000);
};

PEER.server.onData = function(data) {
    console.log('[SERVER] onData() > ', data);
};

PEER.server.onClose = function(data) {
    console.log('close', data);
};

PEER.server.broadcast = function(data) {

    for(var c in PEER.current.connections) {
        PEER.current.connections[c][0].send(data);
    }
};