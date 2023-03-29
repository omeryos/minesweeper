'use strict'
const PLAYER_IMG = '😃'
const PLAYER_LOSE = '🤯'
const PLAYER_WIN = '😎'
const MINE = '🧨'

var gLevel = {
    SIZE: 4,
    MINES: 2
}

var gGame = {
    isOn: true,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

var firstClick = true
var gBoard
var gLives = 3



function randomizeMines() {
    for (var i = 0; i < gLevel.MINES; i++) {
        gBoard[getRandomInt(0, gLevel.SIZE)][getRandomInt(0, gLevel.SIZE)].isMine = true
    }
}

function onInit() {
    const elModal = document.querySelector('button')
    elModal.innerHTML = PLAYER_IMG
    gLives = 3
    firstClick = true
    gBoard = buildBoard()
    populateMatObj(gBoard)
    setMinesNegsCount(gBoard)
    renderBoard(gBoard)
}



function populateMatObj(board) {
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
        }
    }

}



function buildBoard() {
    var matrix = createMat(gLevel.SIZE, gLevel.SIZE)
    return matrix
}

function setMinesNegsCount(board) {

    for (var i = 0; i < board.length; i++) {

        for (var j = 0; j < board[0].length; j++) {
            var cellNegMineCount = countSeatsAround(i, j)
            board[i][j].minesAroundCount = cellNegMineCount

        }
    }

}

function renderBoard(board) {
    UtRenderBoard(board, '.board')

}

function onCellClicked(elCell, i, j) {
    checkGameOver()
    var winClicks = []

    if (firstClick) {
        randomizeMines(i, j)
        setMinesNegsCount(gBoard)
        // console.log('gboard vals', gBoard)
        // console.log('if if if')
        firstClick = false
    }

    if (!gBoard[i][j].isMine) {
        elCell.innerText = gBoard[i][j].minesAroundCount
        gGame.shownCount++
        console.log('gGame.shownCount', gGame.shownCount)
    }

    if (gBoard[i][j].isMine) {
        elCell.innerText = MINE
        gLives--
    }
    console.log('livescount', gLives)
}

function onCellMarked(elCell) {


}


function checkGameOver() {

    if (gLives === 0) {
        gGame.isOn = false
        const elModal = document.querySelector('.restart')
        elModal.innerHTML = PLAYER_LOSE //'<img src="img/gamer.png">'
    }
    if (gLives > 0 && !gGame.isOn) {
        const elModal = document.querySelector('.restart')
        elModal.innerHTML = PLAYER_WIN
    }

}


function expandShown(board, elCell, i, j) {


}

function onChangeLevel(inputSize) {
    switch (inputSize) {
        case 4:
            console.log('inputSize', inputSize)
            gLevel.SIZE = inputSize
            gLevel.MINES= inputSize
            
            break
        case 8:
            console.log('inputSize', inputSize)
            gLevel.SIZE = inputSize
            gLevel.MINES= (inputSize*1.75)
            break
        case 12:
            console.log('inputSize', inputSize)
            gLevel.SIZE = inputSize
            gLevel.MINES = (inputSize*3)-4
            break
        
    }

    onInit()
}