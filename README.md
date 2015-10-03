proj2
=====

## 1. Separation of Concerns

- Board
  - This includes both the model and the display of the board/cells. The board generates a 2D array of divs/cells and adds them to a container.
- Rules
  - This is what governs how cells live and die on the board.
- Simulator
  - This is what updates the board at an interval.
- Preset Selector
  - This is both a model that contains preset data and a display by generating and appending HTML elements to a container. When a selection is made, all registered handlers are invoked.
- Action Bar
  - This provides the user the ability to select a preset, play/pause the simulation, and reset/clear the population/board.
- Main Controller
  - This provides the layout and containers for the board, preset selector, and action bar, and ties the simulator together with the user events.


## 2. Modules
- index
  - Depends on all of the below
- board
  - Does not depend on anything
- rules
  - Does not depend on anything
- preset-selector
  - Does not depend on anything
- GameOfLife
  - Depends on Board and Rules, which are both necessary

## 3. Functionals
- Normal for loops are only used to generate a board/cell population once
- All subsequent loops use Array.prototype.forEach
- I used subscriber model for preset dropdown item select events
- I used functionals for the rules in updating the board population model

## 4. Tradeoffs
- I put the display and model code in a single file (board, preset-selector) because it makes the functionality more modular and reusable.
- I used divs and css so that I wouldn't have to write as much code (and test it) when compared to using canvas. However, using canvas would provide much higher performance.
