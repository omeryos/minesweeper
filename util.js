'use strict'

/*******************************/
/*Matrix methods*/
/*******************************/

/*********************/
/*Create*/
/*********************/
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

function createRandomNumsMat(ROWS, COLS) {
  const nums = getRandomOrderNumbersArray(ROWS * COLS)
  const mat = []
  for (var i = 0; i < ROWS; i++) {
    const row = []
    for (var j = 0; j < COLS; j++) {
      row.push(nums[i * COLS + j])
    }
    mat.push(row)
  }
  return mat
}

//Get string and matrix
//Put the string in the matrix in random places for AMOUNT times

//putStringAmountTimesInMat
//putRandomNumberOfStringInMat
function putStringAmountTimesInMat(MAT, STRING, AMOUNT) {
  if (AMOUNT > MAT.length * MAT[0].length) return
  for (var i = 0; i < AMOUNT; i++) {
    var row = getRandomInt(0, MAT.length)
    var col = getRandomInt(0, MAT[0].length)
    if (MAT[row][col] === STRING) {
      i--
    } else {
      MAT[row][col] = STRING
    }
  }
}

/*********************/
/*Find*/
/*********************/

function getAmountOfNeighboursContaining(BOARD, ROW, COL, ITEM) {
  var amount = 0
  for (var i = ROW - 1; i <= ROW + 1; i++) {
    if (i < 0 || i > BOARD.length - 1) continue
    for (var j = COL - 1; j <= COL + 1; j++) {
      if (j < 0 || j > BOARD[i].length - 1 || (i === ROW && j === COL)) continue
      if (BOARD[i][j] === ITEM) amount++
    }
  }
  return amount
}
function countSeatsAround(rowIdx, colIdx) {
  var seatCount = 0
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
      if (i < 0 || i >= gBoard.length) continue
      for (var j = colIdx - 1; j <= colIdx + 1; j++) {
          if (i === rowIdx && j === colIdx) continue
          if (j < 0 || j >= gBoard[0].length) continue
          var currCell = gBoard[i][j]
          if (currCell.isMine===true) seatCount++
      }
  }
  return seatCount
}

function getAmountOfCellsContaining(BOARD) {
  var amount = 0
  for (var i = 0; i < BOARD.length; i++) {
    console.log('i',i)
    for (var j = 0; j < BOARD[i].length; j++) {
      if (BOARD[i][j].isMine === true) amount++
    }
    // if(amount>0)BOARD[i][j].minesAroundCount=amount
  }
  return amount
}

/*******************************/
/*Random*/
/*******************************/

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

function getRandomColor() {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function getRandomOrderNumbersArray(MAX) {
  const nums = getArrayWithAscNums(MAX)
  var res = []
  for (var i = 0; i < MAX; i++) {
    res[i] = drawNum(nums)
  }
  return res
}

function getArrayWithAscNums(MAX) {
  var numbers = []
  for (var i = 0; i < MAX; i++) {
    numbers[i] = i + 1
  }
  return numbers
}

/*******************************/
/*Render*/
/*******************************/

function UtRenderBoard(mat, selector) {
  var strHTML = '<table><tbody>'
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>'
    for (var j = 0; j < mat[0].length; j++) {
      const cell = mat[i][j]
      const className = `cell cell-${i}-${j}`
       
      strHTML += `<td onClick="onCellClicked(this,${i},${j})" class="${className}">`
      strHTML+=cell.minesAroundCount 
      if (cell.isMine === true) strHTML += 'MINE '
      
    }
    strHTML += '</td></tr>'
  }
  strHTML += '</tbody></table>'

  const elContainer = document.querySelector(selector)
  elContainer.innerHTML = strHTML
}

function renderBoardByObjProperty(mat, selector, property) {
  var strHTML = '<table><tbody>'
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>'
    for (var j = 0; j < mat[0].length; j++) {
      const cell = mat[i][j][property]
      const className = `cell cell-${i}-${j}`

      strHTML += `<td class="${className}">${cell}</td>`

      
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>'

  const elContainer = document.querySelector(selector)
  elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
  // Select the elCell and set the value
  const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
  elCell.innerHTML = value
}
/*******************************/
/*Misc*/
/*******************************/

function drawNum(NUMS) {
  return NUMS.splice(getRandomInt(0, NUMS.length), 1)[0]
}


// Returns the class name for a specific cell
function getClassName(location) {
  const cellClass = 'cell-' + location.i + '-' + location.j
  return cellClass
}

function playSound() {
  const sound = new Audio('sound/sound.mp4')
  sound.play()
}


function showModal() {
  const elModal = document.querySelector('.modal')
  elModal.classList.remove('hide')
}

function hideModal() {
  const elModal = document.querySelector('.modal')
  elModal.classList.add('hide')
}

// function countNeighboringMines(x, y, board) {
//   let count = 0;

//   // check all 8 neighboring cells
//   for (let i = -1; i <= 1; i++) {
//     for (let j = -1; j <= 1; j++) {
//       // ignore the current cell
//       if (i === 0 && j === 0) {
//         continue;
//       }

//       // get the coordinates of the neighboring cell
//       const row = x + i;
//       const col = y + j;

//       // check if the neighboring cell is within the board
//       if (row >= 0 && row < board.length && col >= 0 && col < board[0].length) {
//         // check if the neighboring cell contains a mine
//         if (board[row][col].isMine === true) {
//           count++;
//         }
//       }
      
//     }
//   //   board[row][col].minesAroundCount=count
//   }
// //   board[row][col].minesAroundCount=count
//   return count;
// }
