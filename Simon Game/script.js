var buttonColor=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;

$(document).keypress(function() {
    if (!started) {
      $("h1").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

function nextSequence(){

    userClickedPattern=[];

    level++;
    $("h1").text(`Level ${level}`);
    
    var randomnumber=Math.floor(Math.random() * 4);
    var randomChosenColor=buttonColor[randomnumber];
    gamePattern.push(randomChosenColor);
    
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    
   music(randomChosenColor);
     
}

$(".btn").click(function(){
    var userChosenColor=this.id;
    userClickedPattern.push(userChosenColor);
    music(userChosenColor);
    animatePress(userChosenColor);
    
    checkAnswer(userClickedPattern.length-1);
});

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    }
    else{
    
        $("h1").text("Game Over, Press Any Key To Restart");

        music("wrong")

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        startOver();
    }
}

function music(musicColor){
    audio = new Audio("./sounds/" + musicColor + ".mp3");
    audio.play();
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}