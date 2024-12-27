# Sudoku Solver

## Overview
This is a web-based Sudoku Solver that allows users to input a Sudoku puzzle, validate it, and solve it with an implemented backtracking algorithm. The project is built using **HTML**, **CSS**, and **JavaScript**, and features a responsive design for mobile devices along with a light/dark mode toggle for better user experience.

## Features
- **Interactive Sudoku Grid**: Users can input numbers directly into the grid.
- **Validation**: Highlights errors in the grid (e.g., duplicate numbers in rows, columns, or blocks).
- **Solver**: Implements a backtracking algorithm to solve the Sudoku puzzle.
- **Dark Mode**: Toggle between light and dark themes for better accessibility.
- **Responsive Design**: Optimized layout for both desktop and mobile devices.
- **Clear Grid**: Reset the grid with a single button click.
- **Keyboard Navigation**: Use arrow keys to navigate between cells and input numbers directly.

## Project Structure
```
├── index.html      # Main HTML file
├── style.css       # Styling for the application
├── index.js        # JavaScript for functionality
```

## How to Use
1. **Input Puzzle**: Enter numbers into the grid. Use only numbers between 1-9.
2. **Solve Puzzle**: Click the "Solve!" button to let the application solve the Sudoku puzzle.
3. **Clear Grid**: Use the "Clear" button to reset the grid.
4. **Dark Mode**: Click the "Toggle Dark Mode" button to switch themes.
5. **Mobile Support**: The grid and controls are responsive and work seamlessly on smaller screens.

## Keyboard Shortcuts
- **Arrow Keys**: Navigate between cells.
- **Number Keys (1-9)**: Input numbers into the selected cell.
- **Backspace/Delete**: Clear the selected cell.

## Responsive Design
The Sudoku grid and controls adapt for smaller screen sizes, ensuring a smooth experience on mobile devices. Adjustments include:
- Centered layout.
- Scaled grid and buttons for smaller screens.

## Light/Dark Mode
The application includes a toggle to switch between light and dark themes. In dark mode, special attention is given to error and solved cell highlights:
- **Errors**: Red cells with clear visibility.
- **Solved Cells**: Green cells with a contrasting border.

## How It Works
### Core Functions
- **Grid Initialization**: Dynamically creates a 9x9 grid in JavaScript.
- **Validation**: Ensures there are no duplicate numbers in rows, columns, or 3x3 blocks.
- **Sudoku Solver**: A backtracking algorithm solves the puzzle by recursively testing numbers in empty cells.
- **Dark Mode**: Toggles a CSS class on the `body` element to apply theme-specific styles.

### Validation Logic
Checks that each number:
- Appears only once in its row, column, and 3x3 block.
- Highlights errors in red if rules are violated.

### Backtracking Algorithm
1. Locates the next empty cell.
2. Tries numbers 1-9 in the cell.
3. Recursively solves the puzzle.
4. Backtracks if a number fails to fit.

## Installation
No installation is required. Simply clone or download the repository and open `index.html` in a web browser:

```bash
git clone https://github.com/ilic02/sudoku-solver.git
cd sudoku-solver
open index.html
```

[Preview](https://ilic02.github.io/Sudoku-Solver/)