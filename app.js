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
//lots of unused things here from various function attempts that failed, left in to
//show work

let turnCount = 0
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
        // event.target.classList.remove('empty')

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
        turnCount++
        console.log(turnCount)
        }
    }
}
//all tiles have an id relevant to their index values - if null tile is clicked it is set to current player
//as well as the text. classList remove is from one of my 100 attempts for a working catsGame function
//if game is won, invoke the function. otherwise change turns & header text

function versusGame() {
    if(playerOneText.value.length || playerTwoText.value.length > 0) {
        versusButton.classList.remove('hide')
    }
    headerText.textContent = `${currentPlayer}'s Turn`


    renderPlayers()
    renderStart()
    startGame()
}
//condition to show button after text is input in both fields - could not fix
//h1 changes to show whose turn it is

function renderPlayers () {
    pvpText.textContent = `${playerOneText.value} ( X ) vs. ${playerTwoText.value} ( O )`
}
//displays values from the user input names along with a reminder of which "team" they selected

function renderStart() {
    nameForm.classList.add('hide')
}
//hides player name inputs

function startGame() {
    versusButton.addEventListener('click', versusGame)
    tiles.forEach(tile => tile.addEventListener('click', clickHandler))
}
//adds both event listeners needed to start and play the game

function restart() {
    gameBoard.fill(null)
    
    tiles.forEach(tile => {
        tile.innerText = null
    })
    currentPlayer = playerX
    headerText.textContent = 'Tic-Tac-Toe'
    pvpText.textContent = ''
    nameForm.classList.remove('hide')
    turnCount = 0
    startGame()
}
//resets board & stored values, current player, h1, shown player v player text, and hidden inputs

function winnerFunction() {
    for (const userValues of winningValues) {
        let [num1, num2, num3] = userValues

        if(gameBoard[num1] && (gameBoard[num1] === gameBoard[num2] && gameBoard[num1] === gameBoard[num3])) {
            return userValues
        }
    }
    return false
}
//compares index values between an array of "wins" and current players filled index values every turn

function catsGame() {
    if(turnCount === 9) {
        return true
    }
    return false
}
//broken - never works, EVER


versusButton.addEventListener('click', versusGame)
restartButton.addEventListener('click', restart)

// startGame() will need to go inside of a function after players are selected (try to hide game board if you can?)
// Next Goals : Draw Game; responsive inputs & buttons
// classList.add('show')
// debugging note: force cats game order index 6,8,1,3,0,2,5,4,7