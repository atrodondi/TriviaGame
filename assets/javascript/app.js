// // once the start button is pushed, i am going to randomly grab  number, or item depending on how i write it, from an array and then display the corresponding question of that random # or item as the first question of the game. the empty answer divs will then be filled with the appropriate 4 answer pairs or mates of the initial randomly chosen array item.how to do this? not sure yet.

// make correct answer the same index as the question in first answer array, make the display of them random instead perfect.....:) ??

var game = {
  randomQuestObj: "",
  currentQuestion: "",
  correctGuess: 0,
  wrongGuess: 0,
  unanswered: 0,

  functions: {
    //when start button is pushed, the button is moved to a purgatory div to be hidden
    startButton: function() {
      $("#startButton").on("click", function() {
        $("#startDiv").appendTo("#purgatory");
        console.log("Start button pushed, and should b in purg");
        game.functions.timer30();

        //then we start populating an array with our question objects
        game.questions.push(
          game.question1,
          game.question2,
          game.question3,
          game.question4,
          game.question5
        );
        console.log(game.questions);

        //then we grab a random question object from the array we made
        game.randomQuestObj =
          game.questions[Math.floor(Math.random() * game.questions.length)];
        game.currentQuestion = game.randomQuestObj.question;

        console.log(game.currentQuestion);
        //and display the question to the user
        $("#Q1").html("<p>" + game.currentQuestion + "</p>");
        //working on randomly displaying answers from answers array to user, need to pop each used random collected answer so it doesn't project duplicates
        // var random = game.randomQuestObj.answers.slice();
        // var item = random[Math.floor(Math.random() * random.length)];

        var random = game.randomQuestObj.answers.slice();
        console.log(random);
        random = game.functions.shuffle(random);
        console.log(random);
        for (var i = 0; i < game.randomQuestObj.answers.length; i++) {
          console.log(random[i]);
          // how i pop this item before displaying to html?

          //this is looping through length of answers array, and displaying each answer to a respective button, while also adding a value attribute to each button that reads the same as the button text, i am going to try and use it to check against correct answers with an on click function later
          $("#A" + i)
            .html(random[i])
            .attr("value", random[i]);
        }
      });
    },

    //30 second timer function
    timer30: function() {
      var timeLeft = 30;
      var timerId = setInterval(count, 1000);

      function count() {
        if (timeLeft === -1) {
          clearTimeout(timerId);
          // make a  function elsewhere for unanswered html change, like show answer, picture, etc. then in 5 seconds change to a new question probably and call it here?
        } else {
          $("#timer").html("Time Remaining: " + timeLeft + " seconds");
          timeLeft--;
        }
      }
    },
    //found a shuffle function called, Fisher-Yates shuffle online.
    shuffle: function(array) {
      var currentIndex = array.length,
        temporaryValue,
        randomIndex;

      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    },
    //if Answer button is pushed
    answerClick: function() {
      $(".answer").on("click", function() {
        console.log($(this).attr("value"));
      });
    }
  },

  questions: [],

  question1: {
    question: "Who was the first female to climb the sport grade 9a+/5.15a?",
    correctAnswer: "Margo Hayes",
    answers: [
      "Margo Hayes",
      "Ashima Shiraishi",
      "Josune Bereziartu",
      "Angela Eiter"
    ]
  },
  question2: {
    question: "What protection do you use for bouldering?",
    correctAnswer: "Crashpads",
    answers: ["Crashpads", "Helmets", "Gloves", "Ropes"]
  },
  question3: {
    question: "What white substance helps a climber's grip on the rock?",
    correctAnswer: "Chalk",
    answers: ["Chalk", "Cocaine", "Dandruff", "Baking Soda"]
  },
  question4: {
    question: "What move allows the climber to hang by their feet?",
    correctAnswer: "Bathang",
    answers: ["Bathang", "Orangu-Hang", "The Rim", "The Upside Down Special"]
  },
  question5: {
    question: "Who is the first man to free solo El Cap in Yosemite?",
    correctAnswer: "Alex Honnold",
    answers: ["Alex Honnold", "Ronnie Van Zant", "Buzz Lightyear", "Tom Petty"]
  }
};

game.functions.startButton();
game.functions.answerClick();
