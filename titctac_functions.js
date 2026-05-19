function gameBoard(player, coordinate) {
    let grid = Array.from({ length: 9}, () => 0);

    const setCoordinate = (player, coordinate) => {
        if (player === 1) {
            grid[coordinate] = 1;
        }
        else {
            grid[coordinate] = 2;
        }
    }

    const clearBoard = () => {
        grid = Array.from({ length: 9}, () => 0);
    }

    return { setCoordinate, clearBoard };
}

function gamePlay()