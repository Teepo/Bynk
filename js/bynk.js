var BYNK = {};

BYNK.version = 1;

BYNK.VIDEO = null;

BYNK.init = function() {
};

document.addEventListener('DOMContentLoaded', BYNK.init);

function each (items, func)
{
    if (func == null || typeof func == "undefined")
    {
        console.error("[TOOLS] You run each() without callback.");
        return false;
    }

    [].forEach.call(items, function(item) {
        func(item)
    });
}