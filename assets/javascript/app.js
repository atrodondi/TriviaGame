// // once the start button is pushed, i am going to randomly grab  number, or item depending on how i write it, from an array and then display the corresponding question of that random # or item as the first question of the game. the empty answer divs will then be filled with the appropriate 4 answer pairs or mates of the initial randomly chosen array item.how to do this? not sure yet.

// make correct answer the same index as the question in first answer array, make the display of them random instead perfect.....:) ??

var game = {
  startButton: function() {
    $("#startButton").on("click", function() {
      $("#startDiv").appendTo("#purgatory");
      console.log("Start button pushed, and should b in purg");
    });
  },

  questions: [
    "Who was the first female to climb the sport grade 9a+/5.15a?",
    "What protection do you use for bouldering?",
    "What white substance helps a climber's grip?",
    "What move allows the climber to hang by their feet?",
    "Who is the first man to free solo El Cap in Yosemite?"
  ],
  correctAnswers: [
    "Margo Hayes",
    "Crash Pads",
    "Chalk",
    "Bathang",
    "Alex Honnold"
  ],
  answers2: [
    "Ashima Shiraishi",
    "Gloves",
    "Dandruff",
    "Orangu-Hang",
    "Ronnie Van Zant"
  ],

  answers3: [
    "Josune Bereziartu",
    "Rope",
    "Baking Soda",
    "The Rim",
    "Buzz Lightyear"
  ],
  answers4: [
    "Angela Eiter",
    "Knee Pads",
    "Cocaine",
    "The Upside Down Special",
    "Tom Petty"
  ]
};
game.startButton();
