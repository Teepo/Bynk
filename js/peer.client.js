PEER.client = {};

PEER.client.join = function() {

    console.log('[CLIENT] connect()');

    PEER.current = new Peer({
        key: PEER.API_KEY,
        debug: 3
    });

    PEER.current.on('open', PEER.client.onOpen);
    PEER.current.on('connection', PEER.client.onConnection);
};

PEER.client.onOpen = function(id) {

    console.log('[CLIENT] onOpen() > ', id);

    PEER.current.connect(ROOM.key);
};

PEER.client.onConnection = function(conn) {

    console.log('[CLIENT] onConnection() > ', conn)

    conn.on('data', PEER.onData);
};