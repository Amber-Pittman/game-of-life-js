let rows = 25;
let columns = 25;

// initialize
function initialize() {
    createTable();
}


// Board Layout
function createTable() {
    let table = document.createElement("table");

    // outer loop will iterate through all the rows
    for (let i = 0; i < rows; i++) {
        // as we go through all the rows, we create a new one
        let tRows = document.createElement("tRows");
        // iterate through all the columns
        for (let j = 0; j < columns; j++) {
            // go through all the columns and create a new one
            let cell = document.createElement("tCols");
            // each cell needs a unique ID - adding ID by using row number and the column number
            cell.setAttribute("id", i + "_" + j);
            // Add CSS class to cell for styling
            cell.setAttribute("class", "dead")
            // Add the tCol to the row (cell is the tCols)
            tRows.appendChild(cell);
        }
    }

    // Add the row element to the table; also ends outer loop
    table.appendChild(tRows);
}


// Start Everything
window.onload = initialize;