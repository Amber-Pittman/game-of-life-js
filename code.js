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
        for (let j = 0; j < rows; j++) {
            grid[i][j] = 0;
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
}

// Start Everything
window.onload = initialize;