function gameBoard() {
    let grid = Array.from({ length: 9}, () => 0);
    const winnerCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const setCoordinate = (player, coordinate) => {
        grid[coordinate] = player === 1 ? 1 : 2;
    }

    const checkWinner = () => {
        for (const combo of winnerCombos) {
            const [a, b, c] = combo;
            if (grid[a] > 0 && grid[a] === grid[b] && grid[a] === grid[c]) {
                return grid[a];
            }
        }
        return 0;
    }

    const clearBoard = () => {
        grid = Array.from({ length: 9}, () => 0);
    }

    return { setCoordinate, clearBoard, checkWinner };
}

function player(name) {
    let score = 0;
    let user = name;

    const addWin = () => {
        score++;
    }

    return { addWin };
}

function gameController(player1, player2) {
    let turn = 1;
    const playerOne = player1;
    const playerTwo = player2;
    const board = gameBoard();

    const playRound = (coordinate) => {
        board.setCoordinate(turn, coordinate);
        const winner = board.checkWinner();
        if (winner === 1) {
            playerOne.addWin();
        } else if (winner === 2) {
            playerTwo.addWin();
        }
        turn = turn === 1 ? 2 : 1;
        return winner;
    }

    return { playRound };
}

