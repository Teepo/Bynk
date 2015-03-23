var Memoize = {};

Memoize.cacheId = 0;
Memoize.cache = {};

Memoize.process = function(func) {

    var CacheId = Memoize.cacheId++;
    Memoize.cache[CacheId] = {};

    return function(obj)
    {
        var storage = Memoize.cache[CacheId];
        if (storage[obj] == null)
            storage[obj] = func(obj);
        return storage[obj];
    };
};