var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x

if (window.attachEvent) //if IE (and Opera depending on user setting)
    window.attachEvent("on"+mousewheelevt, function(e){scrollEvent(e)})
else if (window.addEventListener) //WC3 browsers
    window.addEventListener(mousewheelevt, function(e){scrollEvent(e)}, false)
$(window).on('touchstart', touchStart);
$(window).on('touchend', touchEnd);
$(window).keypress(onSpaceKeyPress);
$(document).on('click', closeNavOnClickDocument);
function onSpaceKeyPress(e){
  if(e.keyCode === 0 || e.keyCode === 32){
    e.preventDefault();
    if(e.shiftKey){
      $(".carousel").carousel("prev");
    }
    else{
      $(".carousel").carousel('next');
    }
  }
}
function scrollEvent(e){
  var evt = window.event || e;
  var delta = evt.detail? evt.detail*(-4) : evt.wheelDelta;
  if(delta< -150) {
      $(".carousel").carousel('next');
      setTimeout(function(){}, 2000);
  }else if(delta > 150) {
   //scroll up
    $(".carousel").carousel('prev');
    setTimeout(function(){}, 2000);
  }      
}
var ts;
function touchStart(e){
  ts = e.originalEvent.touches[0].clientY;
}
function touchEnd(e){
  var te = e.originalEvent.changedTouches[0].clientY;
 if(ts > te+10){
    $(".carousel").carousel('next');
 }else if(ts < te-10){
    $(".carousel").carousel('prev');
 }
}
function closeNavOnClickDocument(event){
  if(!$(event.target).closest('#mySidenav').length && !$(event.target).closest('#hamburger').length) {
    if($('#mySidenav').is(":visible")) {
        closeNav();
    }  
  }
}
