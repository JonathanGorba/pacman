'use strict';
const WALL = '#';
const FOOD = '.';
const EMPTY = ' ';
const SUPERFOOD = '@';
const CHERRY = '%'

var gCherryInterval;
var gCherryCounter;
var gBoard;
var gGame = {
    score: 0,
    isOn: false
}

function init() {
    // console.log('Hello')
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    // console.table(gBoard)
    printMat(gBoard, '.board-container');
    gGame.isOn = true;
    gGame.score = 0;
    gCherryCounter = 0;
    document.querySelector('h2 span').innerText = gGame.score;
    document.querySelector('.modal').style.display = 'none';
    gCherryInterval = setInterval(cherryPlacer,15000);
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
            if ((i === 1 && j === 1) || (i === 1 && j === 8) || (i === 8 && j === 1) || (i === 8 && j === 8)) {
                board[i][j] = SUPERFOOD;
            }
        }
    }
    return board;
}

function updateScore(diff) {
    // update model and dom
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score;
}

function gameOver(isVictory = false) {
    if (isVictory) {
        var gameStatus = 'game won';
    } else {
        var gameStatus = 'game over';
    }
    console.log(gameStatus);
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    clearInterval(gCherryInterval);
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    // update the DOM
    renderCell(gPacman.location, EMPTY);
    document.querySelector('.modal span').innerText = gameStatus;
    document.querySelector('.modal').style.display = 'block';
}

function victory() {
    if (gGame.score === (56+(10*gCherryCounter))) gameOver(true);
}

function getEmptyCells() {
    var emptyCells = [];
    for (var i = 1; i < gBoard.length - 1; i++) {
        for (var j = 1; j < gBoard[0].length - 1; j++) {
            if (gBoard[i][j] === EMPTY) {
                emptyCells.push({ 'i': i, 'j': j });
            }
        }

    }
    return emptyCells;
}

function cherryPlacer() {
    var emptyCells = getEmptyCells()
    var randomCell = emptyCells[getRandomIntInclusive(0, (emptyCells.length - 1))];
    gBoard[randomCell.i][randomCell.j] = CHERRY;
    renderCell(randomCell, CHERRY);
}
