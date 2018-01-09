defaultQuiz = {
  "id": "myQuiz",
  "questions": []
}

defaultQuestion = {
      "question": "question name",
      "answers": {
        "a": "Answer A",
        "b": "Answer B",
        "c": "Answer C",
        "d": "Answer D"
      },
      "correctAnswer": "a"
    }

function setDefaultQuiz() {
  editTextArea(quiz => Object.assign(quiz, defaultQuiz))
}

function addQuestion() {
  editTextArea(quiz => quiz.questions.push(defaultQuestion))
}

function setID(text_box) {
  editTextArea(quiz => quiz.id = text_box.value);
}

function setQuestionName(questionNameBox) {
  var questionNumber = questionNameBox.id.replace(/\D/g,''); //strip non-numbers from id
  editTextArea(quiz => quiz.questions[questionNumber].question = questionNameBox.value);
}

function setAnswer(answerBox) {
  var letter = answerBox.id.slice(-1);  //last char of id is the letter
  var questionNumber = answerBox.id.replace(/\D/g,'');  //strip non-numbers from id
  editTextArea(quiz => quiz.questions[questionNumber].answers[letter] = answerBox.value);
}

function setCorrectAnswer(correctAnswerSelector) {
  var questionNumber = correctAnswerSelector.id.replace(/\D/g,''); //strip non-numbers from id
  editTextArea(quiz => quiz.questions[questionNumber].correctAnswer = correctAnswerSelector.value)
}

function editTextArea(editFunc) {
  text_area = document.getElementById("textArea");
  quiz = JSON.parse(text_area.value);
  editFunc(quiz);
  quiz = JSON.parse(JSON.stringify(quiz));
  text_area.value = JSON.stringify(quiz, undefined, 2);
  var debug = true;
  if (debug) {
    updateStuff(quiz);
  }
}

function addQuestionToDom(questionNumber) {
  var questionTemplate = document.getElementById("template");
  questionNode = document.importNode(questionTemplate, true);
  
  for (let inputElement of questionNode.content.querySelectorAll("[id*='{qnum}']")) {
    inputElement.id = inputElement.id.replace("{qnum}", questionNumber)
  }
  
  questionArea.appendChild(questionNode.content)
}

function updateStuff(quiz) {
  var questionArea = document.getElementById("questionArea");
  
  for (var i = 0; i < quiz.questions.length; i++) {
    if (document.getElementById(`question${i}`) === null) {
      addQuestionToDom(i);
    }
    
    var question = quiz.questions[i];
    
    var questionName = document.getElementById(`question${i}name`);
    questionName.value = question.question;

    for (var letter of ['a', 'b', 'c', 'd']) {
      var answer = document.getElementById(`question${i}${letter}`);
      answer.value = question.answers[letter];
    }
    
    var answer = document.getElementById(`answer${i}`);
    answer.value = question.correctAnswer;
  }
}