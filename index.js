document.addEventListener("DOMContentLoaded", function(){
    const gridSize = 9;
    const solveButton = document.getElementById("solve-btn");
    const toggleDarkModeButton = document.getElementById("toggle-dark-mode");
    const clearButton = document.getElementById("clear-btn")

    solveButton.addEventListener('click', function(){
        if(validateInput())
            solveSudoku();
    });
    toggleDarkModeButton.addEventListener('click', toggleDarkMode);
    clearButton.addEventListener('click', clearGrid);

    const sudokuGrid = document.getElementById("sudoku-grid");

    for(let row = 0; row < gridSize; row++){
        const newRow = document.createElement("tr");
        for(let col = 0; col < gridSize; col++){
            const cell = document.createElement("td");
            const input = document.createElement("input");
            input.type = "number";
            input.className = "cell";
            input.id = `cell-${row}-${col}`;

            input.addEventListener("click", function(){
                selectCell(input);
            })

            cell.appendChild(input);
            newRow.appendChild(cell);
        }
        sudokuGrid.appendChild(newRow);
    }

    document.addEventListener("keydown", handleArrowKeys);

    document.addEventListener("keydown", function(event) {
        if (lastSelectedCell) {
            const currentCell = lastSelectedCell;
            if (event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "ArrowLeft" || event.key === "ArrowRight") {
                event.preventDefault(); 
            }
            if (event.key >= "1" && event.key <= "9") {
                currentCell.value = event.key;
                event.preventDefault(); 
            }
            if (event.key === "Backspace" || event.key === "Delete") {
                currentCell.value = "";
            }
        }
    });
});

async function solveSudoku(){
    const gridSize = 9;
    const sudokuArray = [];

    for(let row = 0; row < gridSize; row++){
        sudokuArray[row] = [];
        for(let col = 0; col < gridSize; col++){
            const cellId = `cell-${row}-${col}`;
            const cellValue = document.getElementById(cellId).value;
            sudokuArray[row][col] = cellValue !== "" ? parseInt(cellValue) : 0;
        }
    }

    for(let row = 0; row < gridSize; row++){
        for(let col = 0; col < gridSize; col++){
            const cellId = `cell-${row}-${col}`;
            const cell = document.getElementById(cellId);

            if(sudokuArray[row][col] !== 0){
                cell.classList.add("user-input");
            }
        }
    }

    if(solveSudokuHelper(sudokuArray)){
        for(let row = 0; row < gridSize; row++){
            for(let col = 0; col < gridSize; col++){
                const cellId = `cell-${row}-${col}`;
                const cell = document.getElementById(cellId);

                if(!cell.classList.contains("user-input")){
                    cell.value = sudokuArray[row][col];
                    cell.classList.add("solved");
                    await sleep(20);
                }
            }
        }
    }
    else{
        alert("No solution exists for the given Sudoku puzzle!!");
    }
}

function toggleDarkMode(){
    const body = document.body;
    const grid = document.getElementById("sudoku-grid");

    body.classList.toggle("dark-mode");
    grid.classList.toggle("dark-mode");
}

function clearGrid(){
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell =>{
        cell.value = "";
        cell.classList.remove("error", "user-input", "solved", "selected");
    });
}

function solveSudokuHelper(board){
    const gridSize = 9;

    for(let row = 0; row < gridSize; row++){
        for(let col = 0; col < gridSize; col++){
            if(board[row][col] === 0){
                for(let num = 1; num <= 9; num++){
                    if(isValidMove(board, row, col, num)){
                        board[row][col] = num;


                        if(solveSudokuHelper(board)){
                            return true;
                        }

                        board[row][col] = 0;
                    }
                }

                return false;
            }
        }
    }

    return true;
}

function isValidMove(board, row, col, num){
    const gridSize = 9;

    for(let i = 0; i < gridSize; i++){
        if(board[row][i] === num || board[i][col] === num){
            return false;
        }
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for(let i = startRow; i < startRow + 3; i++){
        for(let j = startCol; j < startCol + 3; j++){
            if(board[i][j] === num){
                return false;
            }
        }
    }

    return true;
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

function validateInput(){
    const gridSize = 9;
    let isValid = true;

    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => cell.classList.remove("error"));

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cellId = `cell-${row}-${col}`; 
            const cell = document.getElementById(cellId);
            const cellValue = cell.value;

            if (cellValue === "") continue; 

            const num = parseInt(cellValue);
            if (num < 1 || num > 9) {
                cell.classList.add("error");
                isValid = false;
                continue;
            }

            for (let i = 0; i < gridSize; i++) {
                if (i !== col) {
                    const otherCell = document.getElementById(`cell-${row}-${i}`);
                    if (otherCell.value === cellValue) {
                        cell.classList.add("error");
                        otherCell.classList.add("error");
                        isValid = false;
                    }
                }
            }

            for (let i = 0; i < gridSize; i++) {
                if (i !== row) {
                    const otherCell = document.getElementById(`cell-${i}-${col}`);
                    if (otherCell.value === cellValue) {
                        cell.classList.add("error");
                        otherCell.classList.add("error");
                        isValid = false;
                    }
                }
            }

            const startRow = Math.floor(row / 3) * 3;
            const startCol = Math.floor(col / 3) * 3;
            for (let i = startRow; i < startRow + 3; i++) {
                for (let j = startCol; j < startCol + 3; j++) {
                    if (i !== row || j !== col) {
                        const blockCell = document.getElementById(`cell-${i}-${j}`);
                        if (blockCell.value === cellValue) {
                            cell.classList.add("error");
                            blockCell.classList.add("error");
                            isValid = false;
                        }
                    }
                }
            }
        }
    }

    return isValid;
}

let lastSelectedCell = null;

function selectCell(cell){
    if(lastSelectedCell && lastSelectedCell !== cell){
        lastSelectedCell.classList.remove("selected");
    }

    cell.classList.add("selected");

    lastSelectedCell = cell;
}

function handleArrowKeys(event){
    if(!lastSelectedCell)
        return;

    const currentId = lastSelectedCell.id;
    const currentRow = parseInt(currentId.split("-")[1]);
    const currentCol = parseInt(currentId.split("-")[2]);

    let newRow = currentRow;
    let newCol = currentCol;

    switch(event.key){
        case "ArrowUp":
            if(currentRow > 0)
                newRow--;
            break;
        case "ArrowDown":
            if(currentRow < 8)
                newRow++;
            break;
        case "ArrowLeft":
            if(currentCol > 0)
                newCol--;
            break;
        case "ArrowRight":
            if(currentCol < 8)
                newCol++;
            break;
        default:
            return;
    }

    const newCell = document.getElementById(`cell-${newRow}-${newCol}`);
    selectCell(newCell);
    newCell.focus();
}