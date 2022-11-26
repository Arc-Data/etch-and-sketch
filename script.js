const sketchBoard = document.querySelector('.sketch-board');
const gridContainer = document.createElement('div');
const reset = document.querySelector('#reset');
const gridButton = document.querySelector('#gridlines');
const gridSlider = document.querySelector('#gridSlider');
const gridSize = document.querySelector('#gridSize');
const gridColor = document.querySelector('#gridColor');

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
    if(e.buttons === 0) {
        e.target.removeEventListener('mouseover', mouseHover);
        return;
    }
    e.target.style.background = gridColor.value;
}

function initializeGrid() {
    gridItems = gridSlider.value;
    gridButton.textContent = 'Add Gridlines';
    while(gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.lastChild);
    }

    gridContainer.style.gridTemplateColumns = `repeat(${gridItems}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridItems}, 1fr)`;

    for(let i = 0; i < gridItems * gridItems; i++) {
        let gridItem = document.createElement('div');
        gridContainer.appendChild(gridItem);
        gridItem.addEventListener('mousedown', (e) => {
            if(e.button == 0) {
                e.target.style.background = gridColor.value;
                gridContainer.addEventListener("mouseover", mouseHover, {capture:true});
                e.preventDefault();
            }
        })
    }
}



reset.addEventListener('click', initializeGrid);

gridButton.addEventListener('click', gridLines);
gridSlider.addEventListener('input', e => {
    gridSize.textContent = e.target.value + ' x ' + e.target.value;
})
gridSlider.addEventListener('change', initializeGrid)


initializeGrid(16);