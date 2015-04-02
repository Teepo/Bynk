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

        for (var i in PEER.connections)
        {
            CHAT.stream[i] = PEER.current.call(PEER.connections[i], CHAT.video.localMediaStream);
            CHAT.stream[i].on('stream', CHAT._stream);
        }
    });
};

CHAT._stream = function(stream) {
    console.log('CHAT _STREAM', stream);
};

CHAT.killVideo = function(event) {
    CHAT.video.kill();
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

    console.log('draw', data);

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