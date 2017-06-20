var seconds; // for the countdown timer
var timer; // to be the interval ID
var questionNumber = 0;
var questionsRight = 0;
var autoPlay = true;
var autoPlayCheck = "checked"; // to add an attribute to a checkbox

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
    image: "<img src='assets\\images\\west_africa_map.png' class='responsive-img col s12 l10 offset-l1' alt='map of West Africa'>", // double \\ to escape the \ and make it render within the string literal of displayAnswer()
    imageCaption: "Map of West Africa"
  },
  {
    question: "Sierra Leone was, for over a century, a colony of...",
    correctAnswer: "England",
    wrongAnswers: ["Spain", "Germany", "the United States"],
    doneMessage: "Although the Portuguese, French, and Dutch were represented in the area in the 15th and 16th centuries, Sierra Leone became a British colony in 1787 and achieved full independence in 1960.",
    image: "<img src='assets\\images\\Flag_of_Sierra_Leone_1916-1961.gif' class='responsive-img col s12 l10 offset-l1' alt='flag of Sierra Leone, 1916-1961'>",
    imageCaption: "Flag of Sierra Leone, 1916-1961"
  },
  {
    question: "In the 18th century Sierra Leone was...",
    correctAnswer: "a major point of deportation in the slave trade",
    wrongAnswers: ["a major exporter of tropical fruit", "a major producer of sugar", "a major source of iron ore"],
    doneMessage: "At the height of the slave trade, tens of thousands of slaves were funneled through Sierra Leone's ports. Rice cultivation was central to the region, and the rice plantations of the American southern Lowlands placed a high premium on slaves with this knowledge.",
    image: "<img src='assets\\images\\bunce.jpg' class='responsive-img col s12 l10 offset-l1' alt='18th-century woodcut of Bunce Island'>",
    imageCaption: "<a href='https://en.wikipedia.org/wiki/Bunce_Island' target='_blank'>Bunce Island</a>, a slave &ldquo;factory&rdquo; where thousands of slaves were processed before deportation directly to South Carolina and Georgia"
  },
  {
    question: "Then, in the 19th century, Sierra Leone's population was shaped by...",
    correctAnswer: "the relocation of thousands of freed slaves",
    wrongAnswers: ["mass immigration from Eastern Europe", "sweeping cholera epidemics", "mass emigration to Mali"],
    doneMessage: "Sierra Leone was targeted as a destination for resettlement, starting with thousands of <a href='https://en.wikipedia.org/wiki/Black_Loyalist' target='_blank'>Black Loyalists</a> who had fought for Britain in the American Revolution. After Britain outlawed slavery in 1807, Sierra Leone was also a base for naval forces patrolling to intercept illegal slave ships, and slaves liberated by these forces were returned to Sierra Leone (though often to be sold into indentured apprenticeship, or conscripted into the navy).",
    image: "<img src='assets\\images\\cotton-tree.jpg' class='responsive-img col s12 l10 offset-l1' alt='Cotton Tree in Freetown'>",
    imageCaption: "The iconic <a href='https://en.wikipedia.org/wiki/Cotton_Tree_(Sierra_Leone)' target='_blank'>Cotton Tree</a> around which settlers built Freetown"
  },
  {
    question: "From 1991-2002 Sierra Leone was devastated by...",
    correctAnswer: "a brutal civil war",
    wrongAnswers: ["a series of earthquakes", "severe drought", "international tarriffs"],
    doneMessage: "The 11 year civil war was marked by widespread atrocities against human rights, and left 50,000 people dead and the public infrastructure gutted. 1,270 schools were destroyed, many hospitals were destroyed or looted, and many healthcare professionals fled the country.",
    image: "<img src='assets\\images\\school.jpg' class='responsive-img col s12 l10 offset-l1' alt='A school near Koindu, damaged in the civil war'>",
    imageCaption: "A school near Koindu, damaged in the civil war"
  },
  {
    question: "The majority of Sierra Leone's population are employed in...",
    correctAnswer: "agriculture",
    wrongAnswers: ["diamond production", "tourism", "fishing"],
    doneMessage: "Agriculture has been an important part of West Africa for centuries. Today it represents 58% of Sierra Leone's GDP, and 80% of the population are involved in it. Two thirds of the population are involved in subsistence farming.<br>Nevertheless, Sierra Leone is a net importer of food, and although the most common crop is rice, it still imports rice.",
    image: "<img src='assets\\images\\rice_farmer.jpg' class='responsive-img col s12 l10 offset-l1' alt='A Sierra Leonean rice farmer'>",
    imageCaption: "A Sierra Leonean rice farmer"
  },
  {
    question: "Although the official language of Sierra Leone is English, the language of everyday life for 97% of the population is...",
    correctAnswer: "Krio",
    wrongAnswers: ["French", "Swahili", "Mandinka"],
    doneMessage: "Krio is both <a href='https://en.wikipedia.org/wiki/Krio_language' target='_blank'>a language</a> and <a href='https://en.wikipedia.org/wiki/Sierra_Leone_Creole_people' target='_blank'>an ethnic group</a>, a synthesis of cultures brought from the American South, surrounding West African peoples, and especially Jamaica. Although the Krio descendants of freed slaves represent only 1% of the national population, the language unites Sierra Leone's other ethnic groups, primarily the <a href='https://en.wikipedia.org/wiki/Temne_people' target='_blank'>Temne</a> and the <a href='https://en.wikipedia.org/wiki/Mende_people' target='_blank'>Mende</a>.",
    image: "<img src='assets\\images\\krio-gullah.jpg' class='responsive-img col s12 l10 offset-l1' alt='Comparison of Krio and Gullah'>",
    imageCaption: "Comparison of Krio and <a href='https://en.wikipedia.org/wiki/Gullah' target='_blank'>Gullah</a>"
  },
  {
    question: "What recent movie is set in Sierra Leone?",
    correctAnswer: "Blood Diamond",
    wrongAnswers: ["Hotel Rwanda", "Invictus", "I Dreamed of Africa"],
    doneMessage: "<span class='italic'>Blood Diamond</span> tells a fictional story of diamond smuggling in the midst of Sierra Leone's civil war. Although set in Sierra Leone, <a href='https://mightyminnow.wordpress.com/2007/05/30/blood-diamond-should-have-been-shot-in-sierra-leone/' target='_blank'>the movie was filmed mostly in</a> South Africa and Mozambique.",
    image: "<img src='assets\\images\\blood-diamond.jpg' class='responsive-img col s12 l10 offset-l1' alt='still from the movie Blood Diamond'>",
    imageCaption: "Still from the movie <span class='italic'>Blood Diamond</span>"
  },
  {
    question: "Which of the following animals is NOT found in the wild in Sierra Leone?",
    correctAnswer: "cheetah",
    wrongAnswers: ["chimpanzee", "pygmy hippopotamus", "African manatee"],
    doneMessage: "Sierra Leone has a <a href='https://en.wikipedia.org/wiki/Wildlife_of_Sierra_Leone' target='_blank'>diverse wildlife population</a>, since it encompasses many different biomes--coastal beach, mangrove swamps, and inland rainforest. The endangered pygmy hippopotamus can be found in the Gola region. No cheetahs, though.",
    image: "<img src='assets\\images\\pygmy-hippo.jpg' class='responsive-img col s12 l10 offset-l1' alt='A pygmy hippopotamus'>",
    imageCaption: "A pygmy hippopotamus"
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
    <h2 id="question" class="extra-margin flow-text">${object.question}</h2>
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
  timer = setInterval(function() {
    if (seconds - 10 < 0) {
      seconds = "0" + seconds;
    }
    $("#seconds").html(seconds);
    if (seconds < 1) {
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
      <span class="card-title flow-text extra-margin">${outcomeMessage}</span>
      <p class="extra-margin flow-text">${object.doneMessage}</p>
      <div class="center-align extra-margin answer-image">
        <div class="row">
        ${object.image}
        </div>
      </div>
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
    timer = setInterval(function() {
      if (!autoPlay) { // If "auto-advance" toggle is set to off...
        clearInterval(timer);
        $("#nextQuestion").css("visibility", "hidden");
      } else if (seconds === 0) {
        clearInterval(timer);
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
      autoPlayCheck = "checked";
      runTimer();
    } else {
      $("#nextQuestion").css("visibility", "hidden");
      clearInterval(timer);
      autoPlay = false;
      autoPlayCheck = ""; // set toggle to "OFF" on future page loads by removing attribute "checked"
    }
  });
  $(".quizBtn").on("click", function () {
    clearInterval(timer);
    runQuiz();
  })
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
      <span class="card-title flow-text">You're done!!</span>
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
  // TODO: add more appropriate messages for:
  // currentScore or highScore = 0
  // currentScore === highScore
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
  runQuiz();
});

// TODO: function to replace low-res images with full-res