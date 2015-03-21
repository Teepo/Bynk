
Lazy = {};
Lazy.list = {};
Lazy.queue = [];
Lazy.processing = false;

// loaded ??
Lazy.loaded = function(name) {
    // on retourne l'etat si possible
    if (Lazy.list[name])
        return Lazy.list[name];
    else if (Lazy.list["url_" + name])
        return Lazy.list["url_" + name];

    return false;
};

// travers obj
// je sais pas du tout si cest bien :S
Lazy.lauch = function(o) {

    var  ret = null;
    // Si oload pas present, c'est plus bloquant
    if (Lazy.list[o.className] < 3) {
        try { ret = m['oload'](); }
        catch (e) { }
        Lazy.list[o.className] = 3;
    }

    if (o.cb) {
        if (typeof(o.cb) == "function") o.cb();
        else m[o.cb]();
    }
    Lazy.next();
    return ret;
};

Lazy.stored = {};

Lazy.process = function(o) {
    // on veu loader un css
    //  if (o.className == "")

    // si on veu juste loader un fichier js
    // (genre callbacks sans forcement de CB apres)
    if (o.className == null && o.url) {
        if (Lazy.list["url_" + o.url]) {

            console.log("on a deja loader " + o.url);

            // cb
            if (typeof(o.cb) == "function") o.cb(Lazy.stored[o.url] || null);

            // :next:
            Lazy.next();

            return true;
        }

        // on set letat a 1
        Lazy.list["url_" + o.url] = 1;

        if (o.url.search(/\.css$/) != -1 || o.opts.type == "css") { // CSS

            (function(o) {

                var f;
                var __done = false;

                f = document.createElement("link");
                f.type = "text/css", f.rel = "stylesheet", f.charset = "utf-8";
                f.href = o.url + ((o.opts.cache == true || o.opts.cache == undefined) ? '' : '?' + BYNK.version);

                f.onload = f.onreadystatechange = function() {

                    if (!__done && (!this.readyState
                                    || this.readyState === 'loaded'
                                    || this.readyState === 'complete'
                                    || this.readyState === 'interactive')) {

                        __done = true;
                        Lazy.list["url_" + o.url] = 3;

                        if (typeof(o.cb) == "function") o.cb();
                        Lazy.next();

                    }

                }

                document.getElementsByTagName("head")[0].appendChild(f);

            // ya pas de onload possible
            Lazy.next();

            })(o);

        }
        else
        { // SCRIPTS
            (function(o) {
                if (o.opts && o.opts.store == true) {
                    $.get(o.url + '?' + BYNK.version, function(data) {
                        Lazy.list["url_" + o.url] = 3;
                        if (typeof(o.cb) == "function") o.cb(data);
                        if (o.opts && o.opts.store === true) Lazy.stored[o.url] = data;

                        // :next:
                        Lazy.next();
                    });
                }
                else {

                    var f;
                    var __done = false;

                    f = document.createElement("script");
                    f.type = "text/javascript";
                    f.src = o.url + (((o.opts.cache == true || o.opts.cache == undefined) && o.url.indexOf('/admin') == -1) ? '' : '?' + BYNK.version);

                    f.onload = f.onreadystatechange = function() {

                        if (!__done && (!this.readyState
                                        || this.readyState === 'loaded'
                                        || this.readyState === 'complete'
                                        || this.readyState === 'interactive')) {

                            __done = true;
                            Lazy.list["url_" + o.url] = 3;

                            if (typeof(o.cb) == "function") o.cb();

                            Lazy.next();
                        }
                    }

                    f.onerror = function() {
                        console.log("Lazy > process > 1 on a pas reussi a charger ca : '" + o.url + "'");
                    }

                    document.getElementsByTagName("head")[0].appendChild(f);
                }
            })(o);
        }
        return true;
    }

    // si on possede deja le .js
    if (Lazy.list[o.className] >= 1) {

        if (Lazy.list[o.className] > 1)
            return Lazy.lauch(o);
        return -1;
    }

    // si faut dl et executer le js
    // on set l'etat a 1
    Lazy.list[o.className] = 1;

    (function(o) {
        var f;
        var __done = false;

        f = document.createElement("script");
        f.type = "text/javascript";
        f.src = o.url + (((o.opts.cache == true || o.opts.cache == undefined) && o.url.indexOf('/admin') == -1) ? '' : '?' + BYNK.version);
        f.onload = f.onreadystatechange = function() {

            if (!__done && (!this.readyState
                            || this.readyState === 'loaded'
                            || this.readyState === 'complete'
                            || this.readyState === 'interactive')) {

                __done = true;
                // on set l'etat a 2
                Lazy.list[o.className] = 2;
                Lazy.lauch(o);

            }

        }
        f.onerror = function() {
            console.log("BYNK > Lazy > process > 1 on a pas reussi a charger ca : '" + o.url + "'");
        }
        document.getElementsByTagName("head")[0].appendChild(f);
    })(o);
};

Lazy._oExist = function(o, tester, automake) {

    if (tester.length == 0) return (o);

    if ( !( (t = tester.shift()) in o) ) {
        if (automake === true && t != "admin") o[t] = {};
        else return (false);
    }
    return Lazy._oExist(o[t], tester, automake);
};

Lazy.oExist = function(className, automake) {
    var tester = className.split('.');
    if (automake === false) tester.pop();
    return (Lazy._oExist(Melty, tester, automake));
};

Lazy._waitGroupDependance = 0;
Lazy._waitdependance = 0;
Lazy.next = function() {
    if (Lazy.queue.length > 0) {
        //var currentGroup = Lazy.queue.shift();
        var current = Lazy.queue[0].shift();

        if (current instanceof Array)
            current = {className: current[0],
                       url: current[1],
                       cb: current[2],
                       opts: current[3] || {}};

        if (current.cb !== null && typeof current.cb == "object") {
            current.opts = current.cb;
            current.cb = null;
        }

        if (current.url.substr(0, 1) == '/')
            current.url = 'http://' + (CONF.domain.main_sub + (CONF.domain.main_sub.length > 0 ? '.' : ''))
                + CONF.domain.name /*+ '.'*/ // Quand on a un vrai domain
                + (CONF.domain.ext ? CONF.domain.ext : CONF.domain.getEXT(document.domain)) + current.url;

        if (current.className && !current.depend)
            current.depend = current.className;

        if (current.depend
            && (!current._depend || current._depend == false))
            current['_depend'] = Lazy.oExist(current.className, !!current.opts.make)

        if (current.className)
            var key = current.className;
        else
            var key = "url_" + current.url;

        if ((!current['depend'] || current['_depend'] != false)
            && (typeof Lazy.list[key] == "undefined"
                || (typeof Lazy.list[key] != "undefined"
                    && Lazy.list[key] == 3))) {

                // Si on gogo pour process, c'est que tout est OK
                // Et il faut dans ce cas shift group par group egalement
                if (Lazy.queue[0].length == 0)
                    Lazy.queue.shift();
                Lazy._waitdependance = 0;

                return Lazy.process(current);
                //return Lazy.process(current);
        }

        // Ok, on a pas dl nos dependances
        Lazy._waitdependance++;

        // On refou celui ci a la fin, et on espere quon va dl le bon bientot
        // MAJ : On remet celui ci au debut, ce qui bloque le processus, et evite ce genre de chose :
        // - 'admin.search_input' dependance OK ?
        // - pas de 'admin' -> on fou 'admin.search_input' a la fin
        // (dl de admin)
        // - 'admin.alert' depedance OK ?
        // - OUI, on dl 'admin.alert'
        // - plantage car dans le init, on need 'admin.search_input'
        Lazy.queue[0].unshift(current);
        if (Lazy._waitdependance <= Lazy.queue[0].length && Lazy._waitdependance > 0) Lazy.next();
        else {
            Lazy._waitGroupDependance++;

            // On push le group a la fin
            if (Lazy._waitGroupDependance < Lazy.queue.length) {
                Lazy.queue.push(Lazy.queue.shift());
                Lazy.next();
            }
            else Lazy.processing = false;
        }
    }
    else Lazy.processing = false;
};

Lazy.run = function() {
  Lazy.processing = true;
  // EVENT lazy loading

  Lazy.next();
};

// Si typeof className = array : on recoit un groupe de prevent !
// Sinon, c'est du classique
Lazy.prevent = function(className, url, cb, opts) {
    var group = null;
    if (className instanceof Array) group = className;
    else group = [[className, url, cb, opts]];

    Lazy._waitGroupDependance = 0;

    //var o = {"className": className, "url": url, "cb": cb};
    Lazy.queue.push(group);

    // on lance le processing si on a pas encore lancer kk chose
    if (Lazy.processing == false) Lazy.run();

};

// Init for the lazy image and facebook part

Lazy.viewport = {};
// Instant check the current viewport
Lazy.viewport.items = {};
Lazy.viewport.disable = false;

Lazy.twitter_widgets_load = function() {
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twi\
tter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");

    if (window.twttr !== undefined)
        twttr.widgets.load();
};