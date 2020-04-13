/* -------------------- Hacer scroll automatica al hacer clic en el nav de dev -------------------- */


$(document).ready(function () {
  $("#video_button").click(function () {
    $("*").css("scroll-snap-type", "none");
    $('html,body').animate({
      scrollTop: $("#video").offset().top
   });
   setTimeout( function () { $("*").css("scroll-snap-type", "y mandatory"); }, 300);
   
  })

  $("#controls_button").click(function () {
    $("*").css("scroll-snap-type", "none");
    $('html,body').animate({
      scrollTop: $("#controls").offset().top
   });
   setTimeout( function () { $("*").css("scroll-snap-type", "y mandatory"); }, 300);
   
  })

  $("#about_us_button").click(function () {
    $("*").css("scroll-snap-type", "none");
    $('html,body').animate({
      scrollTop: $("#about_us").offset().top
   });
   setTimeout( function () { $("*").css("scroll-snap-type", "y mandatory"); }, 300);
   
  })
})
















































