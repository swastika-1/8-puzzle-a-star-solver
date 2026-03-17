let puzzle = [
    [1,2,3],
    [4,5,6],
    [7,8,0]
];

let manualMoves = 0;
let manualStartTime = null;
let optimalMoves = null;
let liveSteps = 0;

function drawBoard() {
    let board = document.getElementById("board");
    board.innerHTML = "";

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let tile = document.createElement("div");
            tile.className = "tile";

            if (puzzle[i][j] === 0) {
                tile.classList.add("empty");
            } else {
                tile.innerText = puzzle[i][j];
                tile.onclick = () => moveTile(i, j);
            }

            board.appendChild(tile);
        }
    }
}

function findEmpty() {
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            if (puzzle[i][j] === 0)
                return [i, j];
}

function moveTile(i, j) {
    let [x, y] = findEmpty();

    if ((Math.abs(i-x) + Math.abs(j-y)) === 1) {

        if (manualMoves === 0)
            manualStartTime = new Date();

        puzzle[x][y] = puzzle[i][j];
        puzzle[i][j] = 0;

        manualMoves++;
        liveSteps = manualMoves;
        document.getElementById("liveSteps").innerText = liveSteps;

        drawBoard();
        checkManualSolve();
    }
}

function checkManualSolve() {

    const goal = [
        [1,2,3],
        [4,5,6],
        [7,8,0]
    ];

    if (JSON.stringify(puzzle) === JSON.stringify(goal)) {

        let totalTime = ((new Date() - manualStartTime) / 1000).toFixed(3);

        let resultText = `
        🎉 <b>Manual Solve Completed!</b><br>
        Manual Moves: ${manualMoves}<br>
        Time Taken: ${totalTime} sec<br>
        `;

        if (optimalMoves !== null) {
            resultText += `Optimal Moves (A*): ${optimalMoves}<br>`;
            if (manualMoves === optimalMoves)
                resultText += "🔥 You solved optimally!";
            else
                resultText += `⚡ Extra Moves: ${manualMoves - optimalMoves}`;
        }

        document.getElementById("result").innerHTML = resultText;
    }
}

function shuffle() {

    manualMoves = 0;
    manualStartTime = null;
    optimalMoves = null;
    liveSteps = 0;

    document.getElementById("liveSteps").innerText = 0;
    document.getElementById("result").innerHTML = "";

    for (let k = 0; k < 30; k++) {

        let [x, y] = findEmpty();
        let possible = [];

        if (x > 0) possible.push([x-1, y]);
        if (x < 2) possible.push([x+1, y]);
        if (y > 0) possible.push([x, y-1]);
        if (y < 2) possible.push([x, y+1]);

        let [nx, ny] = possible[Math.floor(Math.random() * possible.length)];

        puzzle[x][y] = puzzle[nx][ny];
        puzzle[nx][ny] = 0;
    }

    drawBoard();
}

function solvePuzzle() {

    document.getElementById("solveBtn").disabled = true;
    document.getElementById("result").innerHTML = "Solving...";

    fetch("/solve", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({puzzle: puzzle})
    })
    .then(response => response.json())
    .then(data => {

        document.getElementById("solveBtn").disabled = false;

        if (data.error) {
            document.getElementById("result").innerHTML = data.error;
            return;
        }

        optimalMoves = data.moves;

        animateSolution(data.path);

        document.getElementById("result").innerHTML =
            `<b>A* Solution</b><br>
             Optimal Moves: ${data.moves}<br>
             Time: ${data.time} sec<br>
             Explored Nodes: ${data.explored_nodes}<br>
             Initial Manhattan: ${data.initial_manhattan}<br>
             Complexity: ${data.complexity}`;
    });
}

function animateSolution(path) {

    let speed = document.getElementById("speedSlider").value;
    let i = 0;

    liveSteps = 0;
    document.getElementById("liveSteps").innerText = 0;

    const interval = setInterval(() => {

        if (i >= path.length) {
            clearInterval(interval);
            return;
        }

        puzzle = path[i].map(row => [...row]);
        drawBoard();

        if (i > 0) {
            liveSteps++;
            document.getElementById("liveSteps").innerText = liveSteps;
        }

        i++;
    }, speed);
}

drawBoard();