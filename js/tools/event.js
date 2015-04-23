var EVENT = {};

EVENT.triggerCustom = function(el, name, data) {

    var event = document.createEvent('CustomEvent');
    event.initCustomEvent(name, true, true, data);

    el.dispatchEvent(event);
}

EVENT.trigger = function(el, name) {

    var evt;

    if (document.createEventObject) {
        evt = document.createEventObject();
        return el.fireEvent('on' + name, evt);
    }
    else {
        evt = document.createEvent("HTMLEvents");
        evt.initEvent(name, true, true);
        return !el.dispatchEvent(evt);
    }
};

EVENT.add = function (items, name, func) {

    if (items != null)
    {
        if (items.nodeType == Node.ELEMENT_NODE)
            items.addEventListener(name, func);
        else
        {
            each(items, function(item) {
                item.addEventListener(name, func);
            });
        }
    }
};