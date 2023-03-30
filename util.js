'use strict'


function createMat(ROWS, COLS) {
  const mat = []
  for (var i = 0; i < ROWS; i++) {
    const row = []
    for (var j = 0; j < COLS; j++) {
      row.push('')
    }
    mat.push(row)
  }
  return mat
}



function countMinesAround(rowIdx, colIdx) {
  var minesCount = 0
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
      if (i < 0 || i >= gBoard.length) continue
      for (var j = colIdx - 1; j <= colIdx + 1; j++) {
          if (i === rowIdx && j === colIdx) continue
          if (j < 0 || j >= gBoard[0].length) continue
          var currCell = gBoard[i][j]
          if (currCell.isMine===true) minesCount++
      }
  }
  return minesCount
}


/*******************************/
/*Random*/
/*******************************/

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

/*******************************/
/*Render*/
/*******************************/

function utRenderBoard(mat, selector) {
  var strHTML = '<table><tbody>'
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>'
    for (var j = 0; j < mat[0].length; j++) {
      const cell = mat[i][j]
      const className = `cell-${i}-${j}`
       
      strHTML += `<td oncontextmenu="onCellMarked(this,${i},${j})"  onClick="onCellClicked(this,${i},${j})" class="${className}">`
      
    }
    strHTML += '</td></tr>'
  }
  strHTML += '</tbody></table>'

  const elContainer = document.querySelector(selector)
  elContainer.innerHTML = strHTML
}

function renderCell(i,j, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell-${i}-${j}`);
  elCell.innerHTML = value
}

// Returns the class name for a specific cell

var timer = setInterval(upTimer, 1000);
function upTimer() {
    ++gSeconds;
    var hour = Math.floor(gSeconds / 3600);
    var minute = Math.floor((gSeconds - hour * 3600) / 60);
    var updSecond = gSeconds - (hour * 3600 + minute * 60);
    document.getElementById("countup").innerHTML = hour + ":" + minute + ":" + updSecond;
}
function toggleDarkMode() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}
function onRestartValues() {
  gSeconds = 0
  gGame.shownCount = 0
  gGame.markedCount = 0
  gLives = 3
  gGame.isOn = true
  firstClick = true
  const elWinModal = document.querySelector('.win')
  elWinModal.style.display = 'none';
  const elLoseModal = document.querySelector('.lose')
  elLoseModal.style.display = 'none';
}