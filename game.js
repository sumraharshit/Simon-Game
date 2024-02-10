let start = true;

$(document).keypress(function(event){
    if(start==true && event.which == 97)
    {
        newsequence();
        start = false;
    }

    if(event.which!=97)
    {
        alert("Wrong Key");
    }
});
let buttonColors = ["red",  "blue",  "green", "yellow"];
let gamePattern  = [];
let userClickedPattern = [];
let level = 0;
function newsequence() {
    level++;
   $("h1").text("Level "+level);
    let randomNumber = Math.floor(Math.random()*4);
   let randomChosenColor = buttonColors[randomNumber];
   
  gamePattern.push(randomChosenColor);
 $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
 playSound(randomChosenColor);
 
}
$(".btn").click(function(){
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animate(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})
function playSound(name)
{   let audio = new Audio("sounds/" + name + ".mp3");
audio.play();
   
}
function animate(currentColor){
   $("#"+currentColor).addClass("pressed");
   setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
   },100);
}

function checkAnswer(index)
{
     if(gamePattern[index]==userClickedPattern[index]){
           if(gamePattern.length == userClickedPattern.length)
           {
            setTimeout(function(){
                userClickedPattern = [];
                newsequence();
            }, 1000);
           }
     }

     else
     {
        console.log("wrong");
        let wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();
        $("body").addClass("game-over");
        setTimeout(function () {
             $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over!! Press 'A' to Restart");
        Restart();
     }
}

function Restart()
{   level = 0;
    gamePattern = [];
   start = true;   
   userClickedPattern = [];
}