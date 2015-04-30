var PEER = {};

PEER.API_KEY = '5lny0sbelakmx6r';

PEER.current = null;
PEER.hoster = false;

PEER.connections = [];

PEER.sleep = function(ms) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + ms);
}

PEER.broadcast = function(data) {

    console.log('[PEER] broadcast() > ', data);

    PEER.getConnections(function(conn) {
        conn.send(data);
    });
};

PEER.getConnections = function(cb) {

    for (var i in PEER.current.connections)
        cb(PEER.current.connections[i][0]);
};

PEER.onData = function(data) {
    console.log('[PEER] onData() > ', data);

    PEER.dataDispatcher(data);
};

PEER.onCall = function(call) {
    console.log('[PEER] onCall() > ', call);

    CHAT.video = new VIDEO.run;

    CHAT.video.init(function() {

        CHAT.current.classList.add('_small');

        call.answer(CHAT.video.localMediaStream);
    });

    PEER.current.on('stream', PEER.onStream);
    call.on('stream', PEER.onStream);
};

PEER.onStream = function(stream) {

    CHAT.current.classList.add('_small');

    var video = document.createElement('video');
    video.src = URL.createObjectURL(stream);
    video.play();
    video.volume = 0;

    document.getElementById('videos').appendChild(video);

    ROOM.fitVideo();
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

        if (id != PEER.current.id
          && PEER.connections.indexOf(id) <= 0)
        {
            console.log(PEER.current.id, id);
            PEER.current.connect(id);
        }
        else
            console.log('[CLIENT] connectTo() > You try to connect to yourself or in another peer already connected.');
    });
};