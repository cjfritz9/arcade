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
let playerOneText = document.getElementById('player-one-text')
let playerTwoText = document.getElementById('player-two-text')
let versusButton = document.getElementById('versus')
let restartButton = document.getElementById('restart-button')
let tiles = Array.from(document.getElementsByClassName('tile'))
let gameArea = document.getElementById('game-area')
let submitButtons = document.getElementsByClassName('name-input')
let pvpText = document.getElementById('PvP-text')
let nameForm = document.getElementsByClassName('versus-wrapper')[0]

const empty = null
const playerX = "X"
const playerO = "O"
let currentPlayer = playerX
let gameBoard = [
    null, null, null,
    null, null, null,
    null, null, null
]
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

function clickHandler(event) {
    const tileId = event.target.id

    if(!gameBoard[tileId]){
        gameBoard[tileId] = currentPlayer
        event.target.innerText = currentPlayer
        event.target.classList.remove('empty')

        if(winnerFunction() !== false) {
            headerText.textContent = `${currentPlayer} wins!`
            tiles.forEach(tile => tile.removeEventListener('click', clickHandler))
        }
        else if(catsGame() !== false) {
            headerText.textContent = `Cat's Game!`
            tiles.forEach(tile => tile.removeEventListener('click', clickHandler))
        }
        else {
        currentPlayer = currentPlayer == playerX ? playerO : playerX
        headerText.textContent = `${currentPlayer}'s Turn`
        }
    }
}

function versusGame() {
    if(playerOneText.value.length || playerTwoText.value.length === 0 ) {
        versusButton.removeEventListener('click', versusGame)
    }
    headerText.textContent = `${currentPlayer}'s Turn`


    renderPlayers()
    renderStart()
    startGame()
}

function renderPlayers () {
    pvpText.textContent = `${playerOneText.value} ( X ) vs. ${playerTwoText.value} ( O )`
}

function renderStart() {
    nameForm.classList.add('hide')
}

function startGame() {
    versusButton.addEventListener('click', versusGame)
    tiles.forEach(tile => tile.addEventListener('click', clickHandler))
}

function restart() {
    gameBoard.fill(null)
    
    tiles.forEach(tile => {
        tile.innerText = null
    })
    currentPlayer = playerX
    headerText.textContent = 'Tic-Tac-Toe'
    pvpText.textContent = ''
    nameForm.classList.remove('hide')
    startGame()
}

function winnerFunction() {
    for (const userValues of winningValues) {
        let [num1, num2, num3] = userValues

        if(gameBoard[num1] && (gameBoard[num1] === gameBoard[num2] && gameBoard[num1] === gameBoard[num3])) {
            return userValues
        }
    }
    return false
}

function catsGame() {
    
}


versusButton.addEventListener('click', versusGame)
restartButton.addEventListener('click', restart)

// startGame() will need to go inside of a function after players are selected (try to hide game board if you can?)
// Next Goals : Draw Game; responsive inputs & buttons
// classList.add('show')
// debugging note: force cats game order index 6,8,1,3,0,2,5,4,7