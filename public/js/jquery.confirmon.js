/*!
 * jQuery confirmOn Plugin 0.1.4
 * https://github.com/invetek/jquery-confirmon
 *
 * Copyright 2015 Loran Kloeze - Invetek
 * Released under the MIT license
 */

/*
 * Bug(?): event.preventDefault() has to be called to prevent native handlers  (line 176)
 *
 */

(function($) {
    var confirmOn = $.confirmOn = {};

    confirmOn.providedOptions = {};

    confirmOn.defaultSettings = {
        questionText: 'Are you sure?',
        classPrepend: 'confirmon',
        textYes: 'Yes',
        textNo: 'No',
        onShow: null
    };

    confirmOn.overrideDefaultSettings = function(settings) {
        confirmOn.defaultSettings = $.extend({}, confirmOn.defaultSettings, settings);
    };

    confirmOn.setOptions = function($element, options) {
        options = $.extend({}, confirmOn.defaultSettings, options);
        $element.data('confirmon', {
            options: options
        });
    };

    confirmOn.createOverlay = function($element) {
        var classPrepend = $element.data('confirmon').options.classPrepend;
        return $('<div/>').addClass(classPrepend + '-overlay').hide().appendTo('body');
    };

    confirmOn.showOverlay = function($element) {
        var classPrepend = $element.data('confirmon').options.classPrepend;
        $('.' + classPrepend + '-overlay').fadeIn();
    };

    confirmOn.deleteOverlay = function($element) {
        var classPrepend = $element.data('confirmon').options.classPrepend;
        $('.' + classPrepend + '-overlay').fadeOut(function(){
            $(this).remove();
        });
    };

    confirmOn.createBox = function($element) {
        var classPrepend = $element.data('confirmon').options.classPrepend;
        var questionText = $element.data('confirmon').options.questionText;
        var textYes = $element.data('confirmon').options.textYes;
        var textNo = $element.data('confirmon').options.textNo;

        var $box = $('<div/>').addClass(classPrepend + '-box').hide().appendTo('body');
        $('<p class="' + classPrepend + '-content"/>')
            .html(questionText)
            .appendTo($box);
        $('<button class="' + classPrepend + '-button ' + classPrepend + '-button--yes"/>')
            .html(textYes)
            .appendTo($box);
        $('<button class="' + classPrepend + '-button ' + classPrepend + '-button--no"/>')
            .html(textNo)
            .appendTo($box);

        $('.' + classPrepend + '-button').on('keydown', function(e){
            if (e.which === 9) { //Tab key
              e.preventDefault();
              $('.' + classPrepend + '-button').not(this).focus();
            }
        });

    };

    confirmOn.showBoxAndFocusNo = function($element) {
        var classPrepend = $element.data('confirmon').options.classPrepend;
        $('.' + classPrepend + '-box').fadeIn(function(){
            $(this).children('button').eq(1).focus();
        });
    };

    confirmOn.deleteBox = function($element) {
        var classPrepend = $element.data('confirmon').options.classPrepend;
        $('.' + classPrepend + '-box').fadeOut(function(){
            $(this).remove();
        });
    };

    $.confirmOn.handleEscKey = function($element) {
        $(document).on('keydown.confirmon.close', function(e){
            if (e.which === 27) { //Esc key
                $.confirmOn.deleteOverlay($element);
                $.confirmOn.deleteBox($element);
                $(document).off('keydown.confirmon.close');
            }
        });
    }

    confirmOn.convertArguments = function(options, events, selector, data, handler) {
        if (typeof options === 'object') {
            $.each(options, function(key, val) {
                if (typeof val === 'string' || key === 'onShow') { //Options provided so shift all args to left
                    confirmOn.providedOptions = options;

                    options = events;
                    events = selector;
                    selector = data;
                    data = handler;
                    return false;
                } else { //No options
                    confirmOn.providedOptions = {};
                }
            });
        } else {
           confirmOn.providedOptions = {};
        }

        if (selector == null && data == null && handler == null) {
            //(events[S], handler)
            selector = events;
            events = options;
        } else if (data == null && handler == null) {
            //(events[S], selector, handler)
            //(events[S], data, handler)
            data = selector;
            selector = events;
            events = options;
        } else {
            handler = data;
            data = selector;
            selector = events;
            events = options;
        }

        if (typeof events === 'object') {
            //Implementation .on( events [, selector ] [, data ] )
            return {
                events: events,
                selector: selector,
                data: data
            };
        } else {
            //Implementation .on( events [, selector ] [, data ], handler(eventObject) )
            return {
                events: events,
                selector: selector,
                data: data,
                handler: handler
            };
        }


    };

    $.confirmOn.attachHandlers = function($element, handler, event) {
        var classPrepend = $element.data('confirmon').options.classPrepend;
        var $attached_element = $element[0];
        if (typeof $.confirmOn.onArgs !== 'undefined') {
          if (typeof $.confirmOn.onArgs.selector !== 'function') {
            $attached_element = $($.confirmOn.onArgs.selector);
          }
        }

        $('.' + classPrepend + '-box button').eq(0).on('click', function(){
            $.confirmOn.deleteOverlay($element);
            $.confirmOn.deleteBox($element);
            handler.call($attached_element, event, true); //Call the handler function. the TRUE parameter indicates that the user pressed the YES button

        });

        $('.' + classPrepend + '-box button').eq(1).on('click', function(){
            $.confirmOn.deleteOverlay($element);
            $.confirmOn.deleteBox($element);
            handler.call($attached_element, event, false); //Call the handler function. the FALSE parameter indicates that the user pressed the YES button

        });

    };

    $.fn.confirmOn = function(options, events, selector, data, handler) {
        this.each(function(){
            var userHandler;
            var org_events = events;
            var org_selector = selector;
            var org_data = data;
            var org_handler = handler;
            if (typeof events === 'function') {
                userHandler = events;
                org_events = confirmHandler;
            } else if (typeof selector === 'function') {
                userHandler = selector;
                org_selector = confirmHandler;
            } else if (typeof data === 'function') {
                userHandler = data;
                org_data = confirmHandler;
            } else if (typeof handler === 'function') {
                userHandler = handler;
                org_handler = confirmHandler;
            }

            var $element = $(this);
            $.confirmOn.onArgs = $.confirmOn.convertArguments(options, org_events, org_selector, org_data, org_handler);
            $.confirmOn.setOptions($element, $.confirmOn.providedOptions);
            $element.on($.confirmOn.onArgs.events, $.confirmOn.onArgs.selector, $.confirmOn.onArgs.data, $.confirmOn.onArgs.handler);

            function confirmHandler(event) {
                event.preventDefault();
                var doShow = true;                
                if (typeof $element.data('confirmon').options.onShow === 'function') {
                  doShow = $element.data('confirmon').options.onShow.call();  
                }                
                if (doShow === false) { return; }
                              
                $.confirmOn.createOverlay($element);
                $.confirmOn.showOverlay($element);
                $.confirmOn.createBox($element);
                $.confirmOn.showBoxAndFocusNo($element);
                $.confirmOn.handleEscKey($element);
                $.confirmOn.attachHandlers($element, userHandler, event);
            };
        });

    };

}(jQuery));
