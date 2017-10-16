var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x

if (window.attachEvent) //if IE (and Opera depending on user setting)
    window.attachEvent("on"+mousewheelevt, function(e){parent.scrollEvent(e)})
else if (window.addEventListener) //WC3 browsers
    window.addEventListener(mousewheelevt, function(e){parent.scrollEvent(e)}, false)

// $(window).on("on"+mousewheelevt, parent.scrollEvent);
// $(window).on('touchstart', parent.touchStart);
// $(window).on('touchend', parent.touchEnd);
