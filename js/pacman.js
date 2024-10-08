'use strict'
var PACMAN = `<img src="img/pacman.png">`
var gPacman
var currDirection

function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function onMovePacman(ev) {
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.code)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    // DONE: return if cannot move
    if (nextCell === WALL) return
    // DONE: hitting a ghost? call gameOver
    if (nextCell === GHOST && !gPacman.isSuper) {
        gameOver()
        return
    }
    if (nextCell === GHOST && gPacman.isSuper) {
        eatGhost(nextLocation)
    }

    if (nextCell === FOOD) {
        playSound('eatFood')
        updateScore(1)
        if (gGame.score === gTotalScore) winGame()
    }
    if (nextCell === SUPERFOOD) {
        if (gPacman.isSuper) return
        turnOnSuper()
    }
    if (nextCell === CHERRY) {
        playSound('eatCherry')
        updateScore(15)
        gTotalScore += 15
    }



    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)

    // DONE: Move the pacman to new location:
    // DONE: update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation
    // DONE: update the DOM
    renderCell(nextLocation, PACMAN)
}

function turnOnSuper() {
    playSound('eatSuper')
    gPacman.isSuper = true
    colorGhosts()
    setTimeout(turnOffSuper, 5000)
}

function turnOffSuper() {
    reviveGhosts()
    gPacman.isSuper = false
}

function getNextLocation(eventKeyboard) {

    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // TODO: figure out nextLocation
    switch (eventKeyboard) {
        case 'ArrowUp':
            changeDirection('Up')
            nextLocation.i--
            break;
        case 'ArrowRight':
            changeDirection('Right')
            nextLocation.j++
            break;
        case 'ArrowDown':
            changeDirection('Down')
            nextLocation.i++
            break;
        case 'ArrowLeft':
            changeDirection('Left')
            nextLocation.j--
            break;
    }

    return nextLocation
}

function changeDirection(direction) {
    var degree=0
    switch (direction) {
        case 'Up':
            degree = 270
            break;
        case 'Right':
            degree = 0
            break;
        case 'Down':
            degree = 90
            break;
        case 'Left':
            degree = 180
            break;
    }
    PACMAN = `<img src="img/pacman.png" style="transform: rotate(${degree}deg);">`
}