from flask import Flask, render_template, request, jsonify
from solver import a_star

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/solve", methods=["POST"])
def solve():
    data = request.json["puzzle"]
    start = tuple(tuple(row) for row in data)
    result = a_star(start)
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)