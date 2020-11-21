function createBoard(gLevel) {
    var board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([])
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
        }
    }
    return board
}

function printMat(mat, selector) {
    var strHTML = '<table  class ="table" border="0"><tbody>';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            var cell = mat[i][j];
            var uppdateCell = infoCell(cell)
            strHTML += `<td class="cell ${cell}'"> ${uppdateCell}  </td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}

function infoCell(cell) {
    if (cell.isShown) {
        if (cell.isMine) return MINE
        if (cell.minesAroundCount === 0) return EMPTY
        else {
            return cell.minesAroundCount
        }
    }
}


function renderCell(location, value) {
    var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
    elCell.innerHTML = value;
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