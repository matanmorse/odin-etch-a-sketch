const gridSize = 1000;
var numberOfCells = 16;
const rainbow = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
var rainbowcount = 0;
const endOfRainbowIndex = 6;
let mouseDown = false

document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

const container = document.querySelector('div.grid')
const cellField = document.querySelector('input.cell-count');
const cellCountDisplay = document.querySelector('p.cell-count-display');

function changeColor(event) {
    // check if mouse is down
    if ( event.type === 'mouseover' && mouseDown === false ) return

    if (rainbowcount === endOfRainbowIndex) rainbowcount = 0
    else rainbowcount++
        event.target.style.backgroundColor = `${rainbow[rainbowcount]}`;
    
}

cellField.addEventListener('input', updateGrid);
// update the grid when user changes number of cells
function updateGrid() {
    numberOfCells = cellField.value;
    console.log(numberOfCells)

    // delete old grid
    while ( container.firstChild ) {
        container.removeChild(container.firstChild);
    }

    // generate new grid
    generateGrid();

    // change counter
    cellCountDisplay.innerHTML = `${numberOfCells}x${numberOfCells}`

}

// generate a grid of squares based on number of squares wanted
function generateGrid() {
    const cellSize = gridSize / numberOfCells;
    const rowCount = Math.floor(1000 / cellSize);
    // set counter
    cellCountDisplay.innerHTML = `${numberOfCells}x${numberOfCells}`

    for (let i = 0; i < numberOfCells; i++) {

        const row = document.createElement('div');
        row.classList.add('row');
        container.appendChild(row);
        for (let j = 0; j < numberOfCells; j++) {
            const cell = document.createElement('div');
            cell.style.height = `${cellSize}px`;
            cell.style.width = `${cellSize}px`;
            cell.setAttribute('draggable', false);
            cell.addEventListener('mousedown', changeColor);
            cell.addEventListener('mouseover', changeColor);

            cell.classList.add('cell');
            row.appendChild(cell);
        }

    }
}

generateGrid(); 