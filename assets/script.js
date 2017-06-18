var seconds; // for the countdown timer
var questionNumber = 0;
var questionsRight = 0;
var autoPlay = true;
var autoPlayCheck = "checked";

// checks for the presence of localStorage
var hasStorage = false; // and will stay false until proven true
if (window.localStorage) {
  // localStorage stores everything as strings, so we have to convert it back into a number. If it's empty (first play through) we'll fall back to 0.
  highScore = parseInt(localStorage.highScore) || 0;
  localStorage.highScore = highScore; // for the test that follows...
}
// Safari in Private Browsing mode still shows localStorage as available, but sets its capacity to 0. So a check: after all that above, if the key highScore is still undefined, localStorage must be functionally unavailable.
hasStorage = (localStorage.highScore !== undefined); //i.e. "If localStorage.highScore IS NOT undefined, hasStorage = true; else false"

var questionOrder = [0, 1, 2, 3];

var questionArray = [
  {
    question: "Sierra Leone is located...",
    correctAnswer: "in western Africa, between Guinea and Liberia",
    wrongAnswers: ["in southern Africa, between Namibia and Zimbabwe", "in eastern Africa, between Somalia and Sudan", "just north of Greenland"],
    doneMessage: "Sierra Leone is a coastal counry in West Africa, with Liberia on its southeast and Guinea wrapping around its northern border.",
    image: "<img src='assets\\images\\west_africa_map.png' class='responsive-img' alt='map of West Africa'>", // double \\ to escape the \ and make it render within the string literal of displayAnswer()
    imageCaption: "Map of West Africa"
  },
  {
    question: "Sierra Leone was, for over a century, a colony of...",
    correctAnswer: "England",
    wrongAnswers: ["Spain", "Germany", "the United States"],
    doneMessage: "Although the Portuguese, French, and Dutch were represented in the area in the 15th and 16th centuries, Sierra Leone became a British colony in 1787 and achieved full independence in 1960.",
    image: "<img src='assets\\images\\Flag_of_Sierra_Leone_1916-1961.gif' class='responsive-img' alt='flag of Sierra Leone, 1916-1961'>",
    imageCaption: "Flag of Sierra Leone, 1916-1961"
  },
  {
    question: "In the 18th century Sierra Leone was...",
    correctAnswer: "a major point of deportation in the slave trade",
    wrongAnswers: ["a major exporter of tropical fruit", "a major producer of sugar", "a major source of iron ore"],
    doneMessage: "At the height of the slave trade, tens of thousands of slaves were funneled through Sierra Leone's ports. Rice cultivation was central to the region, and the rice plantations of the American southern Lowlands placed a high premium on slaves with this knowledge.",
    image: "<img src='assets\\images\\bunce.jpg' class='responsive-img' alt='18th-century woodcut of Bunce Island'>",
    imageCaption: "<a href='https://en.wikipedia.org/wiki/Bunce_Island' target='_blank'>Bunce Island</a>, a slave &ldquo;factory&rdquo; where thousands of slaves were processed before deportation directly to South Carolina and Georgia"
  },
  {
    question: "From 1991-2002 Sierra Leone was devastated by...",
    correctAnswer: "a brutal civil war",
    wrongAnswers: ["a series of earthquakes", "severe drought", "international tarriffs"],
    doneMessage: "The 11 year civil war was marked by widespread atrocities against human rights, and left 50,000 people dead and the public infrastructure gutted. 1,270 schools were destroyed, many hospitals were destroyed or looted, and many healthcare professionals fled the country.",
    image: "<img src='assets\\images\\school.jpg' class='responsive-img' alt='A school near Koindu, damaged in the civil war'>",
    imageCaption: "A school near Koindu, damaged in the civil war"
  },
  {
    question: "The majority of Sierra Leone's population are employed in...",
    correctAnswer: "agriculture",
    wrongAnswers: ["diamond production", "tourism", "fishing"],
    doneMessage: "Agriculture has been an important part of West Africa for centuries. Today it represents 58% of Sierra Leone's GDP, and 80% of the population are involved in it. Two thirds of the population are involved in subsistence farming.<br>Nevertheless, Sierra Leone is a net importer of food, and although the most common crop is rice, it still imports rice.",
    image: "<img src='assets\\images\\rice_farmer.jpg' class='responsive-img' alt='A Sierra Leonean rice farmer'>",
    imageCaption: "A Sierra Leonean rice farmer"
  }
];

function runQuestion(object) {
  seconds = 20; // reset after previous question
  $("#main-card").html(`
    <div id="main-card-content" class="card-content">
    <div id="timer" class="right">
    <i class="material-icons">hourglass_empty</i>
    Time remaining: <span class="red-text">0:<span id="seconds">${seconds}</span></span>
    </div>
    <h2 id="question" class="extra-margin">${object.question}</h2>
    <div class="card-action">
    <div class="container center-align">
    <a id="answer0" class="waves-effect waves-light btn answer"></a>
    <a id="answer1" class="waves-effect waves-light btn answer"></a>
    <a id="answer2" class="waves-effect waves-light btn answer"></a>
    <a id="answer3" class="waves-effect waves-light btn answer"></a>
    </div>
    </div>
    </div>
  `);
  var timer = setInterval(function() {
    if (seconds - 10 < 0) {
      seconds = "0" + seconds;
    }
    $("#seconds").html(seconds);
    if (seconds === 0) {
      clearInterval(timer);
      displayAnswer("Time's up!!", object);
    }
    seconds--;
  }, 1000);
  questionOrder.sort(function(a, b){return 0.5 - Math.random()}); // randomize question order. Is there a less clunky way to do this, than create an extra array just for the purpose of randomly assigning the numbers 0-3 without repetition?
  $("#answer" + questionOrder[0]).html(object.correctAnswer).addClass("correct");
  // correct answer is sent to the first randomized index number
  for (var i = 1; i < questionOrder.length; i++) {
    var questionIndex = questionOrder[i]; //starting with the second element in questionOrder...
    $("#answer" + questionIndex).html(object.wrongAnswers[i - 1]).addClass("wrong");
  }
  $(".correct").on("click", function () {
    clearInterval(timer);
    questionsRight++;
    displayAnswer("Correct!", object); // displayAnswer() is passed the object so it can continue to access its remaining properties
  });
  $(".wrong").on("click", function () {
    clearInterval(timer);
    displayAnswer("Incorrect...", object);
  });
}

function displayAnswer(outcomeMessage, object) {
  seconds = 19;
  $("#main-card").html(`
    <div id="main-card-content" class="card-content">
      <span class="card-title extra-margin">${outcomeMessage}</span>
      <p class="extra-margin flow-text">${object.doneMessage}</p>
      <div class="center-align extra-margin">${object.image}</div>
      <div class="center-align extra-margin">${object.imageCaption}</div>
      <div class="switch inline-block">
        Auto-advance:
        <label>
          Off
          <input id="autoPlaySwitch" type="checkbox" ${autoPlayCheck}>
          <span class="lever"></span>
          On
        </label>
      </div>
      <div id="nextQuestion" class="extra-margin inline-block">Next question in <span id="moveOnSeconds">20</span> seconds!</div>
    </div> <!--/.card-content-->
    <div class="card-action">
      <div class="container center-align">
        <a id="nextBtn" class="quizBtn waves-effect waves-light btn-large">continue<i class="material-icons right">forward</i></a>
      </div>
    </div> <!--/.card-action-->
  `);
  $(".determinate").attr("style", "width: " + questionNumber / questionArray.length * 100 + "%");
  function runTimer() {
    var moveOnTimer = setInterval(function() {
      if (!autoPlay) { // If "auto-advance" toggle is set to off...
        clearInterval(moveOnTimer);
      } else if (seconds === 0) {
        clearInterval(moveOnTimer);
        runQuiz();
      } else {
        $("#moveOnSeconds").html(seconds);
        seconds--;
      }
    }, 1000);
  }
  runTimer();
  $("#autoPlaySwitch").on("change", function() {
    if ($("#autoPlaySwitch").prop("checked")) {
      $("#nextQuestion").css("visibility", "visible");
      autoPlay = true;
      runTimer();
    } else {
      $("#nextQuestion").css("visibility", "hidden");
      autoPlay = false;
      autoPlayCheck = ""; // set toggle to "OFF" on future page loads by removing attribute "checked"
    }
  });
}

function displayQuizResults() {
  var currentScore = Math.round(questionsRight / questionArray.length * 100); // for percentage
  // to avoid saying "You got 1 questions right," add "s" only for numbers other than 1
  var plural = "s";
  if (questionsRight === 1) {
    plural = "";
  }
  $("#main-card").html(`
    <div id="main-card-content" class="card-content">
      <span class="card-title">You're done!!</span>
      <h2>Results:</h2>
      <p class="flow-text">You got ${questionsRight} question${plural} right out of ${questionArray.length}&mdash;that's <span class="red-text">${currentScore}%</span>!</p>
      <p id="highScore" class="flow-text"></p>
      <p class="flow-text">Want to play again?</p>
    </div>
    <div class="card-action">
      <div class="container center-align">
        <a id="restartBtn" class="quizBtn waves-effect waves-light btn-large">play again<i class="material-icons right">replay</i></a>
      </div>
    </div>
  `);
  questionNumber = 0;
  questionsRight = 0;
  var highScoreMessage = "";
  if (currentScore > highScore) {
    highScoreMessage = `Congratulations, you've beaten your previous high score of <span class="red-text">${highScore}%</span>!`;
    highScore = currentScore;
    localStorage.highScore = highScore;
  } else {
    highScoreMessage = `That's great, but it can't top your high score of <span class="red-text">${highScore}%</span>!`
  }
  $("#highScore").html(highScoreMessage );
}

function runQuiz() {
  if (questionNumber < questionArray.length) {
    runQuestion(questionArray[questionNumber]);
    questionNumber++;
  } else {
  displayQuizResults();
  }
}

// to be able to bind this event handler to buttons that haven't been created yet, but will be injected in the future, it's bound to <body> but passed .quizBtn as a "selector"
$("body").on("click", ".quizBtn", function () {
  console.log(".quizBtn clicked");
  runQuiz();
});

// function to replace low-res images with full-res
// function upgradeImg(imgElement) {
//   var source = imgElement.attr("src") + "-full";
//   imgElement.attr("src", source);
// }