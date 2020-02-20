// // once the start button is pushed, i am going to randomly grab  number, or item depending on how i write it, from an array and then display the corresponding question of that random # or item as the first question of the game. the empty answer divs will then be filled with the appropriate 4 answer pairs or mates of the initial randomly chosen array item.how to do this? not sure yet.

// make correct answer the same index as the question in first answer array, make the display of them random instead perfect.....:) ??

var game = {
  randomQuestObj: "",
  currentQuestion: "",
  correctCount: 0,
  wrongCount: 0,
  unanswered: 0,
  selectedQuestions: [],
  selected: "",

  functions: {
    //when start button is pushed, the button is moved to a purgatory div to be hidden
    startButton: function() {
      $("#startButton").on("click", function() {
        $("#startDiv").appendTo("#purgatory");
        console.log("Start button pushed, and should b in purg");
        $("#timer").css("visibility", "visible");
        $(".answer").css("visibility", "visible");
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
        console.log(game.randomQuestObj);
        console.log(game.randomQuestObj.index);
        selected = game.randomQuestObj.index;
        for (var i = 0; i < game.questions.length; i++) {
          if (game.questions[i].index === game.randomQuestObj.index) {
            game.selectedQuestions.push(game.questions[i]);
            game.questions.splice(game.questions[i].index, 1);
          }
        }
        console.log(game.selectedQuestions);
        console.log(game.questions);
        game.currentQuestion = game.randomQuestObj.question;

        //and display the question to the user
        $("#Q1").html("<p>" + game.currentQuestion + "</p>");
        //working on randomly displaying answers from answers array to user, need to pop each used random collected answer so it doesn't project duplicates
        // var random = game.randomQuestObj.answers.slice();
        // var item = random[Math.floor(Math.random() * random.length)];

        var random = game.randomQuestObj.answers.slice();
        random = game.functions.shuffle(random);
        for (var i = 0; i < game.randomQuestObj.answers.length; i++) {
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
        var guess = $(this).attr("value");
        game.functions.nextPageTimeOut();
        console.log(guess);
        console.log(game.questions);
        if (guess === game.randomQuestObj.correctAnswer) {
          game.correctCount++;
          console.log(game.correctCount);
          //clears html of buttons on page if correct button pushed, will be same for others
          $("#Q1").html("Correct! Good Job!");
          $(".answer").css("visibility", "hidden");
          $("#transitionPic").html(
            '<img src=" assets/images/' +
              game.randomQuestObj.correctAnswer +
              '.jpg" >'
          );

          //running the code to go to next page. congratulate?
        } else if (guess !== game.randomQuestObj.correctAnswer) {
          game.wrongCount++;
          console.log(game.wrongCount);
          $("#Q1").html("Nope!");
          $(".answer").css("visibility", "hidden");
          $("#transitionText").html(
            "The correct answer was: " + game.randomQuestObj.correctAnswer
          );
          $("#transitionPic").html(
            '<img src=" assets/images/' +
              game.randomQuestObj.correctAnswer +
              '.jpg" >'
          );
          //runnign code to go to next page. show correct answer?
        } else {
        } //if timer runs out, then go to next page, which shows correct answer
      });
    },
    nextPageTimeOut: function() {
      setTimeout(function() {
        console.log("next page mang!");
      }, 5000);
    }
  },

  questions: [],

  question1: {
    index: 0,
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
    index: 1,
    question: "What protection do you use for bouldering?",
    correctAnswer: "Crashpads",
    answers: ["Crashpads", "Helmets", "Gloves", "Ropes"]
  },
  question3: {
    index: 2,
    question: "What white substance helps a climber's grip on the rock?",
    correctAnswer: "Chalk",
    answers: ["Chalk", "Cocaine", "Dandruff", "Baking Soda"]
  },
  question4: {
    index: 3,
    question: "What move allows the climber to hang by their feet?",
    correctAnswer: "Bathang",
    answers: ["Bathang", "Orangu-Hang", "The Rim", "The Upside Down Special"]
  },
  question5: {
    index: 4,
    question: "Who is the first man to free solo El Cap in Yosemite?",
    correctAnswer: "Alex Honnold",
    answers: ["Alex Honnold", "Ronnie Van Zant", "Buzz Lightyear", "Tom Petty"]
  }
};

game.functions.startButton();
game.functions.answerClick();
