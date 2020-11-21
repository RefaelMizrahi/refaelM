const EMPTY = ' ';
const FLAG = '🚩';
const MINE = '💣';
var gBoard;
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
var gLevel = {
    SIZE: 4,
    MINES: 2
};

var gSelectedLevel = {
    'ezay': { SIZE: 4, MINES: 2 },
    'harder': { SIZE: 8, MINES: 12 },
    'hardest': { SIZE: 12, MINES: 30 }
};

function init() {
    gBoard = buildBoard();
    setRandomMines(gBoard);
    countMines(gBoard)
    printMat(gBoard, '.board-container');
    gGame.isOn = true;
}



function buildBoard() {
    var board = createBoard(gLevel)
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {}
    }
    return board
}



function chooseLevel(userLevel) {
    gLevel = gSelectedLevel[userLevel];
    init()
}


function updateClock() {
    document.getElementById("timer").innerHTML = Math.floor((new Date().getTime() - startTime) / 1000);
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}