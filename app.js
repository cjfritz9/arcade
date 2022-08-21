// GAME LOOP GOALS:
//_________________
//
// --Select # Players | Name submit form has submit or single player option, function to make "AI" moves if 1P is selected
// startGame function has to happen after player select happens, so probably within an initial function
// Start as X
// Place a Mark
// Check for Win
// Check for Draw
// -- Restart function if Win or Draw
// Switch Turns / Computer Turn if 1P

let headerText = document.getElementById('titleText')
let singlePlayerText = document.getElementById('single-player-text')
let singlePlayerBtn = document.getElementById('single-player-button')
let playerOneText = document.getElementById('player-one-text')
let playerTwoText = document.getElementById('player-two-text')
let versusButton = document.getElementById('verus')
let restartButton = document.getElementById('restart-button')
let tiles = Array.from(document.getElementsByClassName('tile'))

const playerX = "X"
const playerO = "O"
let currentPlayer = playerX
let gameBoard = Array(9).fill(null)
const winningValues = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

startGame()

function clickHandler(event) {
    const tileId = event.target.id

    if(!gameBoard[tileId]){
        gameBoard[tileId] = currentPlayer
        event.target.innerText = currentPlayer

        if(winnerFunction() !== false) {
            headerText.textContent = `${currentPlayer} wins!`
            tiles.forEach(tile => tile.removeEventListener('click', clickHandler))
        }
        else if(catsGame() !== false) {
            headerText.textContent = `Cat's Game!`
        }
        else {
        currentPlayer = currentPlayer == playerX ? playerO : playerX
        }
    }
}

restartButton.addEventListener('click', restart)

function restart() {
    gameBoard.fill(null)
    
    tiles.forEach(tile => {
        tile.innerText = ''
    })
    currentPlayer = playerX
    headerText.textContent = 'Tic-Tac-Toe'
    startGame()
}

function startGame() {
    tiles.forEach(tile => tile.addEventListener('click', clickHandler))
}

function winnerFunction() {
    for (const userValues of winningValues) {
        let [a, b, c] = userValues

        if(gameBoard[a] && (gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c])) {
            return userValues
        }
    }
    return false
}

function catsGame() {
    
}


// startGame() will need to go inside of a function after players are selected (try to hide game board if you can?)
// Next Goals : Draw Game & remove clickability after winning
// classList.add('show')