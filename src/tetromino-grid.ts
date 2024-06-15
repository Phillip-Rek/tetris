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
}