/*
1. User loads page. Introductory modal/screen displays, with prep/instructions. "When you're ready, push START"
2. User pushes start, launching first page of quiz.
  2a. Timer starts and displays; properties of first question-object display
  NB: maybe question-objects should be stored in a big array this time instead of an object, to access them sequentially
3. EITHER...
  3a. User chooses the right answer, in which case...
    4a. Display success message and pic associated with that question, OR
  3b. User chooses a wrong answer, in which case...
    4b. Display same page, except with "Wrong!" message instead of "Right!"
  3c. User makes no choice and timer runs out, in which case ...
    4c. Display same page, with "Time's Up!"
*/

var questionArray = [
  {
    question: "Sierra Leone is located...",
    correctAnswer: "in western Africa, between Guinea and Liberia",
    wrongAnswer1: "in southern Africa, between Namibia and Zimbabwe",
    wrongAnswer2: "in eastern Africa, between Somalia and Sudan",
    wrongAnswer3: "just north of Greenland",
    doneMessage: "Sierra Leone is a coastal counry in West Africa, with Liberia on its southeast and Guinea wrapping around its northern border.",
    image: "<img src='assets\images\west_africa_map.png' alt='map of West Africa'>",
    imageCaption: "Map of West Africa"
  },
  {
    question: "Sierra Leone was, for over a century, a colony of...",
    correctAnswer: "England",
    wrongAnswer1: "Spain",
    wrongAnswer2: "Germany",
    wrongAnswer3: "the United States",
    doneMessage: "Although the Portuguese, French, and Dutch were represented in the area in the 15th and 16th centuries, Sierra Leone became a British colony in 1787 and achieved full independence in 1960.",
    image: "<img src='assets\images\Flag_of_Sierra_Leone_1916-1961.gif' alt='flag of Sierra Leone, 1916-1961'>",
    imageCaption: "Flag of Sierra Leone, 1916-1961"
  },
  {
    question: "In the 18th century Sierra Leone was...",
    correctAnswer: "a major point of deportation in the slave trade",
    wrongAnswer1: "a major exporter of tropical fruit",
    wrongAnswer2: "a major producer of sugar",
    wrongAnswer3: "a major source of iron ore",
    doneMessage: "At the height of the slave trade, tens of thousands of slaves were funneled through Sierra Leone's ports. Rice cultivation was central to the region, and the rice plantations of the American southern Lowlands placed a high premium on slaves with this knowledge.",
    image: "<img src='bunce.jpg' alt='18th-century woodcut of Bunce Island'>",
    imageCaption: "<a href='https://en.wikipedia.org/wiki/Bunce_Island' target='_blank'>Bunce Island</a>, a slave &ldquo;factory&rdquo; where thousands of slaves were processed before deportation directly to South Carolina and Georgia"
  }
];

function runQuestion(object) {
  
}

function displayResults() {
  
}

function runQuiz() {
  for (var i = 0; i < questionArray.length; i++) {
    runQuestion(questionArray[i]);
  }
  displayResults();
}

$("#startBtn").on(click, function () {
  $("#main-card-content").html(`
    
  `);
});