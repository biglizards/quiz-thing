score = 0
questionNum = -1

function checkAnswer() {
  var answer = questions[questionNum].correctAnswer
  var selected = document.querySelector('input[name="answer"]:checked').value
  if (selected == answer) {
    console.log("correct")
    score++
  } else {
    console.log("incorrect")
  }
}

function nextQuestion() {
  var qnum = document.getElementById("questionNum")
  var qname = document.getElementById("questionName")

  questionNum++
  var question = questions[questionNum]
  if (question == undefined) {
    return endQuiz()
  }

  qname.innerHTML = escapeHtml(question.question)
  qnum.innerHTML = questionNum

  buttons = ["a", "b", "c", "d"]
  for (button of buttons) {
    text = document.getElementById("text" + button)
    text.innerHTML = escapeHtml(question.answers[button])
  }
}

function endQuiz() {
  document.getElementById("quizArea").innerHTML = `<h3>Thanks for playing The quiz!<br>Your final score was ${score}/5`
}

function submitAnswer() {
  checkAnswer()
  nextQuestion()
}

var entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

function escapeHtml (string) {
  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
    return entityMap[s];
  });
}
