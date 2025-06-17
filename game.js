let userClickedPattern=[];
let gamePattern=[];
let buttonColors=["red","blue","green","yellow"];
var started=false;
var level=0;

function nextSequence(){
  var randomNumber=Math.floor(4*Math.random());
  var randomChoosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChoosenColor);
  console.log(gamePattern);

 $("#"+randomChoosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChoosenColor);
  level++;
  $("#level-title").text("LEVEL :"+level);
}

$(".btn").click(function(){
  var userChoosenColor=$(this).attr("id");
  userClickedPattern.push(userChoosenColor);
  console.log(userClickedPattern);
  playSound(userChoosenColor);
  animatePress(userChoosenColor);
  checkAnswers(userClickedPattern.length-1);
});
function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");
    setTimeout(function(){
      $("."+currentColor).removeClass("pressed");
    },100);
}
$(document).keypress(function(event){
  if(!started)
  {
    nextSequence();
    started=true;
  }
});
function checkAnswers(currentLevel){
            if(userClickedPattern[currentLevel]==gamePattern[currentLevel])
            {
              if(userClickedPattern.length===gamePattern.length)
              {
                console.log("success")
                setTimeout(function(){
                nextSequence()},1000);
                userClickedPattern.length=0;
              }
            }
            else
            {
               audio=new Audio("sounds/wrong.mp3");
               audio.play();
               console.log("wrong");
               $("body").addClass("game-over");
               setTimeout(function(){
                 $("body").removeClass("game-over");
               },200);
               $("#level-title").text("Game Over, Press Any Key to Restart");
               startOver();
           }
}
function startOver(){
  userClickedPattern=[];
  gamePattern=[];
  level=0;
  started=false;
}
