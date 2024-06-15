export interface Tetromino {
    grid: number[][],
    position: { x: number, y: number },
    color: string,
}

export class TetrominoGrid {

    get tetromino_ONE() {
        return [[
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0],
        ], "#000f"]
    }

    get tetromino_TWO() {
        return [[
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 2, 0],
            [0, 0, 0, 0],
        ], "#000f"]
    }

    get tetromino_THREE() {
        return [[
            [0, 2, 0, 0],
            [0, 2, 2, 0],
            [0, 0, 2, 0],
            [0, 0, 0, 0],
        ], "#000f"]
    }

    get tetromino_FOUR() {
        return [[
            [0, 2, 0, 0],
            [0, 2, 2, 0],
            [0, 2, 0, 0],
            [0, 0, 0, 0],
        ], "#000f"]
    }

    get tetromino_FIVE() {
        return [[
            [0, 0, 0, 0],
            [0, 2, 2, 0],
            [0, 2, 2, 0],
            [0, 0, 0, 0],
        ], "#000f"]
    }
}