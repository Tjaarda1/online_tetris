
//FULLSCREEN

  $(document).ready(function(){
      $("#fullscreen").click(function(){
        if( $("#fscsym").hasClass("fas fa-expand-arrows-alt")){
            openFulscreen();
            $("#fscsym").removeClass("fas fa-expand-arrows-alt");
            $("#fscsym").addClass("fas fa-compress-arrows-alt");
        } else{
          closeFullscreen();
          $("#fscsym").removeClass("fas fa-compress-arrows-alt");
          $("#fscsym").addClass("fas fa-expand-arrows-alt");
        }
      });
    });
    function openFulscreen(){
      var elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
      }
    }
    function closeFullscreen() {
      var elem = document.documentElement;
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
    }
  }

  $(document).ready(function(){

  //Control Video

  $("#stop_video").click(()=>{
    my_video = document.getElementById("myVideo")
    if(my_video.paused){
      my_video.play();
    $("#stop_video").html("Video: ON");
    }else{
      my_video.paused = true;
      my_video.pause();
      $("#stop_video").html("Video: OFF");
    }

  });

//Boton back

$("#back").click(function () {
  $("#backing_video").css("display", "none");
  $("#leveler").removeClass("hide");
  $("#leveler").addClass("leveler");
  $("#Tetris1").css("display", "none");
  $("#navigator").css("display","grid");
  $("#hoverme").css("display", "grid")
  if (!paused) {
    pause_game()
  }
})

//Control musica
$("#music").click(function () {
  if (MUSIC_LVL[lvl-1].muted == false) {
    MUSIC_LVL[lvl-1].muted = true
    this.innerHTML = "Música: OFF"
  } else {
    MUSIC_LVL[lvl-1].muted = false
    this.innerHTML = "Música: ON"
  }
})


$(".interactive").on('keydown', function(event) {
  if (event.key == "Enter") event.preventDefault();
});

$("#fullscreen").on('keydown', function(event) {
  if (event.key == "Enter") event.preventDefault();
});


});




  /* ----------------------- FUNCIONES AUXILIARES ---------------- */
//funciones para el desarrollo de la web
function showForm(){
  animations_fade_out();
  $("#game").css("display", "block");
    $("#dev").css("display", "none");
    $("#authors").css("display", "none");
    $("#leveler").css("display", "none");
    $(".background").css("opacity", "0.8");
    $("#ranking").css("display", "block");
}
