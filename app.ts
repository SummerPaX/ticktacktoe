type Player = 1 | 2 | 0
type Board = [
    [Player, Player, Player],
    [Player, Player, Player],
    [Player, Player, Player]
]

const emojis = { 1: '❌', 2: '⭕' }
const points = { 1: 0, 2: 0 }

function newBoard(): Board {
    return [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
}

let board = newBoard()

let currentPlayer: 1 | 2 = 1

function createBattleground() {
    const battleContainer = document.getElementById('battleContainer')
    if (battleContainer == null) return

    battleContainer.innerHTML = ''

    board.forEach((boardrow, row) => {
        boardrow.forEach((boardtile, col) => {
            const tile = document.createElement('div')
            tile.id = `tile${row}x${col}`
            tile.classList.add('tile')
            tile.addEventListener('click', () => clickTile(row, col))
            battleContainer.appendChild(tile)
        })
    })
}

function clickTile(row: number, col: number) {
    if (board[row][col] !== 0) { return }

    board[row][col] = currentPlayer
    const boardTile = document.getElementById(`tile${row}x${col}`)
    if (boardTile) {
        boardTile.textContent = emojis[currentPlayer]
    }

    checkWinner()

    currentPlayer = currentPlayer === 1 ? 2 : 1
}

function checkWinner(): Player {
    if ((board[0][0] === board[0][1] && board[0][0] === board[0][2]) ||
        (board[0][0] === board[1][1] && board[0][0] === board[2][2]) ||
        (board[0][0] === board[1][0] && board[0][0] === board[2][0])
    ) {
        return resolveWinner(board[0][0])
    }
    else if ((board[1][1] === board[0][1] && board[1][1] === board[2][1]) ||
        (board[1][1] === board[1][0] && board[1][1] === board[1][2])
    ) {
        return resolveWinner(board[1][1])
    }
    else if ((board[2][2] === board[1][2] && board[2][2] === board[0][2]) ||
        (board[2][2] === board[2][0] && board[2][2] === board[2][1])
    ) {
        return resolveWinner(board[2][2])
    }

    return 0
}

function resolveWinner(winner: Player): Player {
    if (winner === 0) { return 0 }

    const battleContainer = <HTMLDivElement>document.getElementById('battleContainer')

    battleContainer.innerHTML = ''
    const winnerElem = document.createElement('h3')
    winnerElem.textContent = emojis[winner] + ' won!'
    winnerElem.classList.add('winner-text')
    battleContainer.append(winnerElem)


    const pointsWinner = winner === 1 ?
        <HTMLSpanElement>document.getElementById('pointsPlayer1') :
        <HTMLSpanElement>document.getElementById('pointsPlayer2')

    points[winner]++
    pointsWinner.textContent = points[winner].toString()


    return winner
}

function newGame() {
    board = newBoard()
    currentPlayer = 1

    createBattleground()
}

createBattleground()