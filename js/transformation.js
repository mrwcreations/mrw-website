$(window).bind('mousewheel', scrollEvent);
$(window).bind('touchstart', touchStart);
$(window).bind('touchend', touchEnd);
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
var timout_interval = 500;
function go_down(){
  if($("#city-animation").is(":visible")){
    setTimeout(function(){
      $("#city-animation").hide();
      $("#step3").hide();
      $("#table-animation").show();
    }, timout_interval);
    setTimeout(function(){}, timout_interval*2);
  } else if($("#table-animation").is(":visible")){
    $("#table-animation").hide();
    $("#city-animation").hide();
    $("#step3").fadeIn(1000);
  }
}
function go_up(){
  if($("#step3").is(":visible")){
    setTimeout(function(){
      $("#city-animation").hide();
      $("#step3").hide();
      $("#table-animation").show();
    }, timout_interval);
  } else if($("#table-animation").is(":visible")){
    $("#table-animation").hide();
    $("#step3").hide();
    $("#city-animation").show();
  }
}
function hide_city(){
  if($("#city-animation").is(":visible")){
    console.log("hiding city animation");
    $("#city-animation").hide();
    $("#table-animation").show();
  }
}
function hide_table(){
  if($("#table-animation").is(":visible")) {
    $("#table-animation").hide();
    $("#city-animation").show();
  }
}
function scrollEvent(e){
  //$(window).bind('mousewheel', function(e){
  if(e.originalEvent.wheelDelta < -50) {
    go_down();
    console.log('Down');
  }else if(e.originalEvent.wheelDelta > 50) {
   //scroll up
    go_up();
    console.log("Up");
  }      
}
var ts;
function touchStart(e){
  ts = e.originalEvent.touches[0].clientY;
}
function touchEnd(e){
  var te = e.originalEvent.changedTouches[0].clientY;
 if(ts > te+10){
    hide_city();
    console.log("down");
 }else if(ts < te-10){
    hide_table();
    console.log("up");
 }
}