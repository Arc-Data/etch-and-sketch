/*
 *
 * 	First step : How do I attach a grid to the sketchboard, 
 *	and possibly get up to 16 * 16 grid-items
 *
 *
 */

const sketchBoard = document.querySelector('.sketch-board');
const gridContainer = document.createElement('div');
gridContainer.classList.add('grid-container');


sketchBoard.appendChild(gridContainer)

function initializeGrid(gridItems = 16) {

    gridContainer.style.gridTemplateColumns = `repeat(${gridItems}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridItems}, 1fr)`;

    for(let i = 0; i < gridItems**2; i++) {
        let gridItem = document.createElement('div');
        gridContainer.appendChild(gridItem);
        gridItem.classList.add('grid-item')
        gridItem.addEventListener('mouseover', (e) => {
            e.target.style.background = 'black';
        }, {once:true})
    }
}

initializeGrid();