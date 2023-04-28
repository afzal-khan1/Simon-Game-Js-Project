//2
var buttonColours = ["red", "blue", "green", "yellow"];

//4
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


//10 -this is used to start the game from level 1 to level nxt by call nextSequence().
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//6
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  //9 - using jquey at top click btn inside ani..press
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

// 11 -  if statement inside checkAnswer() to check if the most recent user answer is....
//    .... the same as the game pattern. If so then log "success", otherwise log "wrong".
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

//1 start
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);

  //3
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //5
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
//8 - css as pressed
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//7 - after that next sequence fn when we click
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// 13 to restart
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
