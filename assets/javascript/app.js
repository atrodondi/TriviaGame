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
        $("#startDiv").css("display", "none");
        $("#Q1").css("visibility", "visible");
        $("#timer").css("visibility", "visible");
        $(".answer").css("visibility", "visible");
        $(".answerDiv").css("visibility", "visible");

        //then we start populating an array with our question objects
        game.questions.push(
          game.question1,
          game.question2,
          game.question3,
          game.question4,
          game.question5
        );

        //then we grab a random question object from the array we made
        game.functions.generateQPage();
      });
    },

    //30 second timer function
    timer30: function() {
      timeLeft = 30;
      timerId = setInterval(count, 1000);

      function count() {
        if (timeLeft === -1) {
          clearTimeout(timerId);
          game.unanswered++;
          game.functions.timeRanOut();
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
        var guess = $(this).attr("value");
        game.functions.nextPageTimeOut();
        clearTimeout(timerId);
        if (guess === game.randomQuestObj.correctAnswer) {
          game.correctCount++;
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
          $("#Q1").html(
            "Nope! The correct answer was: " + game.randomQuestObj.correctAnswer
          );
          $(".answer").css("visibility", "hidden");
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
    //the function that is run during a transition from one question page to another after an answer is chosen -> END OF GAME CONdition is in here
    nextPageTimeOut: function() {
      transTime = setTimeout(() => {
        transition();
      }, 5000);
      function transition() {
        if (game.questions.length === 0) {
          //code here to go to end of game page?
          console.log("game over");
          $("#timer").empty();
          $("#transitionText").empty();
          $("#transitionPic").empty();
          $("#Q1").html("Send it! Here are your 'grades' !");
          $(".endStat").css("display", "block");
          $("#answerDiv0").html(
            "<h2 id='endCount1'>Correct Answers: " + game.correctCount + "</h2>"
          );
          $("#answerDiv1").html(
            "<h2 id='endCount2'>Wrong Answers: " + game.wrongCount + "</h2>"
          );
          $("#answerDiv2").html(
            "<h2 id ='endCount3'>Unaswered: " + game.unanswered + "</h2>"
          );
          $("#restart").css("visibility", "visible");
        } else {
          console.log("next page mang!");
          game.functions.generateQPage();
        }
      }
    },
    //generates a new question page. gets a random question obj from the array, gets the question from it
    generateQPage: function() {
      if (game.questions.length > -1) {
        game.functions.timer30();
        game.randomQuestObj =
          game.questions[Math.floor(Math.random() * game.questions.length)];
        selected = game.randomQuestObj.index;
        for (var i = 0; i < game.questions.length; i++) {
          if (game.questions[i].index === game.randomQuestObj.index) {
            game.selectedQuestions.push(game.questions[i]);
            game.questions.splice(game.questions.indexOf(game.questions[i]), 1);
          }
        }
        console.log(game.selectedQuestions);
        console.log(game.questions);
        game.currentQuestion = game.randomQuestObj.question;

        //and display the question to the user
        $("#Q1").html("<p>" + game.currentQuestion + "</p>");

        //here i am making a variable copy of the array so it doesnt alter the main array
        //then i shuffle the array so it appears random on each play
        var random = game.randomQuestObj.answers.slice();
        random = game.functions.shuffle(random);
        $("#transitionText").empty();
        $("#transitionPic").empty();
        $(".answer").css("visibility", "visible");
        for (var i = 0; i < game.randomQuestObj.answers.length; i++) {
          //this is looping through length of answers array, and displaying each answer to a respective button, while also adding a value attribute to each button that reads the same as the button text, i am going to try and use it to check against correct answers with an on click function later
          $("#A" + i)
            .html(random[i])
            .attr("value", random[i]);
        }
      }
    },

    //what happens if time runs out during a question
    timeRanOut: function() {
      game.functions.nextPageTimeOut();
      $("#Q1").html(
        "Oops! You ran out of time. The correct answer was: " +
          game.randomQuestObj.correctAnswer
      );
      $(".answer").empty();
      $("#transitionPic").html("<img src='assets/images/watch.jpg'>");
    },
    //what happens when restart button is pushed after game is over
    restart: function() {
      $("#restart").on("click", function() {
        console.log(game.questions);
        $("#timer").css("visibility", "hidden");
        $(".answer").css("visibility", "hidden");
        $(".answerDiv").css("visibility", "hidden");
        $("#Q1").css("visibility", "hidden");
        $("#transitionText").empty();
        $("#transitionPic").empty();
        $("#startDiv").css("display", "inline-block");
        $(".endStat").css("display", "none");

        $("#restart").css("visibility", "hidden");

        game.selectedQuestions = [];
        game.correctCount = 0;
        game.wrongCount = 0;
        game.unanswered = 0;
        game.randomQuestObj = "";
        game.currentQuestion = "";
      });
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
    answers: ["Chalk", "Powdered Sugar", "Dandruff", "Baking Soda"]
  },
  question4: {
    index: 3,
    question: "What move allows the climber to hang by their feet?",
    correctAnswer: "Bathang",
    answers: ["Bathang", "Orangu-Hang", "The Rim", "The Upside Down Special"]
  },
  question5: {
    index: 4,
    question: "Who is the first person to free solo El Cap in Yosemite?",
    correctAnswer: "Alex Honnold",
    answers: ["Alex Honnold", "Ronnie Van Zant", "Buzz Lightyear", "Tom Petty"]
  }
};

game.functions.startButton();
game.functions.answerClick();
game.functions.restart();
