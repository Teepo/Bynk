var BYNK = {};

BYNK.version = 1;

BYNK.VIDEO = null;

BYNK.init = function() {
};

document.addEventListener('DOMContentLoaded', BYNK.init);

function closest (elem, selector) {

    var parents = [];
    if (selector)
        var firstChar = selector.charAt(0);

    // Get matches
    for ( ; elem && elem !== document; elem = elem.parentNode)
    {
        if (selector)
        {
            // If selector is a class
            if (firstChar === '.')
            {
                if (elem.classList.contains( selector.substr(1)))
                    parents.push(elem);
            }

            // If selector is an ID
            if (firstChar === '#')
            {
                if (elem.id === selector.substr(1))
                    parents.push(elem);
            }

            // If selector is a data attribute
            if (firstChar === '[')
            {
                if (elem.hasAttribute(selector.substr(1, selector.length - 1)))
                    parents.push(elem);
            }

            // If selector is a tag
            if (elem.tagName.toLowerCase() === selector)
                parents.push(elem);
        }
        else
            parents.push(elem);
    }

    // Return parents if any exist
    if (parents.length === 0)
        return null;
    else
    {
        if (parents.length === 1)
            return parents[0];
        else
            return parents;
    }
}

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