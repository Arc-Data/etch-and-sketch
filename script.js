const sketchBoard = document.querySelector('.sketch-board');
const gridContainer = document.createElement('div');
const reset = document.querySelector('#reset');
const gridButton = document.querySelector('#gridlines');
const gridSlider = document.querySelector('#gridSlider');
const gridSize = document.querySelector('#gridSize');

gridSize.textContent = gridSlider.value + ' x ' + gridSlider.value;

gridContainer.classList.add('grid-container');


sketchBoard.appendChild(gridContainer)

function gridLines(e) {
    const divs = document.querySelectorAll('.grid-container > div');
    if(e.target.textContent == 'Remove Gridlines') {
        e.target.textContent = 'Add Gridlines';
        divs.forEach(div => div.classList.remove('grid-item'));
    } else {
        e.target.textContent = 'Remove Gridlines';
        divs.forEach(div => div.classList.add('grid-item'));
    }
}

function mouseHover(e) {
    console.log(e.target)
    if(e.buttons === 0) {
        e.target.removeEventListener('mouseover', mouseHover);
        return;
    }
    e.target.style.background = 'rgb(51,51,51)';
}

function initializeGrid(gridItems) {
    gridContainer.style.gridTemplateColumns = `repeat(${gridItems}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridItems}, 1fr)`;

    for(let i = 0; i < gridItems * gridItems; i++) {
        let gridItem = document.createElement('div');
        gridContainer.appendChild(gridItem);
        gridItem.classList.add('grid-item');
        gridItem.addEventListener('mousedown', (e) => {
            if(e.button == 0) {
                e.target.style.background = 'rgb(51,51,51)';
                gridContainer.addEventListener("mouseover", mouseHover, {capture:true});
                e.preventDefault();
            }
        })
    }
}

function resetGrid() {
    gridButton.textContent = 'Add Gridlines';
    while(gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.lastChild);
    }
}

reset.addEventListener('click', resetGrid);
gridButton.addEventListener('click', gridLines);
gridSlider.addEventListener('input', e => {
    gridSize.textContent = e.target.value + ' x ' + e.target.value;
})
gridSlider.addEventListener('change', e => {
    resetGrid();
    initializeGrid(e.target.value);
});


initializeGrid(16);