var TOGGLER = function(event) {
    var target = $(e.target);
    var toToggle = $(target.attr('_toggle'));
    var effect = target.attr('_toggleEffect');

    // Effect
    if (effect == 'none')
        toToggle.toggle();
    else if (effect == 'overflowSwitch')
        {
            if (toToggle.css('overflow') == 'visible')
                toToggle.css('overflow', 'hidden').css('height', '');
            else
                toToggle.css('overflow', 'visible').css('height', '100%');
        }
    else
        toToggle.slideToggle();

    // One-Way or Two-Way ?
    if (target.hasClass('toggler-one-way'))
        target.remove();
    else
        target.toggleClass('toggled');
};