// setup grid variables
const gridSize = 1000;
var numberOfCells = 16;

// setup variables for the rainbow mode
const rainbow = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
var rainbowcount = 0;
const endOfRainbowIndex = 6;


// funny stuff for telling when the mouse is down/dragging
let mouseDown = false

document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

// grab various html elements
const container = document.querySelector('div.grid')
const cellField = document.querySelector('input.cell-count');
const cellCountDisplay = document.querySelector('p.cell-count-display');

// add functionality to brush buttons
const eraserOption = document.querySelector('div.eraser');
const rainbowOption = document.querySelector('div.rainbow');
const brushOption = document.querySelector('div.brush');
const brushOptions = [brushOption, rainbowOption, eraserOption];
var brushMode = 'brush'
const colorPicker = document.querySelector('input.color-picker');
var brushColor = colorPicker.value;

colorPicker.addEventListener('input', () => {
    brushColor = colorPicker.value;
    brushOption.style.borderColor = `${brushColor}`;
})

// for each brush button add an event listener which adds the "checked" class to it when it is clicked
brushOptions.forEach(element => element.addEventListener('click', (event) => {
    // remove the class from all other buttons
    brushOptions.forEach(element => {
        element.classList.remove('checked')
    })
    // if we're in brush mode show the color picker, otherwise turn it off;
    if ( element.getAttribute('value') === 'brush') {
        colorPicker.style.display = 'block';
    }
    else {
        colorPicker.style.display = 'none';
    }
    // add the class to the clicked element
    element.classList.add('checked')
    brushMode = element.getAttribute('value');
}))

function changeColor(event) {
    // check if mouse is down
    if ( event.type === 'mouseover' && mouseDown === false ) return

    if ( brushMode === 'rainbow') {
        if (rainbowcount === endOfRainbowIndex) rainbowcount = 0
        else rainbowcount++
        event.target.style.backgroundColor = `${rainbow[rainbowcount]}`;    
    }
    if ( brushMode === 'eraser' ) {
        event.target.style.backgroundColor = 'white'
    }
    if ( brushMode === 'brush') {
        event.target.style.backgroundColor = `${brushColor}`
    }
}

cellField.addEventListener('input', updateGrid);
// update the grid when user changes number of cells
function updateGrid() {
    numberOfCells = cellField.value;

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