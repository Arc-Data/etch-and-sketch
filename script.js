const sketchBoard = document.querySelector('.sketch-board');
const gridContainer = document.createElement('div');
const reset = document.querySelector('#reset');
gridContainer.classList.add('grid-container');


sketchBoard.appendChild(gridContainer)

function mouseHover(e) {
    console.log(e.target)
    if(e.buttons === 0) {
        e.target.removeEventListener('mouseover', mouseHover);
        return;
    }
    e.target.style.background = 'rgb(51,51,51)';
}

function initializeGrid(gridItems = 16) {

    gridContainer.style.gridTemplateColumns = `repeat(${gridItems}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridItems}, 1fr)`;

    for(let i = 0; i < gridItems**2; i++) {
        let gridItem = document.createElement('div');
        gridContainer.appendChild(gridItem);
        gridItem.classList.add('grid-item')
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
    while(gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.lastChild);
    }

    initializeGrid();
}

reset.addEventListener('click', resetGrid);

initializeGrid();