var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x

if (window.attachEvent) //if IE (and Opera depending on user setting)
    window.attachEvent("on"+mousewheelevt, function(e){scrollEvent(e)})
else if (window.addEventListener) //WC3 browsers
    window.addEventListener(mousewheelevt, function(e){scrollEvent(e)}, false)

// $(window).on('mousewheel', scrollEvent);
$(window).on('touchstart', touchStart);
$(window).on('touchend', touchEnd);
$(document).ready(function(){
  $("#show-next-page").on('click', function(e){
    e.preventDefault();
    go_down();
  });
  $("#show-step-3").on('click', function(e){
    e.preventDefault();
    go_down();
  })
});
var url = window.location.href;
var timout_interval = 500;
function go_down(){
  if($("#city-animation").is(":visible")){
    setTimeout(function(){
      $("#city-animation").hide();
      $("#step3").hide();
      $("#step4").hide();
      // $("#table-animation").fadeIn(1000);
      $("#table-animation").css('display', 'block');
      $("#table-animation").css('opacity', '1');
      document.location.hash = "step2";
    }, timout_interval*2);
    setTimeout(function(){}, timout_interval*2);
  } else if($("#table-animation").is(":visible")){
    setTimeout(function(){
      $("#table-animation").hide()
      $("#city-animation").hide();
      $("#step4").hide();
      $("#step3").fadeIn(1000);
      document.location.hash = "step3";
    }, timout_interval*2);
    setTimeout(function(){}, timout_interval*2);
  } else if($("#step3").is(":visible")){
    $("#table-animation").hide();
    $("#city-animation").hide();
    $("#step3").hide();
    $("#step4").fadeIn(1000);
    document.location.hash = "step4";
  }
}
function go_up(){
  if($("#step4").is(":visible")){
    setTimeout(function(){
      $("#city-animation").hide();
      $("#table-animation").hide();
      $("#step4").hide();
      $("#step3").fadeIn(1000);
      document.location.hash = "step3";
    }, timout_interval*2);
  }
  if($("#step3").is(":visible")){
    setTimeout(function(){
      $("#city-animation").hide();
      $("#step3").hide();
      $("#step4").hide();
      $("#table-animation").fadeIn(1000);
      document.location.hash = "step2";
    }, timout_interval*2);
  } else if($("#table-animation").is(":visible")){
      $("#table-animation").hide();
      $("#step3").hide();
      $("#step4").hide();
      $("#city-animation").fadeIn(1000);
      document.location.hash = "";
  }
}
function hide_city(){
  if($("#city-animation").is(":visible")){
    console.log("hiding city animation");
    $("#city-animation").hide();
    $("#table-animation").css('display', 'block');
    $("#table-animation").css('opacity', '1');
  }
}
function hide_table(){
  if($("#table-animation").is(":visible")) {
    $("#table-animation").hide();
    $("#city-animation").show();
  }
}
function scrollEvent(e){
  var evt = window.event || e;
  console.log(evt.detail);
  var delta = evt.detail? evt.detail*(-4) : evt.wheelDelta;
  if(delta< -50) {
    go_down();
  }else if(delta > 50) {
   //scroll up
    go_up();    
  }      
}
var ts;
function touchStart(e){
  ts = e.originalEvent.touches[0].clientY;
}
function touchEnd(e){
  var te = e.originalEvent.changedTouches[0].clientY;
 if(ts > te+10){
    go_down();
    console.log("down");
 }else if(ts < te-10){
    go_up();
    console.log("up");
 }
}

$(document).ready(function(){
  var baseUrl = "http://localhost:8080/";
  var link = window.location.href;
  window.onhashchange = function(){
    var hash = document.location.hash;
    if(hash === ""){
      $("#table-animation").hide();
      $("#step3").hide();
      $("#step4").hide();
      $("#city-animation").fadeIn(1000);
    }
    if(hash.indexOf("#step2") >= 0){
      $("#city-animation").hide();
      $("#step3").hide();
      $("#step4").hide();
      $("#table-animation").css('display', 'block');
      $("#table-animation").css('opacity', '1');
    }
    if(hash.indexOf("#step3") >= 0){
      $("#table-animation").hide()
      $("#city-animation").hide();
      $("#step4").hide();
      $("#step3").fadeIn(1000);
    }
  }
  if(link === baseUrl){
    $("#table-animation").hide();
    $("#step3").hide();
    $("#step4").hide();
    $("#city-animation").fadeIn(1000);
  }
  if(link.indexOf("#step2") >= 0){
    $("#city-animation").hide();
    $("#step3").hide();
    $("#step4").hide();
    $("#table-animation").css('display', 'block');
    $("#table-animation").css('opacity', '1');
  }
  if(link.indexOf("#step3") >= 0){
    $("#table-animation").hide()
    $("#city-animation").hide();
    $("#step4").hide();
    $("#step3").fadeIn(1000);
  }
})