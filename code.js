const currentGen = document.querySelector(".current-gen");
let rows = 25;
let columns = 40;
let genCount = 0;

const heightBtn = document.getElementById("gridHeight");
heightBtn.addEventListener("submit", function (event) {
    event.preventDefault();
    const height = document.getElementById("height").value;
    console.log(height);
    console.log(event.target.value);
    changeGridHeight(height);
});

const widthBtn = document.getElementById("gridWidth");
widthBtn.addEventListener("submit", function (event) {
    event.preventDefault();
    const width = document.getElementById("width").value;
    console.log(width);
    console.log(event.target.value);
    changeGridWidth(width);
});

let playing = false;
let timer;
let reproductionTime = 150; // 500 ms to for dev purposes; 

const grid = new Array(rows);
const nextGrid = new Array(rows);

const resetBtn = document.getElementsByClassName("reset");
resetBtn[0].addEventListener("click", function (event) {
    event.preventDefault();
    resetEntireGrid();
});

function initializeGrids() {
    for (let i = 0; i < rows; i++) {
        grid[i] = new Array(columns);
        nextGrid[i] = new Array(columns);
    }
}

function resetGrids() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            grid[i][j] = 0;
            nextGrid[i][j] = 0;
        }
    }
}

function copyAndResetGrid() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            grid[i][j] = nextGrid[i][j];
            nextGrid[i][j] = 0;
        }
    }
}

// initialize
function initialize() {
    createTable(); // immediately create the table
    initializeGrids(); // call the grids so we'll have two 2-D arrays
    resetGrids(); // make all cells "dead"
    setupControlButtons(); // get buttons onto the page as soon as the page is loaded
}

function createTable() {
    console.log("createTable", columns);
    const gridContainer = document.getElementById("gridContainer");
    if (!gridContainer) {
        console.error("Problem: no div for the grid table!");
    }

    const table = document.createElement("table");
    for (let i = 0; i < rows; i++) {
        const tr = document.createElement("tr");
        for (let j = 0; j < columns; j++) {
            const cell = document.createElement("td");
            cell.setAttribute("id", i + "_" + j);
            cell.setAttribute("class", "dead");
            cell.onclick = cellClickHandler;
            tr.appendChild(cell);
        }
        table.appendChild(tr);
    }
    gridContainer.appendChild(table);
}

function cellClickHandler() {
    const rowCol = this.id.split("_");
    const row = rowCol[0];
    const column = rowCol[1];
    const classes = this.getAttribute("class");
    if (classes.indexOf("live") > -1) {
        this.setAttribute("class", "dead");
        grid[row][column] = 0;
    } else {
        this.setAttribute("class", "live");
        grid[row][column] = 1;
    }
}

function updateView() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const cell = document.getElementById(i + "_" + j);
            console.log("cell", cell);
            if (grid[i][j] == 0) {
                cell.setAttribute("class", "dead");
            } else {
                cell.setAttribute("class", "live");
            }
        }
    }
}

function changeGridHeight(height) {
    console.log("changeGridHeight", height);
    rows = height;
    const resetContainer = document.getElementById("gridContainer");
    resetContainer.removeChild(resetContainer.firstChild);
    console.log(resetContainer.childNodes);
    console.log(rows);
    createTable();
}

function changeGridWidth(width) {
    console.log("changeGridWidth", width);
    columns = width;
    const resetContainer = document.getElementById("gridContainer");
    resetContainer.removeChild(resetContainer.firstChild);
    console.log(resetContainer.childNodes);
    console.log(columns);
    createTable();
}

function resetEntireGrid() {
    console.log("resetEntireGrid");
    rows = 25;
    columns = 40;
    const resetContainer = document.getElementById("gridContainer");
    resetContainer.removeChild(resetContainer.firstChild);
    console.log(resetContainer.childNodes);
    console.log(columns, rows);
    createTable();
}

function setupControlButtons() {
    // button to start
    const startButton = document.getElementById("start");
    startButton.onclick = startButtonHandler;

    // button to clear
    const clearButton = document.getElementById("clear");
    clearButton.onclick = clearButtonHandler;

    // button to choose random cells
    const randomButton = document.getElementById("random");
    randomButton.onclick = randomButtonHandler;

    // button to speed up
    const speedupButton = document.getElementById("speedup");
    speedupButton.onclick = speedBtnHandler;

    // button to slow down
    const slowdownButton = document.getElementById("slowdown");
    slowdownButton.onclick = slowDownHandler;

    // set state of glider
    const gliderButton = document.getElementById("glider");
    gliderButton.onclick = gliderHandler;

    // set state of pulsar
    const pulsarButton = document.getElementById("pulsar");
    pulsarButton.onclick = pulsarHandler;

    // Set state of Gosper Gun
    // const gosperGunBtn = document.getElementById("gosper-gun");
    // gosperGunBtn.onclick = gosperGunHandler;
}

function speedBtnHandler() {
    console.log("Speeding up by 50 increments");
    reproductionTime -= 50;
}

function slowDownHandler() {
    console.log("Slowing down by 50 increments");
    reproductionTime += 50;
}

function randomButtonHandler() {
    if (playing) return;
    clearButtonHandler();
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const isAlive = Math.round(Math.random());
            console.log("isAlive", isAlive);
            if (isAlive == 1) {
            const cell = document.getElementById(i + "_" + j);
            cell.setAttribute('class', 'live');
            grid[i][j] = 1;
            }
        }
    }
}

// Glider Cell Preset
function gliderHandler() {
    let gliderPattern = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
  
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const glider = gliderPattern[i][j];
            if (glider == 1) {
            const cell = document.getElementById(i + "_" + j);
            cell.setAttribute("class", "live");
            grid[i][j] = 1;
            }
        }
    }
}

function pulsarHandler() {
    let pulsarPattern = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
  
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const pulsar = pulsarPattern[i][j];
            if (pulsar == 1) {
                const cell = document.getElementById(i + "_" + j);
                cell.setAttribute("class", "live");
                grid[i][j] = 1;
            }
        }
    }
}

function clearButtonHandler() {
    console.log("Clear the game: stop playing, clear the grid");
    playing = false;
    genCount = 0;
    const startButton = document.getElementById("start");
    startButton.innerHTML = "Start";
    currentGen.innerHTML = `<h3 class="myGen">Current Generation: ${genCount}</h3>`;

    clearTimeout(timer);

    const cellsList = document.getElementsByClassName("live"); // nodelist
    const cells = [];
    for (let i = 0; i < cellsList.length; i++) {
        cells.push(cellsList[i]);
    }
    for (let i = 0; i < cells.length; i++) {
        cells[i].setAttribute("class", "dead");
    }
    resetGrids();
}

function startButtonHandler() {
    if (playing) {
        console.log("Pause the game");
        playing = false;
        this.innerHTML = "Continue";
        clearTimeout(timer);
    } else {
        console.log("Continue the game");
        playing = true;
        this.innerHTML = "Pause";
        play();
    }
}

function play() {
    console.log("Play the game");
    genCount++;
    console.log(genCount);
    currentGen.innerHTML = `<h3 class="myGen">Current generation: ${genCount}</h3>`;
    computeNextGen();
    if (playing) { 
        timer = setTimeout(play, reproductionTime);
    }
}

function computeNextGen() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < column; j++) {
          applyRules(i, j);
        }
    }    
    copyAndResetGrid();
    updateView();
}

/* RULES
1. Any live cell with fewer than two live neighbors dies, as if caused by under-population.
2. Any live cell with two or three live neighbors lives on to the next generation.
3. Any live cell with more than three live neighbors dies, as if by overcrowding.
4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction. */

function applyRules(row, column) {
    const numNeighbors = countNeighbors(row, column);
    if (grid[row][column] == 1) {
        if (numNeighbors < 2) {
            nextGrid[row][column] = 0;
        } else if (numNeighbors == 2 || numNeighbors == 3) { 
            nextGrid[row][column] = 1;
        } else if (numNeighbors > 3) { /
            nextGrid[row][column] = 0;
        }
    } else if (grid[row][column] == 0) { 
        if (numNeighbors == 3) {
            nextGrid[row][column] = 1;
        }
    }
}

function countNeighbors(row, column) {
    let count = 0;

    if (row - 1 >= 0) {
        // 
        if (grid[row - 1][column] == 1) count++;
    }
    
    if (row - 1 >= 0 && column - 1 >= 0) {
        if (grid[row - 1][column - 1] == 1) count++;
    }

    if (row - 1 >= 0 && column + 1 < columns) {
        if (grid[row - 1][column + 1] == 1) count++;
    }

    if (column - 1 >= 0) {
        if (grid[row][column - 1] == 1) count++;
    }

    if (column + 1 < columns) {
        if (grid[row][column + 1] == 1) count++;
    }

    if (row + 1 < rows) {
        if (grid[row + 1][column] == 1) count++;
    }
    
    if (row + 1 < rows && column - 1 >= 0) {
        if (grid[row + 1][column - 1] == 1) count++;
    }
    
    if (row + 1 < rows && column + 1 < columns) {
        if (grid[row + 1][column + 1] == 1) count++;
    }
    
    return count;
}

// Start Everything
window.onload = initialize;