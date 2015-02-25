(function($, w, doc) {

    var dropMenu = {

        init: function(config) {
            var fx = config.fx || 'slide';
            var trigger = config.trigger || '.trigger';
            var nav = config.nav || '.nav';
            var evt = config.evt || 'click';

            if (window.jQuery) {
                if (trigger instanceof Array) {
                    for (var i = 0; i < trigger.length; i = i + 1) {
                        $(trigger[i]).on(evt, function(e) {
                            dropMenu['__' + fx](nav);
                        });
                    }
                } else {
                    $(trigger).on(evt, function(e) {
                        dropMenu['__' + fx](nav);
                    });
                }

            }
        },
        __slide: function(nav) {
            $(nav).slideToggle();
        },
        __fade: function(nav) {
            $(nav).fadeToggle();
        }
    };




    dropMenu.init({
        trigger: '.trigger',
        nav: '.nav',
        fx : 'slide'
    });





}(jQuery, window, document));