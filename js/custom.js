"use strict";

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
  $(".bg-info").css('width', '100%');
  $(".item").css('width', '100%');
  if($(window).width() <= 720){
     $("#social").hide();
  }
}

$(document).ready(function(){
  // Code to hide all other divs until animation loads
  if(document.location.hash === ""){
    $("#logodiv, .Weoperate, img, .mainheader, .Undertable, .set-appointment, .show-next-page, .c-hamburger").hide().delay(4200).fadeIn(1000);
    setTimeout(function(){}, 4000); 
  }
  if($(window).width() <= 720){
    $("#social").hide();
  }
});