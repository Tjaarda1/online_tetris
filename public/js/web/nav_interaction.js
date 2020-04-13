/* ----------- EFECTOS DE SONIDO (SÓLO WEB) ----------- */

window.onload = function () {
  setWebAudioLevels()
}

$("#nGame, #nDev, #nAuthors").mouseover(() => {
  WSFX_HOVER_1.pause()
  WSFX_HOVER_1.currentTime = 0
  WSFX_HOVER_1.play()
});

$("#nGame, #nDev, #nAuthors, .level").click(() => {
  WSFX_CLICK_1.play()
});

$(".level").mouseover(() => {
  WSFX_HOVER_2.pause()
  WSFX_HOVER_2.currentTime = 0
  WSFX_HOVER_2.play()
});

$(".contents").mouseover(() => {
  WSFX_HOVER_3.pause()
  WSFX_HOVER_3.currentTime = 0
  WSFX_HOVER_3.play()
});

$(".contents").click(() => {
  WSFX_CLICK_1.play()
});






/* ----------------- PANEL NAVEGACION ----------------- */

var game_is_running = false;
var nav_position = true;

//Funcion para controlar el tiempo de las animaciones. Son distintas si en nav esta abajo
function set_time(buttom) {
  var time
  if (nav_position == true) {
    switch (buttom) {
      case 0: //boton jugar
        time = 900;
        break;
      case 1:
        time = 1200; //boton dev
        break;
    }
  }
  else {
    time = 200
  }
  return time
}

// Click en "Jugar": Mostrar leveler

$("#nGame").click(function () {
  
  time = set_time(0)
  animations_fade_out()
  
  setTimeout(function () {
    if (window.matchMedia("(max-width: 600px)").matches){
      $("#navigator").css("display", "none")
    }else{
      $("#navigator").css("display", "grid")
    }
    nav_position = false;
    $("#game").css("display", "block");
    $("#title").css("display", "block");
    $(".background").animate({ opacity: '0%' }, "slow");
    $("#dev").css("display", "none");
    $("#authors").css("display", "none");
    $("#title").css("opacity", "100%");
    $("#hoverme").css({
      "opacity":'0',
       "bottom": '1070px' })
    $("#leveler").removeClass("hide");
    $("#leveler").addClass("leveler");
    $("#Tetris1").css("display", "none");
  }, "" + time);

});

// Click en "Desarrollo"
$("#nDev").click(() => {

  time = set_time(1)
  animations_fade_out()
  setTimeout(function () {
    nav_position = false;
    $("#game").css("display", "none");
    $("#authors").css("display", "none");
    $("#fullscreen").css("display","none");
    setTimeout( function () { $("#title").css("display", "none"); }, );
    $(".background").animate({ opacity: '0%' }, "slow"); 
    $("#dev").css("display", "block");
    $("#hoverme").css({
      "opacity":'0',
       "bottom": '1070px' })
    $("#header_dev").animate({ top: '0px' }, "slow");
    $("#home").stop(true, true).delay(600).animate({ opacity: '100%' }, "slow");

  }, "" + time);
});

// Click en "Autores": Mostrar info
$("#nAuthors").click(() => {

  time = set_time()
  animations_fade_out()
  setTimeout(
    function () {
      nav_position = false;
      $("#authors").css("display", "block");
      $("#dev").css("display", "none");
      $("#game").css("display", "none");
      $(".background").animate({ opacity: '100%' }, "slow"); 

    }, "" + time);
});

$("#navigator").children().click(function () {
  if (game_is_running) {
    clearTimeout(interval)
    MUSIC_LVL[lvl - 1].pause()

  }
})


//animaciones segun se abre la pagina


$(document).ready(() => {


  //animacion loading
  $("#loading").stop(true, true).delay(400).animate({ opacity: '0%' }, 1000);

  // Fondos y letras
  setTimeout(function () {

    $("#loading").css("display", "none")
    $("#letters").css("display", "block")
    $("#navigator").css("display", "grid")
    $("#title").css("display", "block")
    $(".background").css("display", "block")
    $("#fullscreen").css("display", "block")

    $("#separator").animate({ width: '230px' }, 1000);

    $("#letters h2, #letters h3, #navigator, #title, .background").stop(true, true).delay(1000).animate({ opacity: '100%' }, 1200);

  }, 1200);

})


// Bajar barra de navegación y animacion de cierre de letras
function animations_fade_out() {

  if (nav_position) {
    $("#separator").animate({ width: '0px' }, 800);
    $("#letters h2, #letters h3").animate({ opacity: '0%' }, 700);
    setTimeout(function () {

      $("#letters").css("display", "none")
    }, 1080);

    if (window.matchMedia("(max-width: 600px)").matches){
      $("#title").stop(true, true).delay(980).animate({ width: '50%' }, "slow");
    }else{
      $("#title").stop(true, true).delay(980).animate({ width: '20%' }, "slow");
    }

    $("#navigator").stop(true, true).delay(980).animate({ bottom: '-10px', opacity: '0' }, "slow");
  }
} 


//Todo lo relacionado con poner el mouse abajo para que aparezca el nav
$(document).ready(() => {
 
  $("#navigator").mouseover(() => {
    
    if (!nav_position) {
      
       
        $(".secondary").animate({ opacity: '0.1' }, "fast");
        $("#navigator").animate({ bottom: '10px', opacity: '1' }, "fast");
        $("#hoverme").animate({  opacity: '0', bottom: '1070px'}, "fast");
      }
      
    })
  
  
  $("#navigator").mouseleave(() => {
   
    if (!nav_position) {
     
      
      
       
        $(".secondary").animate({ opacity: '1' }, "fast");
        $("#navigator").animate({ bottom: '-10px', opacity: '0' }, "fast");
        $("#hoverme").animate({  opacity: '0.8', bottom: '10px' }, "fast");
    }
  
  })
  
})



/* -------------------- LEVELER -------------------- */

// Elección de niveles
$(document).ready(function () {

  const transition_time = 100
  if (window.matchMedia("(max-width: 600px)").matches){
    $(".leveler").css("grid-template-columns", "50% 50%")
    $(".level").css("left", "13%")
  }else{
    $(".leveler").css("grid-template-columns", "25% 25% 25% 25%")
    $(".level").css("left", "5%")
  }

  $("#level1").click(function () {
    $("#leveler").addClass("hide");

    setTimeout(() => {
      $("#leveler").removeClass("leveler")
      $("#Tetris1").css("display", "grid")
      $("#navigator").css("display", "none")
      $("#hoverme").css("display", "none")
    }, transition_time);

    initial_level_selected = 1
  })

  $("#level2").click(function () {
    $("#leveler").addClass("hide");

    setTimeout(() => {
      $("#leveler").removeClass("leveler")
      $("#Tetris1").css("display", "grid")
      $("#navigator").css("display", "none")
      $("#hoverme").css("display", "none")
    }, transition_time);

    initial_level_selected = 2
  })

  $("#level3").click(function () {
    $("#leveler").addClass("hide")

    setTimeout(() => {
      $("#leveler").removeClass("leveler")
      $("#Tetris1").css("display", "grid")
      $("#navigator").css("display", "none")
      $("#hoverme").css("display", "none")
    }, transition_time);

    initial_level_selected = 3
  })

  $("#level4").click(function () {
    $("#leveler").addClass("hide")

    setTimeout(() => {
      $("#leveler").removeClass("leveler")
      $("#Tetris1").css("display", "grid")
      $("#navigator").css("display", "none")
      $("#hoverme").css("display", "none")
    }, transition_time);

    initial_level_selected = 4
  })

  $(".level").click(function () {
    if (game_is_running) {
      reset_game(initial_level_selected)
    } else {
      game_is_running = true
      startGame(initial_level_selected)
    }
  })
})



/* -------------------- RANKING -------------------- */

// Mostrar el ranking
function showRanking() {
  $('#backing_video').css("display", "none");
  $("#ranking").css("display", "block");
}







