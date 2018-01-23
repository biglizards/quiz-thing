from flask import Flask, render_template
from flask import request, abort, send_from_directory
import json

app = Flask(__name__)
questions = {}

# add default just for testing
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

@app.route("/js/<path:file>")
def get_quiz_js(file):
    return send_from_directory("static/js", file)

@app.route("/css/<path:file>")
def get_quiz_css(file):
    return send_from_directory("static/css", file)

@app.route("/editor")
def get_editor():
    return app.send_static_file("editor.html")

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
