// // once the start button is pushed, i am going to randomly grab  number, or item depending on how i write it, from an array and then display the corresponding question of that random # or item as the first question of the game. the empty answer divs will then be filled with the appropriate 4 answer pairs or mates of the initial randomly chosen array item.how to do this? not sure yet.

// make correct answer the same index as the question in first answer array, make the display of them random instead perfect.....:) ??

var game = {
  startButton: function() {
    $("#startButton").on("click", function() {
      $("#startDiv").appendTo("#purgatory");
      console.log("Start button pushed, and should b in purg");
    });
  },

  question1: {
    question: "Who was the first female to climb the sport grade 9a+/5.15a?",
    correctAnswer: "Margo Hayes",
    wrongAnswers: ["Ashima Shiraishi", "Josune Bereziartu", "Angela Eiter"]
  },
  question2: {
    question: "What protection do you use for bouldering?",
    correctAnswer: "Crashpads + Spotters",
    wrongAnswers: [
      "Helmets + Shin Guards",
      "Gloves + Kneepads",
      "Rope + Harness"
    ]
  },
  question3: {
    question: "What white substance helps a climber's grip on the rock?",
    correctAnswer: "Chalk",
    wrongAnswers: ["Cocaine", "Dandruff", "Baking Soda"]
  },
  question4: {
    question: "What move allows the climber to hang by their feet?",
    correctAnswer: "Bathang",
    wrongAnswers: ["Orangu-Hang", "The Rim", "The Upside Down Special"]
  },
  question5: {
    question: "Who is the first man to free solo El Cap in Yosemite?",
    correctAnswer: "Alex Honnold",
    wrongAnswers: ["Ronnie Van Zant", "Buzz Lightyear", "Tom Petty"]
  }
};
game.startButton();
