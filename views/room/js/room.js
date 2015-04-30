var ROOM = {}

ROOM.info = {};

ROOM.info.id = null;
ROOM.info.url = null;
ROOM.info.title = null;
ROOM.info.token = null;
ROOM.info.existed_before = null;
ROOM.info.open = null;

ROOM.tester = null;
ROOM.tester_timing = 1000;
ROOM.tester_limit = 2;

ROOM.form = null;
ROOM.header = null;
ROOM.content = null;
ROOM.aside = null;

ROOM.init = function(id, url, title, token, existed_before, open) {

    CHAT.init();

    ROOM.info.id = id;
    ROOM.info.url = url;
    ROOM.info.title = title;
    ROOM.info.token = token;
    ROOM.info.existed_before = existed_before;
    ROOM.info.open = open;

    if (ROOM.info.existed_before == 0 && ROOM.info.open == 0)
        ROOM.create();
    else
        ROOM.join(ROOM.info);

    ROOM.header = document.querySelector('#room header');
    ROOM.content = document.getElementById('content');
    ROOM.form = ROOM.content.querySelector('form');
    ROOM.aside = document.getElementById('rooms');

    ROOM.content.querySelector('.button._on').addEventListener('click', CHAT.launchVideo);
    ROOM.content.querySelector('.button._off').addEventListener('click', CHAT.killVideo);

    ROOM.content.querySelector('.icon.edit').addEventListener('click', ROOM.updateTitle);

    ROOM.form.addEventListener('keyup', ROOM.postMessage);

    document.addEventListener('autocomplete', ROOM.searching);
};

ROOM.searching = function() {

    EVENT.add(ROOM.aside.querySelectorAll('.row'), 'click', ROOM.choose);
};

ROOM.video_per_line = 3;
ROOM.fitVideo = function() {

    var videos = document.getElementById('videos').querySelectorAll('video');

    each(videos, function(video) {
        video.style.width = "33%";
    });

    // last line doesn't complete, resize it
    var modulo = videos.length % 3;
    if (modulo > 0)
    {
        var x = 1;
        for (var i = videos.length; i > (videos.length - modulo); i--)
        {
            videos[i - 1].style.width = (100 / modulo) + "%";

            x++;
        }
    }
};

ROOM.choose = function(event) {

    var row = closest(event.target, '.row');

    var room = {};
    room.id = row.getAttribute('data-id');
    room.open = 0;

    ROOM.join(room, function() {

        // update room title
        ROOM.content.querySelector('h2').textContent = ROOM.url;

        // erase all messages.
        each(CHAT.list.querySelectorAll('.row'), function(item) {
            item.remove();
        })
    });
};

ROOM.updateTitle = function() {

    // replace title by an input
    var dom = Template.process('.templates.edit_room_title')(ROOM.info);
    ROOM.content.querySelector('h2').innerHTML = dom;

    // when choosing title
    ROOM.content.querySelector('h2 input[type="text"]').addEventListener('blur', function() {

        XHR.get('/room/api/set_title/argv/id/' + ROOM.info.id + '/title/' + this.value, function(response) {

            response = JSON.parse(response);

            ROOM.info = response.room;

            // Re-display title
            var dom = Template.process('.templates.display_room_title')(ROOM.info);
            ROOM.content.querySelector('h2').innerHTML = dom;

            // Re-up event
            ROOM.content.querySelector('.icon.edit').addEventListener('click', ROOM.updateTitle);
        });
    });
};

ROOM.getTitle = function(room) {

    if (typeof room.title != "undefined" && room.title != null && room.title != "")
        return room.title;

    return room.url;
};

ROOM.create = function() {

    PEER.server.new();
};

ROOM.update_token = function(callback) {

    XHR.get('/api/room/set_token/argv/url/' + ROOM.info.url + '/token/' + ROOM.info.token, function() {
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

                                             ROOM.info = response.room;

                                             clearInterval(ROOM.tester)

                                             PEER.client.join(ROOM.info);

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

    ROOM.info.open = 1;
};

ROOM.get = function(room, callback) {

    XHR.get('/api/room/get/argv/id/' + room.id, function(response) {

        if (typeof callback == "function")
            callback(JSON.parse(response));
    });
};

ROOM.isOpen = function(callback) {

    XHR.get('/api/room/isOpen/argv/id/' + ROOM.info.id, function(response) {

        if (typeof callback == "function")
            callback(JSON.parse(response));
    });
};

ROOM.close_the_door = function() {

    if (PEER.hoster)
        XHR.get('/api/room/close/argv/id/' + ROOM.info.id);
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