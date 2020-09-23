let rows = 25;
let columns = 40;

// keep track of whether or not the game is playing
let playing = false;
// Set state of 2 grids - double-buffering
let grid = new Array(rows);
let nextGrid = new Array(rows)

// Initialize both grids that will add an array to each item in both grids
function initializeGrids() {
    // since both grids are the same size, we can do this in one single loop
    for (let i = 0; i < rows; i++) {
        /* loops over every row and add another array with the num of columns to that row in both grids. */
        grid[i] = new Array(columns);
        nextGrid[i] = new Array(columns);
    }
}

/* Make sure both grid arrays have a 0 in every cell - every cell starts in the "dead" state. We're using 0 for dead and 1 for alive. Instead of doing this in the initializeGrids function, we're using the resetGrids function to clear out the 2 arrays when you click the clear button. */
function resetGrids() {
    // loop over every row and column in both grids & sets both i and j to 0
    // resets both grids to all dead cells
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            grid[i][j] = 0;
            nextGrid[i][j] = 0;
        }
    }
}

/* Once we've gone through every row and every column, we copy the new state values in the nextGrid array back into grid so that it becomes the current state. It also resets nextGrid to all zeros so that it's a clean slate for another new state. */
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
    // immediately create the table
    createTable();
    // call the grids so we'll have two 2-D arrays
    initializeGrids();
    // make all cells "dead"
    resetGrids();
    // get buttons onto the page as soon as the page is loaded
    setupControlButtons();
}


// Board Layout
function createTable() {
    let gridContainer = document.getElementById("gridContainer");
    if (!gridContainer) {
        // throw error if it doesn't exist
        console.error("Problem: no div for the grid table!");
    }

    let table = document.createElement("table");

    // outer loop will iterate through all the rows
    for (let i = 0; i < rows; i++) {
        // as we go through all the rows, we create a new one
        // The <tr> tag defines a row in an HTML table.
        let tr = document.createElement("tr");
        // iterate through all the columns
        for (let j = 0; j < columns; j++) {
            // go through all the columns and create a new one
            // The <td> tag defines a standard data cell in an HTML table.
            let cell = document.createElement("td");
            // each cell needs a unique ID - adding ID by using row number and the column number
            // the underscore makes it easier to read row_col location
            cell.setAttribute("id", i + "_" + j);
            // Add CSS class to cell for styling
            cell.setAttribute("class", "dead")
            // Add click handler for switching from Dead to Alive cells
            cell.onclick = cellClickHandler;
            // Add the tCol to the row (cell is the tCols)
            tr.appendChild(cell);
        }

        // Add the row element to the table; also ends outer loop
        table.appendChild(tr);
    }

    // Add table to grid container
    gridContainer.appendChild(table);
}

// Click handler to change Dead to Alive and vice versa
function cellClickHandler() {
    /* We click on a cell. With the split func, it separates the location by row and column - creating an array of 2 values. We use these variables to determine the row and the column for the cell in the model that corresponds to the cell in the view. */
    let rowCol = this.id.split("_");
    let rows = rowCol[0];
    let columns = rowCol[1]
    
    // Get element class using getAttribute
    let classes = this.getAttribute("class");
    // Check to see in the class contains the string live
    /* If classes contains the string "live", then the result will be 0 because the index of the first letter, "l" is at position 0 in the classes string. If the string in classes was "not live", then the result would be 4. So we check for > -1 because the result can be 0 or greater.*/
    if (classes.indexOf("live") > -1) {
        // if live cell, switch it to dead class attr
        this.setAttribute("class", "dead");
        // live cell becomes dead by setting state to 0
        grid[rows][columns] = 0;
    } else {
        // if the selected cell is not live, switch it to live class attr
        this.setAttribute("class", "live")
        // clicked on dead cell to make it live by setting state to 1
        grid[rows][columns] = 1;
        
    }
}

// Update the view
/* updateView looks through every cell in the grid array, which contains the current state of the game (the state we just copied from next grid), and updates the view. That is, the view is the table in the page with that state. It's done by updating the class attr on the cells in the table. */
function updateView() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let cell = document.getElementById(i + "_" + j);
            if (grid[i][j] == 0) {
                cell.setAttribute("class", "dead");
            } else {
                cell.setAttribute("class", "live");
            }
        }
    }
}

function setupControlButtons() {
    // button to start
    let startButton = document.getElementById("start");
    startButton.onclick = startButtonHandler;

    // button to clear
    let clearButton = document.getElementById("clear");
    clearButton.onclick = clearButtonHandler;
}

function clearButtonHandler() {
    console.log("Clear the game: stop playing, clear the grid");
    /* we've cleared the game, meaning we're no longer playing so it needs to be set to false */
    playing = false;
    /* this is clear button rather than the start button; it clears the board and resets the start button */
    let startButton = document.getElementById("start")
    // set the start button's state to Start when Clear is clicked on
    startButton.innerHTML = "Start";
}

function startButtonHandler() {
    // handle 2 different cases for the start button
    // if the game is not running, button says continue
    if (playing) {
        console.log("Pause the game");
        playing = false;
        this.innerHTML = "Continue";
    } else {
        // otherwise, the button will say pause the game
        console.log("Continue the game");
        playing = true;
        this.innerHTML = "Pause";
        play();
    }
}

function play() {
    console.log("Play the game");
    computeNextGen();
}

/* This function drives the computation by taking one cell in the grid and passing it to applyRules. 

Iterate through all the cells in the grid state and call the applyRules function on each cell to apply the rules of the game and save the next generation of cells in the nextGrid array. 
*/
function computeNextGen() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            applyRules(i,j);
        }
    }

    // copy nextGrid to grid then reset nextGrid
    copyAndResetGrid();
    // copy all 1 values to "live" in the table
    updateView();
}

/* RULES
1. Any live cell with fewer than two live neighbors dies, as if caused by under-population.
2. Any live cell with two or three live neighbors lives on to the next generation.
3. Any live cell with more than three live neighbors dies, as if by overcrowding.
4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction. */

/* This function knows how to apply the rules of the game to a single cell. */
function applyRules(row, column) {
    let numNeighbors = countNeighbors(row, column);
    // check to see if current cell is alive or dead - Alive: 1 Dead: 0
    // The updated state is stored in the nextGrid array
    if (grid[row][column] == 1) {
        // if cell neighbors are less than 2, cell dies
        if (numNeighbors < 2) {
            nextGrid[row][column] = 0;
        }   // if cell neighbor count is 2 or 3, cell lives
            else if (numNeighbors == 2 || numNeighbors == 3) {
            nextGrid[row][column] = 1;
        }   // if cell neighbor count is 4 or more, cell dies
            else if (numNeighbors > 3) {
            nextGrid[row][column] = 0
        }
    } else if (grid[row][column] == 0) { // checking count when cell is dead
        if (numNeighbors == 3) {
            // if cell neighbors are exactly 3, cell comes back to life
            nextGrid[row][column] = 1;
        }
    }
}

/* This countNeighbors function is a helper function that counts the number of live neighbor cells a cell has. 

Passing in the row and column of the cell we're checking and we'll use the local variable, count, to keep track of the number of live neighbors that the cell has. While straightforward, there are a lot of edge cases that need to be checked.  

If the cell is on the edge of the grid or in the corner of the grid, we need to keep in mind that it won't have 8 neighbors like all the cells in the middle of the grid have. 

Check to make sure that each neighbor of a cell exists before we check the cell itself.  */
function countNeighbors(row, column) {
    let count = 0;

    // check the neighbor above in the same column
    if (row - 1 >= 0) {
        // if neighbor exists & is alive, we increase the count
        if (grid[row - 1][column] == 1) count++;
    }

    // check the neighbor to the upper left corner of the cell; this cell cannot be anywhere in either the first row or the first column
    if (row - 1 >= 0 && column - 1 >= 0) {
        // if upper left neighbor is alive, increase the count
        if (grid[row - 1][column - 1] == 1) count++;
    }

    // upper right of the current cell; the row must be greater than 0 & the column + 1 must be less than the number of columns in the grid
    // the cell can't be anywhere in the first row or in the last column of the grid
    if (row - 1 >= 0 && column + 1 < columns) {
        if (grid[row - 1][column + 1] == 1) count++;
    }

    // Check neighbors to the left
    if (column - 1 >= 0) {
        if (grid[row][column - 1] == 1) count++
    }

    // Check neighbors to the right
    if (column + 1 < columns) {
        if (grid[row][column + 1] == 1) count++
    }

    // Check neighbors directly below the cell
    if (row + 1 < rows) {
        if (grid[row + 1][column] == 1) count++;
    }
    
    // Check the neighbors below to the lower left of the cell
    if (row + 1 < rows && column - 1 >= 0) {
        if (grid[row + 1][column - 1] == 1) count++
    }
    
    // Check the neighbors below to the lower right of the cell
    if (row + 1 < rows && column + 1 < columns) {
        if (grid[row + 1][column + 1] == 1) count++;
    }
    

    return count;
}

// Start Everything
window.onload = initialize;