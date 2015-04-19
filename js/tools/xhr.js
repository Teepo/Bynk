// xhr
XHR = {};

XHR.urlSerialize = function(obj)
{
    var str = [];
    for(var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

XHR.ajax = function(url, options, cb) {

    var opts = XHR.prepare(options, cb);

    opts.method = opts.method || 'GET';
    opts.content = opts.content ||  'text';
    opts.data = opts.params || '';
    opts.async = /*opts.async || true*/ false;
    opts.contentType = opts.contentType || 'application/x-www-form-urlencoded';
    opts.cb = opts.cb || function() {};
    opts.errno = opts.errno || false; // this option determine if errors are detected in the callback or not
    opts.error = opts.error || null;

    if (/\.json/.test(url))
        opts.content = 'json';

    if (typeof opts.data != 'string')
        opts.data = XHR.urlSerialize(opts.data);
    if (opts.method == 'GET' && opts.data.length > 0)
        url += '?' + opts.data;

    var r = new XMLHttpRequest();
    r.open(opts.method, url, opts.async);
    r.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    r.setRequestHeader('Content-Type', opts.contentType);

    r.onreadystatechange = function(e) {

        if (r.readyState == 4) {

            // we prepare the callback arg (empty value first)
            var data = null;

            if (r.status == 200) {

                if (opts.content == 'json'
                    || (opts.error != null
                        && typeof opts.error == 'function')) {

                    try {
                        data = JSON.parse(r.responseText);
                    }
                    catch (e) {
                        data = {};
                        console.warn('Could not parse response to JSON (' + e + '): ' + r.responseText);
                    }

                }
                else {
                    data = r.responseText || '';
                }

                opts.cb(data);
            }
            else
                console.log(url + ' return an http error code' + r.status);
        }
    }

    r.send(opts.data);
};

// check if the options and the callback are reversed
XHR.prepare = function(options, callback) {

    if (typeof options == 'object') {

        if (typeof callback == 'function')
            options.cb = callback;
        return options;

    }
    else if (typeof options == 'function') {

        if (typeof callback == 'object') {
            callback.cb = options;
            return callback;
        }

        return {'cb': options};
    }

    else if (typeof callback == 'function')
        return {'cb': callback};

    else if (typeof callback == 'object') {

        if (typeof options == 'function')
            callback.cb = options;

        return callback;
    }

    return {};
};

XHR.get = function(url, cb, options) {
    opts = XHR.prepare(options, cb);
    opts.method = 'GET';
    XHR.ajax(url, opts);
};

XHR.post = function(url, cb, options) {
    opts = XHR.prepare(options, cb);
    opts.method = 'POST';
    XHR.ajax(url, opts);
};