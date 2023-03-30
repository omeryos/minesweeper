'use strict'
const PLAYER_IMG = '😃'
const PLAYER_LOSE = '🤯'
const PLAYER_WIN = '😎'
const MINE = '🧨'
const MARK = '🏴‍☠️'

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
var gSeconds = 0
var firstClick = true
var gBoard
var gLives = 3
var element = document.body;
element.classList.toggle("dark-mode");
function randomizeMines() {
    for (var i = 0; i < gLevel.MINES; i++) {
        gBoard[getRandomInt(0, gLevel.SIZE)][getRandomInt(0, gLevel.SIZE)].isMine = true
    }
}
function onInit() {
    onRestartValues()
    const elModal = document.querySelector('.restart')
    elModal.innerHTML = PLAYER_IMG
    const elLivesCount = document.querySelector('.lives-count')
    elLivesCount.innerText = `Lives left : ${gLives} `
    gBoard = buildBoard()
    populateMatObj(gBoard)
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
            board[i][j].minesAroundCount = countMinesAround(i, j)
        }
    }
}
function renderBoard(board) {
    utRenderBoard(board, '.board')
}
function onCellClicked(elCell, i, j) {
    if (gBoard[i][j].isShown || !gGame.isOn) return
    checkGameOver()
    gBoard[i][j].isShown = true
    gGame.shownCount++
    
    if (!gGame.isOn) {
        return
    }
    if (firstClick) {
        randomizeMines(i, j)
        setMinesNegsCount(gBoard)
        firstClick = false
    }
    if (!gBoard[i][j].isMine) {
        elCell.innerText = gBoard[i][j].minesAroundCount
        gBoard[i][j].isShown = true
        expandShown(gBoard,elCell,i,j)
    }
    if (gBoard[i][j].isMine) {
        gBoard[i][j].isShown = true
        elCell.innerText = MINE
        gLives--
        const elLivesCount = document.querySelector('.lives-count')
        elLivesCount.innerText = `Lives left : ${gLives} `
    }
}
function onCellMarked(cell, i, j) {
    cell = gBoard[i][j]
    if (cell.isShown || gGame.isOver || firstClick) return;
    if (!cell.isMarked) {
        cell.isMarked = true;
        if (gBoard[i][j].isMine) gGame.markedCount++;
        renderCell(i, j, MARK)
    }
    else if (cell.isMarked) {
        cell.isMarked = false;
        if (gBoard[i][j].isMine) { gGame.markedCount--; }
        renderCell(i, j, '')
    }
    checkGameOver()
}
function checkGameOver() {
    if (gLives === 0) {
        gGame.isOn = false
        const elModal = document.querySelector('.restart')
        elModal.innerHTML = PLAYER_LOSE
        const elLoseModal = document.querySelector('.lose')
        elLoseModal.innerHTML = 'You lost! Try again...'
        elLoseModal.style.display = 'block';
        return
    }
    if (gGame.markedCount === gLevel.MINES && gLives > 0 || gLives > 0 && gGame.shownCount === ((gLevel.SIZE * gLevel.SIZE) - gLevel.MINES)) {
        const elWinModal = document.querySelector('.restart')
        elWinModal.innerHTML = PLAYER_WIN
        const elModal = document.querySelector('.win')
        elModal.innerHTML = 'You won! click on the smiley to restart'
        elModal.style.display = 'block';
        return
    }
}
function onChangeDifficulty(inputSize) {
    switch (inputSize) {
        case 4:
            gLevel.SIZE = inputSize
            gLevel.MINES = inputSize - 2
            break
        case 8:
            gLevel.SIZE = inputSize
            gLevel.MINES = (inputSize * 1.75)
            break
        case 12:
            gLevel.SIZE = inputSize
            gLevel.MINES = (inputSize * 3) - 4
            break
    }
    onInit()
}
function expandShown(board, elCell, i, j) {
    if (i < 0 || j < 0 || i >= board.length || j >= board[0].length ) {
      return;
    }
    if (board[i][j].minesAroundCount !== 0) {
      return;
    }
    var elCell = document.querySelector(`.cell-${i}-${j}`)
    elCell.innerText = board[i][j].minesAroundCount;
    expandShown(board, elCell, i - 1, j);
    expandShown(board, elCell, i + 1, j);
    expandShown(board, elCell, i, j - 1);
    expandShown(board, elCell, i, j + 1);
}
  