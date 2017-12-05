from flask import Flask, render_template
from flask import request, abort
import json

app = Flask(__name__)
questions = {'default':'foo'}

questions['foo'] = open("quiz/questions.js", "r").read()

@app.route("/")
def get_index():
    return app.send_static_file("index.html")

@app.route("/quiz/<quiz_id>")
def get_quiz(quiz_id):
    if quiz_id not in questions:
        return "not found"
    return render_template("quiz.html", quiz_id=quiz_id)

@app.route("/questions/<quiz_id>")
def get_questions(quiz_id):
    return questions.get(quiz_id) 

@app.route("/js/quiz.js")
def get_quiz_js():
    return app.send_static_file("js/quiz.js")

@app.route("/submit", methods=['POST','GET'])
def post_submit():
    data = request.get_json()
    print(data)
    quiz_id = data.get('id')

    if quiz_id in questions:
        abort(409)
    if quiz_id == None:
        abort(400)

    questions[quiz_id] = json.dumps(data)
    return 'cool cool'
