"use strict";

var navigation = {
  step: [
    {
      hash: "#homepage",
      title: "Home Page >> MRW Creations - Artistry, Design and Development"
    },
    {
      hash: "#about_us",
      title: "About Us >>MRW Creations - Artistry, Design and Development"
    },
    {
      hash: "#schedule_meeting",
      title: "Schedule Meeting >> MRW Creations - Artistry, Design and Development"
    }
  ]
};

var step1 = "#homepage";
var step2 = "#about_us";
var step3 = "#schedule_meeting";

var toggles = document.querySelectorAll(".c-hamburger");

for (var i = toggles.length - 1; i >= 0; i--) {
 var toggle = toggles[i];
 toggleHandler(toggle);
};

// Toggle handler on click of navbar open and close
function toggleHandler(toggle) {
 toggle.addEventListener( "click", function(e) {
   e.preventDefault();
   if(this.classList.contains("is-active") === true) {
    this.classList.remove("is-active")
  }
 });
}
$(".c-hamburger--htra open").on('click', openNav);
$(".closebtn").on('click', closeNav);
// Open navbar
function openNav() {
  document.getElementById("mySidenav").style.width = "225px";
  document.getElementById("curve").style.marginRight = "225px";
  document.getElementById("right-curve").style.marginRight = "225px";
  document.getElementById("right-curve").style.transition = "0.5s";
  document.getElementById("logo").style.opacity = "0";
  
  // $(".twelve").css('opacity', '0.5');    
  if($(window).width() <= 720){
    $(".bg-info").css('opacity', '0.5');
    $(".container").css('opacity', '0.5');
  }
  else{

    $(".bg-info").animate({width: '80%'}, 50);
    $(".item").css('width', '100%');
  }
  $("#social").show();
}

// Close navbar
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("curve").style.marginRight= "0";
  document.getElementById("logo").style.opacity = "1";
  document.getElementById("right-curve").style.marginRight = "0";        
  $(".bg-info").css('opacity', '1');
  $(".container").css('opacity', '1');
  $(".bg-info").css('width', '100%');
  $(".item").css('width', '100%');
  if($(window).width() <= 720){
     $("#social").hide();
  }
}
$(".carousel").carousel({
  interval: false
});
$("#show-next-page").on('click', function(){
  $(".carousel").carousel('next');
});
$(document).ready(function(){
  // Code to hide all other divs until animation loads
  if(document.location.hash === "" && window.location.href.indexOf("contact-us.html") < 0){
    $("#logodiv, .Weoperate, img, .mainheader, .Undertable, .set-appointment, .show-next-page, .c-hamburger").hide().delay(4200).fadeIn(1000);
    setTimeout(function(){}, 4000); 
  }
  if($(window).width() <= 720){
    $("#social").hide();
  }

  var hash = document.location.hash;
  var $carousel = $(".carousel");
  var $step_1_button = $("#show-next-page");
  $carousel.carousel({
    interval: false,
    wrap: false
  });
  $step_1_button.on('click', function(){
    $carousel.carousel('next');
  })
  hashChange(document.location.hash);
  window.onhashchange = function(){
    hashChange(document.location.hash);
  }
  $carousel.bind('slide.bs.carousel', function(e){
    var childsList = Array.prototype.slice.call( $('.carousel').children );
    if(e.relatedTarget.outerHTML.indexOf("step_1") > 0){
      window.location.hash = navigation.step[0].hash;
      document.title = navigation.step[0].title;
    } else if(e.relatedTarget.outerHTML.indexOf("step_2") > 0){
      window.location.hash = navigation.step[1].hash;
      document.title = navigation.step[1].title;
    } else if(e.relatedTarget.outerHTML.indexOf("step_3")){
      window.location.hash = navigation.step[2].hash;
      document.title = navigation.step[2].title;
    }
  });
  function hashChange(input_hash){
    switch(input_hash){
      case navigation.step[0].hash:
        pushAnalytics();
        $carousel.carousel(0);
        document.title = navigation.step[0].title;
        break;
      case navigation.step[1].hash:
        pushAnalytics();
        $carousel.carousel(1);
        document.title = navigation.step[1].title;
        break;
      case navigation.step[2].hash:
        pushAnalytics();
        $carousel.carousel(2);
        document.title = navigation.step[2].title;
        break;
      default:
        $carousel.carousel(0);
        document.title = navigation.step[3].title;
    }
  }
  function pushAnalytics(){
    ga('send', 'pageview', {'page': location.pathname+location.search+location.hash});
  }
});