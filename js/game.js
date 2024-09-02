'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPERFOOD = '🍏'
const CHERRY = '<img src="img/cherry.png">'



const gGame = {
    score: 0,
    isOn: false
}
var gBoard
var gTotalScore
var gCherryPos = null
var cherryIntervalId

function onInit() {
    gBoard = buildBoard()
    gTotalScore = countFood()
    createPacman(gBoard)
    createGhosts(gBoard)
    renderBoard(gBoard)
    hideModal()
    gGame.isOn = true
    cherryIntervalId=setInterval(updateCherry,15000)
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
            if (i === 1 || i === size - 2) {
                if (j === 1 || j === size - 2) {
                    board[i][j] = SUPERFOOD
                }
            }
        }
    }
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function updateCherry() {
    var randPos = getRandEmptyPos()
    if(!randPos) return
    // delete previous cherry if it exists
    if(gCherryPos){
        //update the model
        gBoard[gCherryPos.i][gCherryPos.j]=EMPTY
        //update DOM
        renderCell(gCherryPos,EMPTY)
    }
    //create new cherry
    gCherryPos=randPos
    // update model
    gBoard[gCherryPos.i][gCherryPos.j]= CHERRY
    // update DOM
    renderCell(gCherryPos, CHERRY)

}

function updateScore(diff) {
    // update model 
    if (diff) {
        gGame.score += diff
    } else {
        gGame.score = 0
    }
    // and dom
    document.querySelector('span.score').innerText = gGame.score


}

function gameOver() {
    playSound('lost')
    showModal()
    clearInterval(gIntervalGhosts)
    clearInterval(cherryIntervalId)
    renderCell(gPacman.location, '🪦')
    gGame.isOn = false
}

function winGame() {
    showWinModal()
    playSound('win')
    clearInterval(gIntervalGhosts)
    clearInterval(cherryIntervalId)
    renderCell(gPacman.location, '🥳')
    gGame.isOn = false
}

function showModal() {
    const elMsg = document.querySelector('.winMsg')
    elMsg.innerText = 'You Lose!'
    const elModal = document.querySelector('.modal')
    elModal.classList.remove('hide')
}

function showWinModal() {
    const elMsg = document.querySelector('.winMsg')
    elMsg.innerText = 'You Win!'
    const elModal = document.querySelector('.modal')
    elModal.classList.remove('hide')
}

function hideModal() {
    const elModal = document.querySelector('.modal')
    elModal.classList.add('hide')
}

function countFood() {
    var count = 0
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j] === FOOD) count++
        }
    }
    return count - 1
}

function getRandEmptyPos() {
    const emptyPoss = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            const currCell = gBoard[i][j]
            if (currCell === EMPTY) {
                emptyPoss.push({ i, j })
            }
        }
    }

    const randIdx = getRandomIntInclusive(0, emptyPoss.length-1)
    return emptyPoss[randIdx]
}
