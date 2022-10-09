// edit values to modify board game size
export const boardSize = {
    width: 50,
    height: 20,
    cellSize: 20,
};

// DONT TOUCH THESE! :D
export const directions = [
    {
        name: 'left',
        keyCode: 37,
        move: {
            x: -1,
            y: 0,
        }
    },
    {
        name: 'top',
        keyCode: 38,
        move: {
            x: 0,
            y: -1,
        }
    },
    {
        name: 'right',
        keyCode: 39,
        move: {
            x: 1,
            y: 0,
        }
    },
    {
        name: 'down',
        keyCode: 40,
        move: {
            x: 0,
            y: 1,
        }
    },
]