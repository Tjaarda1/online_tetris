


function sendScoreData(){
    
    $("#hidInput").val(score);
   
}


function endgame(){
    MUSIC_LVL[lvl-1].pause()
    SFX_ENDGAME.play();
    
    $(".background").animate({opacity: "0.8"}, "slow");
    
    sendScoreData();
   showRanking();

}



