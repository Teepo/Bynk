var CHAT = {};

CHAT.current = null;
CHAT.list = null;
CHAT.form = null;
CHAT.video = null;

CHAT.stream = [];

CHAT.init = function() {

    CHAT.current = document.querySelector('section.chat');
    CHAT.list = CHAT.current.querySelector('ul');
    CHAT.form = CHAT.current.querySelector('form');
};

CHAT.launchVideo = function(event) {

    CHAT.video = new VIDEO.run;

    CHAT.video.init(function() {

        CHAT.current.classList.add('_small');

        PEER.getConnections(function(conn) {
            CHAT.stream[conn.peer] = PEER.current.call(conn.peer, CHAT.video.localMediaStream);
            CHAT.stream[conn.peer].on('stream', CHAT.onStream);
        });
    });
};

CHAT.onStream = function(stream) {

    CHAT.current.classList.add('_small');

    var video = document.createElement('video');
    video.src = URL.createObjectURL(stream);
    video.play();
    video.volume = 0;

    document.getElementById('videos').appendChild(video);

    ROOM.fitVideo();

    PEER.getConnections(function(conn) {
        CHAT.stream[conn.peer].answer(CHAT.video.localMediaStream);
    });
};

CHAT.killVideo = function(event) {
    CHAT.video.kill();

    CHAT.current.classList.remove('_small');
};

CHAT.postMessage = function(msg) {

    var data = {
        label : 'drawMessage',
        'peerID' : PEER.current.id,
        'msg' : msg
    };

    PEER.broadcast(data);

    CHAT.drawMessage(data);
};

CHAT.drawMessage = function(data) {

    var dom = Template.process('.templates ._chat._message')({
        'message' : data.msg
    });

    var item = document.createElement('li');
    item.innerHTML = dom;
    item = item.firstChild;

    if (data.peerID == PEER.current.id)
        item.classList.add('_me');

    CHAT.list.appendChild(item);
};