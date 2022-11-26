const sketchBoard = document.querySelector('.sketch-board');
const gridContainer = document.createElement('div');

const gridColor = document.querySelector('#gridColor');
const colorButton = document.querySelector('#color');
const randomButton = document.querySelector('#random');
const eraseButton = document.querySelector('#erase');
const gridButton = document.querySelector('#gridlines');
const reset = document.querySelector('#reset');
const gridSize = document.querySelector('#gridSize');
const gridSlider = document.querySelector('#gridSlider');

gridSize.textContent = gridSlider.value + ' x ' + gridSlider.value;

let colorMode = 0;

sketchBoard.appendChild(gridContainer)
gridContainer.classList.add('grid-container');


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
    e.target.style.background = colorPicker();
}

function removeGridContents() {
    gridButton.textContent = 'Add Gridlines';
    while(gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.lastChild);
    }
}

function randomizeColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return [r, g, b];
}   

function colorPicker() {
    switch(colorMode) {
        case 0:
            return gridColor.value;
        case 1:
            let color = randomizeColor();
            return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
        case 2:
            return '#ededed';
    }
}

function initializeGrid() {
    removeGridContents();
    gridItems = gridSlider.value;

    gridContainer.style.gridTemplateColumns = `repeat(${gridItems}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridItems}, 1fr)`;

    for(let i = 0; i < gridItems * gridItems; i++) {
        let gridItem = document.createElement('div');
        gridContainer.appendChild(gridItem);
        gridItem.addEventListener('mousedown', (e) => {
            if(e.button == 0) {
                gridItem.style.background = colorPicker();
                gridContainer.addEventListener("mouseover", mouseHover, {capture:true});
                e.preventDefault();
            }
        })
    }
}

function changeActive(btn) {
    const activeButton = document.querySelector('.active-btn');
    console.log(btn)
    console.log(activeButton)
    activeButton.classList.remove('active-btn');
    btn.classList.add('active-btn');

}


colorButton.addEventListener('click', (e) => {
    colorMode = 0;
    changeActive(e.target);
});
randomButton.addEventListener('click', (e) => {
    colorMode = 1;
    changeActive(e.target);
});
eraseButton.addEventListener('click', (e) => {
    colorMode = 2;
    changeActive(e.target);
});
reset.addEventListener('click', initializeGrid);
gridButton.addEventListener('click', gridLines);
gridSlider.addEventListener('input', e => {
    gridSize.textContent = e.target.value + ' x ' + e.target.value;
})
gridSlider.addEventListener('change', initializeGrid)


initializeGrid(16);