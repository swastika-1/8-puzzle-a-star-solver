# 8 Puzzle Solver using A* Algorithm

## Overview

This project is an interactive 8-Puzzle Solver implemented using the A* Search Algorithm.  
The application allows users to manually play the puzzle or automatically solve it while visualizing each step taken by the algorithm.

The goal of the puzzle is to arrange the numbered tiles in the correct order by sliding them into the empty space.

---

## Features

• Interactive puzzle board  
• Manual tile movement  
• Automatic solving using A* algorithm  
• Step-by-step solution visualization  
• Displays optimal moves and explored nodes  
• Adjustable animation speed  

---

## Technologies Used

Python – Backend logic  
Flask – Web framework  
HTML – Web page structure  
CSS – Styling and layout  
JavaScript – Puzzle interaction  
A* Search Algorithm – Artificial Intelligence algorithm  

---

## Project Structure

8-puzzle-a-star-solver

app.py – Flask backend server  
solver.py – A* algorithm implementation  

templates/  
  index.html – User interface  

static/  
  script.js – Puzzle logic  
  style.css – UI styling  

---

## Algorithm Used

The project uses the A* (A-Star) search algorithm.

The evaluation function used is:

f(n) = g(n) + h(n)

g(n) = cost from the start node to the current node  
h(n) = heuristic estimate to reach the goal  

This project uses the Manhattan Distance heuristic to calculate the distance of each tile from its correct position.

---

## How to Run the Project

1. Install Python

2. Install Flask

pip install flask

3. Run the application

python app.py

4. Open your browser and go to

http://127.0.0.1:5000

---

## Author

Swastika Gupta
