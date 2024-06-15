export interface Tetromino {
    grid: number[][],
    position: { x: number, y: number },
    color: string,
}

export class TetrominoGrid {

    getRandom() {
        const random = Math.random();
        if (random < 0.2) return this.tetromino_1;
        else if (random < 0.4) return this.tetromino_2;
        else if (random < 0.6) return this.tetromino_3;
        else if (random < 0.8) return this.tetromino_4;
        else return this.tetromino_5;
    }

    get tetromino_1() {
        return [[
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0],
        ], "#000f"]
    }

    get tetromino_2() {
        return [[
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 2, 0],
            [0, 0, 0, 0],
        ], "#000f"]
    }

    get tetromino_3() {
        return [[
            [0, 2, 0, 0],
            [0, 2, 2, 0],
            [0, 0, 2, 0],
            [0, 0, 0, 0],
        ], "#000f"]
    }

    get tetromino_4() {
        return [[
            [0, 2, 0, 0],
            [0, 2, 2, 0],
            [0, 2, 0, 0],
            [0, 0, 0, 0],
        ], "#000f"]
    }

    get tetromino_5() {
        return [[
            [0, 0, 0, 0],
            [0, 2, 2, 0],
            [0, 2, 2, 0],
            [0, 0, 0, 0],
        ], "#000f"]
    }
}