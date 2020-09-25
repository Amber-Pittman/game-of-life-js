# Conway's Game of Life

For a quick review of what Conway's Game of Life is, I suggest checking out [Stephen Hawkings The Meaning of Life (John Conway's Game of Life segment)](https://youtu.be/CgOcEZinQ2I) on YouTube.

## Rules for Conway's Game of Life
Conway's the Game of Life is a generative type of application, where we enter patterns into a grid. We start this pattern-generating based on only four rules for controlling the grid.

1.  Births: Each dead cell adjacent to exactly three live neighbors will become live in the next generation.

2.  Death by isolation: Each live cell with one or fewer live neighbors will die in the next generation.

3.  Death by overcrowding: Each live cell with four or more live neighbors will die in the next generation.

4.  Survival: Each live cell with either two or three live neighbors will remain alive for the next generation.

## Checklist
- [x] Display includes a text area that shows the current generation of cells being displayed <br>
- [x] Display includes a grid of cells, at least 25x25, that can be toggled to be alive or dead <br>
- [x] Display includes working buttons that start / stop the animation and clear the grid <br>
- [x] Algorithm to generate new generations of cells correctly implemented <br>
- [x] Application includes a section outlining the rules to Conway's "Game of Life" <br>
- [x] Deployed to a hosting service: [https://game-of-life-js.vercel.app/](https://game-of-life-js.vercel.app/) <br>
- [x] Create a few sample cell configurations that users can load and run <br>
- [x] Allow users to specify the speed of the simulation <br>
- [x] Allow users to change the dimension of the grid being displayed <br>


## Overview of the code

With the `heightBtn` and `widthBtn` variables, it allows resizing of the grids. If the user doesn't like the current size they customized with the other two buttons, they can click on the Reset button to return the grid to its original size of 25 rows x 40 columns.

We set our game initial state to false as the game waits for the user to click Start. For the `reproductionTime`, it controls speed in which the cells are changing in milliseconds; it acts as a delay when we call the timer repeatedly.

We double-buffer by creating 2 different grids (`grid` and `nextGrid`) that are being changed out with each regeneration. We initialize both grids that will add an array to each item in both grids. Since both grids are the same size, we can do this in one single loop. It loops over every row and add another array with the num of columns to that row in both grids.

We have to make sure both grid arrays have a 0 in every cell - every cell starts in the "dead" state. We're using 0 for dead and 1 for alive. Instead of doing this in the initializeGrids function, we're using the `resetGrids` function to clear out the 2 arrays when you click the clear button.

In the resetGrids function, we loop over every row and column in both grids & sets both i and j to 0. It resets both grids to all dead cells.

Once we've gone through every row and every column, inside the `copyAndResetGrid` function, we copy the new state values in the nextGrid array back into grid so that it becomes the current state. It also resets nextGrid to all zeros so that it's a clean slate for another new state. 

We need to initialize our board layout with the createTable function. Doing so immediately create the table. We also need to make sure we add initializeGrid to the `initialize` function as well. It will call the grids so we'll have two 2-D arrays. Then, we'll also call on resetGrids to make sure the state of the cells start as "dead."

In `createTable`, we need to check to make sure we have the gridContainer. If it doesn't exist, we throw an error. The outer loop will iterate through all the rows. As we go through all the rows, we create a new one - the `tr` element. The `<tr>` tag defines a row in an HTML table. Then, we iterate through all the columns and create a new one. The `<td>` tag defines a column in an HTML table. Each cell needs a unique ID - adding ID by using row number and the column number. The underscore in the concatenation helps with readability of the ID. We'll need to apply the class "dead" to it. Add click handler for switching from Dead to Alive cells. Reminder that the cell is the column here and that we add it to the row with appendChild. We add the row element to the table and that ends the outer loop. We end the function with adding the table to the gridContainer.

Within the createTable function, we call on the `cellClickHandler` function to change the cell from Dead to Alive and vice versa. We click on a cell. With the split func, it separates the location by row and column - creating an array of 2 values. We use these variables to determine the row and the column for the cell in the model that corresponds to the cell in the view. Get element class using getAttribute to find the class. Then, check to see in the class contains the string "live." If classes contains the string "live", then the result will be 0 because the index of the first letter, "l" is at position 0 in the classes string. If the string in classes was "not live", then the result would be 4. So we check for > -1 because the result can be 0 or greater. If it's a live cell, switch it to dead class attribute. The live cell becomes dead by setting state to 0. Otherwise, if the selected cell is already dead, switch it to the live class attribute. When dead cell clicked on, make it live by setting the state to 1. 

With double-buffering in play, we also need to make sure we update the front-end view for the user. The `updateView` function looks through every cell in the grid array, which contains the current state of the game (the state we just copied from next grid), and updates the view. That is, the view is the table in the page with that state. It's done by updating the class attr on the cells in the table.

As helper functions to the widthBtn and the heightBtn variables, we use `changeGridWidth` and `changeGridHeight`. We need to make sure to use the `resetEntireGrid` function for its button as well. They reset the grid and creates a new view when user clicks on either the update width or update height buttons. 

In the `setupControlButtons` function, we create the IDs for the start, clear, random buttons. For the random button, we'll add a handler function that loops through both the rows and columns, clear the board, then utilize the `Math.random` function and set cells to alive. 

In order for the setupControlButtons to clear the board, it calls on the `clearButtonHandler`. We've cleared the game, meaning we're no longer playing so it needs to be set to false. The `startButton` local variable is clear button rather than the start button; it clears the board and resets the start button. We set the start button's state to Start when Clear is clicked on. To get the clear btn to actually clear the board, clear the timer prevents play() from being called again; `clearTimeout` stops the game. Then clear the grid in the view by changing every alive cell in the table to have the class "dead"; get all cells with the class "live" with `getElementsByClassName`. This returns a nodelist. Once we do that, copy cells from the nodelist (`cellsList`) & push onto an array. Then iterate through the list of "live" cells and switch them to "dead." Finally, reset both state arrays (grid and nextGrid) so that they both have zeros in ALL the cells by calling `resetGrids`.

We need to handle 2 different cases for the start button by using the `startButtonHandler`. If the game has been started, the start button's label will change to "Pause". If the user pauses the game (is not running), button says "Continue." The `play()` stops getting called then clears the timer. If the user then clicks the Continue version of the start button, the button's label will revert back to saying "Pause."

When a user clicks the Start button, we create a counter for the number of generations during the play time within the `play` function. We'll then call on the `computeNextGen` function inside the play function. Without this, the play button only goes 1 round and stops. We want to check if game is actively running by having play call itself in this block. If it's playing, we create a timer and set it to the time delay of `reproductionTime`.

Speaking of `computeNextGen`, this function drives the computation by taking one cell in the grid and passing it to applyRules. The function iterates through all the cells in the grid state and calls the applyRules function on each cell to apply the rules of the game and save the next generation of cells in the nextGrid array. Once out of the loop to apply the rules, call `copyAndResetGrid` to copy nextGrid to grid, then reset nextGrid. Upon doing that, we call on `updateView` to copy all 1 values to "live" in the table.

The `applyRules` function is exactly what it sounds like. This function knows how to apply the rules of the game to a single cell. It checks to see if current cell is alive or dead - Alive: 1 Dead: 0. The updated state is stored in the nextGrid array. Here, we check for the number of neighbors of the current cell. If it's less than 2, the cell dies. If the cell has 2-3 neighbors, the cell lives. If the neighbor count is 4+, the cell dies. Now, when the cell is dead but it has 3 living neighbors, the dead cell "zombifies" itself and comes back to life. 

This `countNeighbors` function found inside applyRules is a helper function that counts the number of live neighbor cells a cell has. Passing in the row and column of the cell we're checking and we'll use the local variable, count, to keep track of the number of live neighbors that the cell has. While straightforward, there are a lot of edge cases that need to be checked. If the cell is on the edge of the grid or in the corner of the grid, we need to keep in mind that it won't have 8 neighbors like all the cells in the middle of the grid have. Check to make sure that each neighbor of a cell exists before we check the cell itself. We then return the count of the neighbors.
1. Check the neighbor above in the same column. If neighbor exists & is alive, we increase the count
2. Check the neighbor to the upper left corner of the cell; this cell cannot be anywhere in either the first row or the first column. If upper left neighbor is alive, increase the count.
3. Check the upper right of the current cell; the row must be greater than 0 & the column + 1 must be less than the number of columns in the grid. The cell can't be anywhere in the first row or in the last column of the grid.
4. Check neighbors directly to the left.
5. Check neighbors directly to the right.
6. Check neighbors directly below the current cell.
7. Check the neighbors below to the lower left of the cell.
8. Check the neighbors below to the lower right of the cell.

And finally, we start everything on the page by initializing the window. 