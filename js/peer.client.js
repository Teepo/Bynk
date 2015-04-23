PEER.client = {};

PEER.client.connected = false;

PEER.client.join = function(room) {

    PEER.current = new Peer({
        key: PEER.API_KEY
    });

    var conn = PEER.current.connect(room.token);

    PEER.current.on('open', PEER.client.onOpen);
    PEER.current.on('connection', PEER.client.onConnection);
    PEER.current.on('call', PEER.onCall);
    conn.on('data', PEER.onData);
};

PEER.client.onOpen = function(id) {

    console.log('[CLIENT] onOpen() > ', id);

    ROOM.open_the_door();
};

PEER.client.onConnection = function(conn) {

    console.log('[CLIENT] onConnection() > ', conn)

    conn.on('close', function() {

        ROOM.removeVideo();

        ROOM.close_the_door();

        PEER.server.new();
    });

    ROOM.open_the_door();
};