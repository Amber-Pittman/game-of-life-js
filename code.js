let rows = 25;
let columns = 25;

// initialize
function initialize() {
    createTable();
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
    // Get element class using getAttribute
    let classes = this.getAttribute("class");
    // Check to see in the class contains the string live
    // If classes contains the string "live", then the result will be 0 because the index of the first letter, "l" is at position 0 in the classes string. If the string in classes was "not live", then the result would be 4. So we check for > -1 because the result can be 0 or greater.
    if (classes.indexOf("live") > -1) {
        // if live cell, switch it to dead class attr
        this.setAttribute("class", "dead");
    } else {
        // if the selected cell is not live, switch it to live class attr
        this.setAttribute("class", "live")
    }
}


// Start Everything
window.onload = initialize;