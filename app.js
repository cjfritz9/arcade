// GAME LOOP GOALS:
//_________________
//
// Select # Players
// Start as X
// Place a Mark
// Check for Win
// Check for Draw
// -- Restart if Win or Draw
// Switch Turns / Computer Turn if 1P


const xClass = 'x';
const oClass = 'o';
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
]
const tiles = document.getElementsByTagName('td')
let oTurn;

tiles.addEventListener('click', function(event) {
    const tile = event.target;
    const currentClass = oTurn ? oClass : xClass
    placeMark(tile, currentClass)
})


function placeMark(tile, currentClass) {
    tile.classList.add(currentClass);
}