'use stirct'
const MINE = '💣';
const EMPTY = '';
var gBoard
var gLevel = {
    SIZE: 4,
    MINES: 2
};
var gLevles = {

    'ezay': { SIZE: 4, MINES: 2 },
    'harder': { SIZE: 8, MINES: 12 },
    'hardest': { SIZE: 12, MINES: 30 }
};

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function init() {
    gBoard = createBoard(gLevel)
    setRandomMines(gBoard)
    countMines(gBoard)
    renderBoard(gBoard, '.board-container')
    gGame.isOn = true

}

function createBoard(gLevel) {
    var board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([])
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: true,
                isMine: false,
                isMarked: false
            }

        }
    }
    console.log('board, ', board);
    return board
}

function renderBoard(board, selector) {
    var strHTML = '<table  class ="table" border="0"><tbody>';
    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>`
        for (var j = 0; j < board.length; j++) {
            var cell = board[i][j];
            var upadateCell = infoCell(cell)
            strHTML += `<td class=" cell ${upadateCell} '">  ${cell} </td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;;
}

function infoCell(cell) {
    if (cell.isShown) {
        if (cell.isMine) return MINE
        if (cell.minesAroundCount === 0) return EMPTY
        return cell.minesAroundCount
    }
    elCell.innerHTML = cellContent
    elCell.classList.remove(' clickble ')
}
if (cell.isMarked) {
    FLAG.onmousedown('.board-container')

}






function setRandomMines(gBoard) {
    var minePosArray = [];
    while (minePosArray.length !== gLevel.MINES) {
        var num1 = getRandomInteger(1, gLevel.SIZE - 1);
        var num2 = getRandomInteger(1, gLevel.SIZE - 1);
        if (!gBoard[num1][num2].isMine) {
            gBoard[num1][num2].isMine = true
            minePosArray.push(gBoard[num1][num2])
        }
        console.log('i, j', num1, num2)
    }
}

function setMinesNegsCount(gBoard, colIdx, rowIdx) {
    var count = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= gBoard.length) continue;
            if (i === rowIdx && j === colIdx) continue;
            if (gBoard[i][j].isMine === true) count++
        }
    }

    console.log('count', count)
    gBoard[rowIdx][colIdx].minesAroundCount = count;
}

function countMines(gBoard) {

    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            setMinesNegsCount(gBoard, i, j);
        }
    }
}




function chooseLevel(userLevel) {
    gLevel = gLevles[userLevel];
    init()
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}