'use strict'

const GHOST = '👻'
var gGhosts = []
var gEatenGhosts = []

var gIntervalGhosts

function createGhosts(board) {
    // DONE: 3 ghosts and an interval
    gGhosts = []
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }

    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function createGhost(board) {
    const ghost = {
        location: {
            i: 2,
            j: 6
        },
        currCellContent: FOOD,
        color: getRandomColor()
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function moveGhosts() {
    // DONE: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {

    // DONE: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    // DONE: return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return
    if (nextCell === SUPERFOOD) return
    // DONE: hitting a pacman? call gameOver
    if (nextCell === PACMAN) {
        gameOver()
        return
    }

    // DONE: moving from current location:
    // DONE: update the model (restore prev cell contents)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // DONE: update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // DONE: Move the ghost to new location:
    // DONE: update the model (save cell contents)
    ghost.location = nextLocation
    ghost.currCellContent = nextCell
    gBoard[nextLocation.i][nextLocation.j] = GHOST
    // DONE: update the DOM
    renderCell(nextLocation, getGhostHTML(ghost))
}

function eatGhost(location) {
    var eatenGhostIdx = null
    for (var i = 0; i < gGhosts.length; i++) {
        if (location.i === gGhosts[i].location.i &&
            location.j === gGhosts[i].location.j) eatenGhostIdx = i
    }
    var ghost = gGhosts.splice(eatenGhostIdx, 1)
    gEatenGhosts.push(ghost[0])
}

function reviveGhosts() {
    var length=gEatenGhosts.length
    for(var i=0;i<length;i++){
        var currGhost= gEatenGhosts.pop()
        gGhosts.push(currGhost)
    }
}


function getMoveDiff() {

    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    if (gPacman.isSuper) {
        return `<span style="background-color: red">${GHOST}</span>`
    }
    return `<span style="background-color: ${ghost.color}">${GHOST}</span>`

}