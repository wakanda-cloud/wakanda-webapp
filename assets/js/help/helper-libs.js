/**
 * Created by ventura on 6/25/17.
 */

var GlowElement = function(){};
GlowElement.interval = [];
GlowElement.do = function(element) {
    $(element).css('z-index', 200);
    $(element).css('box-shadow', '0px 0px 5px #yellow');
    $(element).css('border:none');
    GlowElement.interval.push(setInterval(function () {
        $(element).css('box-shadow', '0px 0px 12px yellow');
        setTimeout(function () {
            $(element).css('box-shadow', '0px 0px 5px yellow');
        }, 500);
    }, 1000));
};

GlowElement.undo = function(elementGlowed) {
    removeBlackScreen();
    GlowElement.interval.forEach(function(element) {
        clearInterval(element);
        setTimeout(function() {
            $(elementGlowed).css('box-shadow', '');
        }, 1000)
    });
};

var GlowElementWhite = function(){};
GlowElementWhite.interval = [];
GlowElementWhite.do = function(element) {
    $(element).css('z-index', 200);
    $(element).css('box-shadow', '0px 0px 5px #fff');
    $(element).css('border:none');
    GlowElementWhite.interval.push(setInterval(function () {
        $(element).css('box-shadow', '0px 0px 12px #fff');
        setTimeout(function () {
            $(element).css('box-shadow', '0px 0px 5px #fff');
        }, 500);
    }, 1000));
};

GlowElementWhite.undo = function(elementGlowed) {
    removeBlackScreen();
    GlowElement.interval.forEach(function(element) {
        clearInterval(element);
        setTimeout(function() {
            $(elementGlowed).css('box-shadow', '');
        }, 1000)
    });
};

var Helper = function(){};

Helper.prototype.run = function(helper) {
    addBlackScreen();
    demo.showNotification('top', 'right', i18n(helper.notification), 'info');

    var undoFunction = null;
    var elementsChanged = [];
    helper.actions.forEach(function(element, index) {
        undoFunction = element.action.undo;
        let elementChanged = document.querySelector(element.element);
        elementsChanged.push(elementChanged);
        element.action.do.call(this, elementChanged);
    });

    let stopTriggers = helper.stopTrigger;
    stopTriggers.forEach(function(stopTrigger) {
        let undoExecutorFunction = function() {
            elementsChanged.forEach(function(element) {
                undoFunction.call(this, element);
            });
            $(stopTrigger.element).unbind(stopTrigger.event, undoExecutorFunction);//unbind after first call
        };

        $(stopTrigger.element).bind(stopTrigger.event, undoExecutorFunction);
    });
};

function addBlackScreen () {
    var $div = $('<div>');
    $div.attr('id', 'blackscreen_div');
    $div.css({
        "display": "none",
        "position": "absolute",
        "width": "100%",
        "height": "100%",
        "pointer-events": "none",
        "top": 0,
        "left": 0,
        "background": "none repeat scroll 0 0 rgba(0,0,0,0.5)",
        "vertical-align": "middle",
        "z-index": "9"
    });
    $('body').prepend($div);
    $div.fadeIn(1500);
}

function removeBlackScreen() {
    $('#blackscreen_div').remove();
}