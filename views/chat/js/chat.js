var CHAT = {};

CHAT.current = null;
CHAT.list = null;
CHAT.form = null;

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

    console.log('item', item);

    CHAT.list.appendChild(item);
};