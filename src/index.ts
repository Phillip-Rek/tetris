import "font-awesome/css/font-awesome.min.css";
import "./index.css";
import { createContext } from "./create-context";
import { DataUrlState } from "./data-url-state";
import { Tetromino, TetrominoGrid } from "./tetromino-grid";

const box = (coordinates2D: [number, number], erase?: boolean, color?: string) => {
    const [x, y] = coordinates2D;

    if (erase) {
        ctx.fillStyle = "#ffff";
        return ctx.fillRect(x, y, 30, 30);
    }

    ctx.fillStyle = color || "#000f";
    ctx.fillRect(x, y, 30, 30);
    ctx.fillStyle = "#ffff";
    ctx.fillRect(x + 2, y + 2, 26, 26);
    ctx.fillStyle = color || "#000f";
    ctx.fillRect(x + 4, y + 4, 22, 22);
}

const [ctx, canvas] = createContext();

class Game {
    score = 0;
    state = { over: false, paused: false };
    grid: Array<Array<number>> = [];
    dataUrlState: DataUrlState = new DataUrlState(canvas, ctx);
    tetromino: Tetromino = new TetrominoGrid().getRandom();

    cannotShift = (x: number): boolean => {

        for (let i = 0; i < this.tetromino.grid.length; i++) {
            for (let j = 0; j < this.tetromino.grid[i].length; j++) {
                if (this.tetromino.grid[i][j]) {
                    if (this.grid[i + this.tetromino.position.y][j + this.tetromino.position.x + x]) {
                        return true;
                    }

                    if ((i + this.tetromino.position.x) >= 13 ||
                        (i + this.tetromino.position.x) <= 0
                    ) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    get hitGround(): boolean {

        for (let i = 0; i < this.tetromino.grid.length; i++) {
            for (let j = 0; j < this.tetromino.grid[i].length; j++) {
                if (this.tetromino.grid[i][j]) {
                    if (!this.grid[i + this.tetromino.position.y + 1])
                        return true

                    if (this.grid[i + this.tetromino.position.y + 1][j + this.tetromino.position.x]) {
                        return true;
                    }

                    if ((i + this.tetromino.position.y) >= 19) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    stickTetromino = () => {
        for (let i = 0; i < this.tetromino.grid.length; i++) {
            for (let j = 0; j < this.tetromino.grid[i].length; j++) {
                if (this.tetromino.grid[i][j]) {
                    this.grid[i + this.tetromino.position.y][j + this.tetromino.position.x] = 1;
                }
            }
        }
    }

    drawTetromino = () => {
        for (let i = 0; i < this.tetromino.grid.length; i++) {
            for (let j = 0; j < this.tetromino.grid[i].length; j++) {
                if (this.tetromino.grid[i][j]) {
                    box([(j + this.tetromino.position.x) * 30, (i + this.tetromino.position.y) * 30], false, this.tetromino.color);
                }
            }
        }
    }

    initializeGrid = () => {
        for (let i = 0; i < 20; i++) {
            const row: number[] = [];
            for (let j = 0; j < 13; j++) {
                row.push((i % 19 === 0 || j % 12 === 0) && 1 || 0);
            }
            this.grid.push(row);
        }

        return this;
    }

    drawWalls = () => {
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 13; j++) {
                if (this.grid[i][j]) {
                    box([j * 30, i * 30], false, "#016f");
                }
            }
        }
    }

    drawBoxes = () => {
        for (let i = 1; i < 19; i++) {
            for (let j = 1; j < 12; j++) {
                if (this.grid[i][j]) {
                    box([j * 30, i * 30]);
                }
            }
        }
    }

}

// new Game().initializeGrid()