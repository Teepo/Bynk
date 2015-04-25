var ROOM = {}

ROOM.id = null;
ROOM.url = null;
ROOM.title = null;
ROOM.token = null;
ROOM.existed_before = null;
ROOM.open = null;

ROOM.tester = null;
ROOM.tester_timing = 1000;
ROOM.tester_limit = 2;

ROOM.form = null;
ROOM.header = null;
ROOM.content = null;
ROOM.aside = null;

ROOM.init = function(id, url, token, existed_before, open) {

    CHAT.init();

    ROOM.generate(id, url, token, open);

    if (ROOM.existed_before == 0 && ROOM.open == 0)
        ROOM.create();
    else
    {
        ROOM.join({
            id, url, token, existed_before, open
        });
    }

    ROOM.header = document.querySelector('#room header');
    ROOM.content = document.getElementById('content');
    ROOM.form = ROOM.content.querySelector('form');
    ROOM.aside = document.getElementById('rooms');

    ROOM.content.querySelector('.button._on').addEventListener('click', CHAT.launchVideo);
    ROOM.content.querySelector('.button._off').addEventListener('click', CHAT.killVideo);

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

ROOM.update_token = function(callback) {

    XHR.get('/api/room/set_token/argv/url/' + ROOM.url + '/token/' + ROOM.token, function() {
        if (typeof callback == "function")
            callback();
    });
};

ROOM.join = function(room, callback) {

    var _room = room;

    // on wait un peu, sinon on crée la room
    if (room.open == 0)
    {
        var i = 0;
        ROOM.tester = setInterval(function() {

                          var room = ROOM.get(_room, function(response) {

                                         if (parseInt(response.room.open) == 1)
                                         {

                                             ROOM.generate(
                                                 response.room.id,
                                                 response.room.url,
                                                 response.room.title,
                                                 response.room.token,
                                                 response.room.open
                                             );

                                             clearInterval(ROOM.tester)

                                             PEER.client.join(ROOM);

                                             if (typeof callback == "function")
                                                 callback();
                                         }
                                     });

                          if (i >= ROOM.tester_limit)
                          {
                              PEER.server.new();
                              clearInterval(ROOM.tester);

                              if (typeof callback == "function")
                                  callback();
                          }

                          i++;

                      }, ROOM.tester_timing);
    }
    else
    {
        PEER.client.join(room);

        if (typeof callback == "function")
            callback();
    }
};

ROOM.open_the_door = function() {
    if (document.getElementById('loading') != null)
        document.getElementById('loading').remove();

    ROOM.open = 1;
};

ROOM.get = function(room, callback) {

    XHR.get('/api/room/get/argv/id/' + room.id, function(response) {

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