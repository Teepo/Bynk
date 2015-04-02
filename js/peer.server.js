PEER.server = {};

PEER.server.new = function (key) {

    PEER.current = new Peer({
        key: PEER.API_KEY,
        debug: 3
    });

    PEER.current.on('open', PEER.server.onOpen);
    PEER.current.on('connection', PEER.server.onConnection);
};

PEER.server.onOpen = function(id) {

    console.log('[SERVER] onOpen() > ', id);

    ROOM.key = PEER.current.id;
    ROOM.update_key();
};

// Quand un dude arrive
PEER.server.onConnection = function(conn) {

    console.log('[SERVER] onConnection() > ', conn);

    // connect to my new client too.
    PEER.current.connect(conn.peer);

    PEER.connections.push(conn.peer);

    conn.on('data', PEER.onData);

    // send to new client all peers actually connected
    setTimeout(function() {
        console.log('[SERVER] send data to client ...');

        PEER.broadcast({
            label: 'connectTo',
            ids: PEER.connections
        });
    }, 1500);
};