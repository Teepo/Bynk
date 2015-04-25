(function(){

    var form = {};

    var AUTOCOMPLETE_MIN_CHAR = 3;

    form.init = function () {

        EVENT.add(document.querySelectorAll('form[autocomplete] input'), 'keyup', form.autocomplete);
    };

    form.autocomplete = function(event) {

        // dont trigger on arrow key
        if (event.keyCode >= 37 && event.keyCode <= 40)
            return false;

        var input = event.target;

        if (input.value.length < AUTOCOMPLETE_MIN_CHAR)
            return false;

        var _form = closest(input, 'form')
        var section = closest(_form, 'section');
        var url = _form.getAttribute('action') + "argv/name/" + input.value;

        XHR.get(url, function(response) {
            var handler = section.querySelector('.handler');

            handler.innerHTML = response;

            EVENT.triggerCustom(document, 'autocomplete', {
                target: _form
            });
        });
    };

    document.addEventListener('DOMContentLoaded', function() {
        form.init();
    });
})();