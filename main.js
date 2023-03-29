'use strict'

// var gBoard = {
//     minesAroundCount: 4,
//     isShown: false,
//     isMine: false,
//     isMarked: true
// }

var gLevel = {
    SIZE: 4,
    MINES: 2
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

var gBoard = buildBoard()
populateMatObj(gBoard)
gBoard[1][3].isMine=true
gBoard[2][3].isMine=true


console.log(gBoard)
setMinesNegsCount(gBoard)


console.log(gBoard)
renderBoard(gBoard)
// getAmountOfNeighboursContaining(gBoard,1,2,isMine)

setMinesNegsCount(gBoard)

console.log('mines count',gBoard[1][2].minesAroundCount)


function onInit(){


}

// console.log(countNeighboringMines(1, 2, gBoard))
// console.log(gBoard[1][2].minesAroundCount)

function populateMatObj(board){
    for (var i=0;i<4;i++){
        for (var j = 0; j<4 ; j++){
            board [i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
        }
    }

}

// renderBoardByObjProperty(gBoard, selector, property){
// }

function buildBoard(){
   var matrix =  createMat(4,4)
   return matrix
}

function setMinesNegsCount(board){
    
    for (var i=0;i<board.length;i++){
        
        for (var j=0;j<board[0].length;j++){
            var cellMineCount = countSeatsAround(i,j)
            board[i][j].minesAroundCount=cellMineCount
            
        }
    }

}

function renderBoard(board){
    UtRenderBoard(board,'.board')

}

function onCellClicked(elCell, i, j){
    console.log('hi')


}

function onCellMarked(elCell){


}


function checkGameOver(){


}


function expandShown(board, elCell, i, j){


}