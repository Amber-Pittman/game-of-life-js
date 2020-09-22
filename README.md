# Conway's Game of Life

For a quick review of what Conway's Game of Life is, I suggest checking out [Stephen Hawkings The Meaning of Life (John Conway's Game of Life segment)](https://youtu.be/CgOcEZinQ2I) on YouTube.

## Rules for Conway's Game of Life
Conway's the Game of Life is a generative type of application, where we enter patterns into a grid. We start this pattern-generating based on only four rules for controlling the grid.

1.  Births: Each dead cell adjacent to exactly three live neighbors will become live in the next generation.

2.  Death by isolation: Each live cell with one or fewer live neighbors will die in the next generation.

3.  Death by overcrowding: Each live cell with four or more live neighbors will die in the next generation.

4.  Survival: Each live cell with either two or three live neighbors will remain alive for the next generation.
