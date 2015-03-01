var BYNK = {};

BYNK.VIDEO = null;

BYNK.init = function() {

    var a = new VIDEO.runner
    a.init();
};

document.addEventListener('DOMContentLoaded', BYNK.init);