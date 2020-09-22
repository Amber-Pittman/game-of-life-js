# Conway's Game of Life

<!-- blank line -->
<figure class="video_container">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/CgOcEZinQ2I" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</figure>
<!-- blank line -->

<!-- blank line -->
<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/CgOcEZinQ2I" frameborder="0" allowfullscreen="true"> </iframe>
</figure>
<!-- blank line -->

## Rules for Conway's Game of Life
Conway's the Game of Life is a generative type of application, where we enter patterns into a grid. We start this pattern-generating based on only four rules for controlling the grid.

1.  Births: Each dead cell adjacent to exactly three live neighbors will become live in the next generation.

2.  Death by isolation: Each live cell with one or fewer live neighbors will die in the next generation.

3.  Death by overcrowding: Each live cell with four or more live neighbors will die in the next generation.

4.  Survival: Each live cell with either two or three live neighbors will remain alive for the next generation.