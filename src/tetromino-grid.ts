export interface Tetromino {
    grid: number[][],
    position: { x: number, y: number },
    color: string,
}

export class TetrominoGrid {

    getRandom(): Tetromino {
        const random = Math.random();
        let grid: number[][] = [];
        let color: string = "";
        if (random < 0.2) { [grid, color] = this.tetromino_1; }
        else if (random < 0.4) { [grid, color] = this.tetromino_2; }
        else if (random < 0.6) { [grid, color] = this.tetromino_3; }
        else if (random < 0.8) { [grid, color] = this.tetromino_4; }
        else { [grid, color] = this.tetromino_5; }

        return {
            position: { x: 7, y: 0 },
            color,
            grid
        }
    }

    get tetromino_1(): [number[][], string] {
        return [[
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0],
        ], "#000f"]
    }

    get tetromino_2(): [number[][], string] {
        return [[
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 2, 0],
            [0, 0, 0, 0],
        ], "#700f"]
    }

    get tetromino_3(): [number[][], string] {
        return [[
            [0, 2, 0, 0],
            [0, 2, 2, 0],
            [0, 0, 2, 0],
            [0, 0, 0, 0],
        ], "#070f"]
    }

    get tetromino_4(): [number[][], string] {
        return [[
            [0, 2, 0, 0],
            [0, 2, 2, 0],
            [0, 2, 0, 0],
            [0, 0, 0, 0],
        ], "#007f"]
    }

    get tetromino_5(): [number[][], string] {
        return [[
            [0, 0, 0, 0],
            [0, 2, 2, 0],
            [0, 2, 2, 0],
            [0, 0, 0, 0],
        ], "#077f"]
    }
}