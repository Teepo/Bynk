
CONF = {};

// globals
CONF.id = null;
CONF.content = true;
CONF.debug = true;
CONF.confed = false;

// env
CONF.env = {};

// domains
CONF.domain = {};
CONF.domain.sub = "";
CONF.domain.main_sub = "";
CONF.domain.currentURL = null;
CONF.domain.name = "localhost:8888";
CONF.domain.URI = null;
CONF.domain.path = false;
CONF.domain._r_uri = null;
CONF.domain.safe_name = CONF.domain.name;
CONF.domain.instance_name = CONF.domain.name;

CONF.domain.isMe = function(host) {

    if (host.substr(0, 1) == '/')
        return true;
    var sub = host.search('(?:[^A-z]|^|[./])' + CONF.domain.URI);
    if (sub >= 0)
        return (host.substr(0, sub));
    return (false);
};

CONF.domain.isMediaDomain = function(host) {
    if (CONF.domain.isMe(host) === false)
        return false;
    if (host.substr(0, CONF.media.default_sub_domain.length + 1) != CONF.media.default_sub_domain + '.')
        return false;
    return true;
};

// is Network ??
CONF.domain.isNetwork = function(host) {
    if (CONF.domain.isMe(host) !== false)
        return true;
    if (CONF.domain.tab_network === null)
        return false;

    // on commence par degager l'extension
    host = host.substr(0, host.lastIndexOf('.') + 1);

    for (var domain in CONF.domain.tab_network)
        if (host.search('\\.' + domain + '\\.') >= 0)
            return domain;
    return false;
};

// function to get the URI in a str
CONF.domain.getURI = function(host) {
    host = host.replace(/http:\/\//, '');
    var end = host.indexOf('/');
    if (end < 0) return (host);
    else return host.slice(0, end);
};

// function to get the URN in a str
CONF.domain.getURN = function(host) {
    host = host.replace(/http:\/\//, '');
    var start = host.indexOf('/');
    if (start < 0) return ('');
    else return host.slice(start).replace(/^\/*/, '');
};

// function to get the extention in a str
CONF.domain.getEXT = function(host, domain) {
    if (!domain)
        domain = CONF.domain.safe_name;
    return host.slice(host.lastIndexOf(domain + '.') + domain.length + 1);
};

// function to get the subdomain in a str
CONF.domain.getSUB = function(host, easy) {
    // Le mode easy est juste pour nous :)
    //  car on se sert de NOS variables (host + ext)
    // -1 pour le '.' avant l'EXT
    // -1 pour le '.' avant le nom
    if (easy === true) {
        // Gaff a l'extension, ca bouge :)
        var ext = CONF.domain.getEXT(host);
        var sub = host.substr(0, host.length - CONF.domain.name.length - ext.length - 1 - 1);
        if (sub.length == 0) sub = CONF.domain.sub;
        return sub;
    }
    else {
        console.log("Yen a reelement besoin ?????");
        return "NON";
    }
};

// init
CONF.domain.init = function() {

    CONF.domain.ext = CONF.domain.getEXT(document.domain);
    CONF.domain.sub = CONF.domain.getSUB(document.domain, true);

    // Check du path, si non vide, au prochain changement de page, on clean en allant sur /
    if (document.location.pathname && document.location.pathname != "" && document.location.pathname != "/")
        CONF.domain.path = true;

    // name + ext
    CONF.domain.URI = CONF.domain.name + '.' + CONF.domain.ext;

    CONF.domain.URL = "http://" + (CONF.domain.sub ? CONF.domain.sub + '.' : '') + CONF.domain.URI + "/";

    CONF.domain.currentURL = document.location.href;

    // on set le domain a un domain propre
    document.domain = CONF.domain.safe_name + '.' + CONF.domain.ext;
};

CONF.domain.getDevTLD = function() {
    if (CONF.env.isProd() === true) return '';
    return CONF.domain.ext.slice(CONF.domain.ext.lastIndexOf('.'));
};

// init
CONF.env.init = function() {
    // Domaine de dev ou non ?
    CONF.env.dev = false;
    if ($('body').attr('_dev')) CONF.env.dev = true;
};

CONF.env.isProd = function() {
    if (CONF.env.dev == true) return false;
    return true;
};

// init
CONF.init = function() {

    if (CONF.confed == true) return;

    CONF.confed = true;

    // on initialise les variables d'environnement
    CONF.env.init();

    // on initialise le domain
    CONF.domain.init();

    if (CONF.env.isProd() == false || CONF.domain.ext == 'demo')
        CONF.id = Math.floor(Math.random() * 5);
    else
        CONF.id = new Date().getTime();
};

if (!CONF.i18n)
    CONF.i18n = {}

CONF.trans = function(string)
{
    return (typeof CONF.i18n[string] != "undefined") ? CONF.i18n[string] : string;
}