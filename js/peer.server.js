PEER.server = {};

PEER.server.new = function () {

    PEER.current = new Peer({
        key: PEER.API_KEY
    });

    PEER.current.on('open', PEER.server.onOpen);
    PEER.current.on('connection', PEER.server.onConnection);
    PEER.current.on('call', PEER.onCall);
};

PEER.server.onOpen = function(id) {

    console.log('[SERVER] onOpen() > ', id);

    ROOM.key = PEER.current.id;

    PEER.hoster = true;

    ROOM.update_key(function() {

        ROOM.open_the_door();
    });

    window.onbeforeunload = function() {
        PEER.current.disconnect();
        PEER.current.destroy();

        ROOM.close_the_door();

        //PEER.sleep(1000);
    };
};

// Quand un dude arrive
PEER.server.onConnection = function(conn) {

    console.log('[SERVER] onConnection() > ', conn);

    // connect to my new client too.
    PEER.current.connect(conn.peer);

    PEER.connections.push(conn.peer);

    conn.on('data', PEER.onData);

    conn.on('close', function() {

        ROOM.removeVideo();

        console.log(conn.peer , 'left the chat.');
    })
};