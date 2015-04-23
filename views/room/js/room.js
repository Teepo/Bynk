var ROOM = {}

ROOM.id = null;
ROOM.url = null;
ROOM.title = null;
ROOM.key = null;
ROOM.existed_before = null;
ROOM.open = null;

ROOM.tester = null;
ROOM.tester_timing = 1000;
ROOM.tester_limit = 3;

ROOM.form = null;
ROOM.header = null;

ROOM.init = function(id, url, key, existed_before, open) {

    CHAT.init();

    ROOM.id = id;
    ROOM.url = url;
    ROOM.key = key;
    ROOM.existed_before = parseInt(existed_before);
    ROOM.open = parseInt(open);

    if (ROOM.existed_before == 0 && ROOM.open == 0)
        ROOM.create();
    else
        ROOM.join();

    ROOM.header = document.querySelector('#room header');
    ROOM.form = document.querySelector('#room form');

    ROOM.header.querySelector('.button._on').addEventListener('click', CHAT.launchVideo);
    ROOM.header.querySelector('.button._off').addEventListener('click', CHAT.killVideo);
    ROOM.form.addEventListener('keyup', ROOM.postMessage);

    document.addEventListener('autocomplete', ROOM.searching);
};

ROOM.generate = function(id, url, title, token, open) {

    ROOM.id = id;
    ROOM.url = url;
    ROOM.title = title
    ROOM.token = token;
    ROOM.open = parseInt(open);
};

ROOM.searching = function() {

    EVENT.add(ROOM.aside.querySelectorAll('.row'), 'click', ROOM.choose);
};

ROOM.choose = function(event) {
    console.log('CHOOSE', event);

    var row = closest(event.target, '.row');

    var room = {};
    room.id = row.getAttribute('data-id');
    room.open = 0;

    console.log('LA ROOM QUE JE VEUX JOIN', room);

    ROOM.join(room, function() {
        ROOM.content.querySelector('h2').textContent = ROOM.url;
    });
};

ROOM.create = function() {

    PEER.server.new();
};

ROOM.update_key = function(callback) {

    XHR.get('/api/room/set_key/argv/url/' + ROOM.url + '/key/' + ROOM.key);

    if (typeof callback == "function")
        callback();
};

ROOM.join = function() {

    // on wait un peu, sinon on crée la room
    if (ROOM.open == 0)
    {
        var i = 0;
        ROOM.tester = setInterval(function() {

                          var room = ROOM.get(function(response) {

                                         console.log(response.room.open, parseInt(response.room.open));

                                         if (parseInt(response.room.open) == 1)
                                         {
                                             ROOM.key = response.room.key;

                                             clearInterval(ROOM.tester)

                                             PEER.client.join()
                                         }
                                     });

                          if (i >= ROOM.tester_limit)
                          {
                              PEER.server.new();
                              clearInterval(ROOM.tester);
                          }

                          i++;

                      }, ROOM.tester_timing);
    }
    else
        PEER.client.join()
};

ROOM.open_the_door = function() {
    if (document.getElementById('loading') != null)
        document.getElementById('loading').remove();

    ROOM.open = 1;
};

ROOM.get = function(callback) {

    XHR.get('/api/room/get/argv/id/' + ROOM.id, function(response) {

        if (typeof callback == "function")
            callback(JSON.parse(response));
    });
};

ROOM.isOpen = function(callback) {

    XHR.get('/api/room/isOpen/argv/id/' + ROOM.id, function(response) {

        if (typeof callback == "function")
            callback(JSON.parse(response));
    });
};

ROOM.close_the_door = function() {

    if (PEER.hoster)
        XHR.get('/api/room/close/argv/id/' + ROOM.id);
};

ROOM.removeVideo = function() {

    CHAT.current.classList.remove('_small');

    each(document.getElementById('videos').querySelectorAll('*'), function(item) {
        item.remove();
    });
};

ROOM.postMessage = function(event) {

    if (event.keyCode == 13)
    {
        var msg = event.target.value;

        if (msg.trim() != "")
        {
            CHAT.postMessage(msg);
            CHAT.form.querySelector('textarea').value = "";
        }
    }

    event.preventDefault();
    event.stopPropagation();
    return false;
};

ROOM.disconnect = function(event) {

    PEER.current.close();
};