let turn = 1;
const startGameBtn = document.getElementById('start-game');
startGameBtn.addEventListener('click', () => {
    let player1Name = prompt("Enter player 1 name:");
    const player1 = player(player1Name);
    let player2Name = prompt("Enter player 2 name:");
    const player2 = player(player2Name);
    
    const controller = gameController(player1, player2);
    
}) 
const gridBlocks = document.querySelectorAll('.grid-square');
gridBlocks.forEach((block, index) => {
    block.addEventListener('click', () => {
        controller.playRound(index);
    })
})

function gameBoard() {
    let grid = Array.from({ length: 9}, () => 0);
    const gridBlocks = document.querySelectorAll('.grid-square');
    const winnerCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const setCoordinate = (player, coordinate) => {
        grid[coordinate] = player === 1 ? 1 : 2;
        if (player === 1) {
            gridBlocks[coordinate].style.background = `
                linear-gradient(to top right, transparent calc(50% - 2px), blue calc(50% - 2px) calc(50% + 2px), transparent calc(50% + 2px)),
                linear-gradient(to bottom right, transparent calc(50% - 2px), blue calc(50% - 2px) calc(50% + 2px), transparent calc(50% + 2px))
            `;
        } else {
            const circle = document.createElement("div");
            circle.style.width = "50px";
            circle.style.height = "50px";
            circle.style.border = "5px solid black";
            circle.style.borderRadius = "50%";
            gridBlocks[coordinate].appendChild(circle);
        }
    }

    const isOccupied = (coordinate) => {
        return grid[coordinate] > 0 ? true : false;
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

    return { setCoordinate, clearBoard, checkWinner, isOccupied };
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
    const playerOne = player1;
    const playerTwo = player2;
    const board = gameBoard();

    const playRound = (coordinate) => {
        if (!board.isOccupied(coordinate)) {
            board.setCoordinate(turn, coordinate);
            turn = turn === 1 ? 2 : 1;
        }
        const winner = board.checkWinner();
        if (winner === 1) {
            playerOne.addWin();
        } else if (winner === 2) {
            playerTwo.addWin();
        }
        return winner;
    }

    return { playRound };
}

