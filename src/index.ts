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

    constructor() {
        this.initializeGrid();
        this.drawWalls();
        this.dataUrlState.update();
        this.dataUrlState.initDataUrl(this.dataUrlState.getDataUrl());
        // this.dataUrlState.restoreInitDataUrl();

        this.start();
    }

    start = () => {
        this.drawTetromino();
        const loop = setInterval(() => {

            if (this.state.paused) return;

            if (this.hitGround) {
                this.dataUrlState.update();
                this.stickTetromino();

                this.handleCompleteRows();  //remove a row in a grid if it is complete

                if (this.tetromino.position.y === 1) {
                    clearInterval(loop);
                    return alert("Game Over");
                }

                this.tetromino = new TetrominoGrid().getRandom();

                this.tetromino.position = { x: 6, y: 1 }

                this.dataUrlState.restore()
                    .then(() => {
                        this.drawTetromino();
                    })
                    .catch(err => {
                        console.warn(err)
                    })

                return;
            }


            this.dataUrlState.restore()
                .then(() => {
                    this.drawTetromino();
                })
                .catch(err => {
                    console.warn(err)
                })
            this.tetromino.position.y++;

        }, 400);
    }

    increaseScore = () => {
        this.score += 5;
        const scoreEl = <HTMLDivElement>document.getElementById("score");
        scoreEl.innerHTML = `Score: ${this.score}`;
    }

    handleCompleteRows = () => {
        this.grid.forEach((el, i) => {
            if (i < this.tetromino.position.y || i > this.tetromino.position.y + 4) return;
            if (i >= 19 || i === 0) return;

            let boxes = 0;
            for (let box of el) {
                if (box) boxes++;
            }

            if (boxes === 13) {
                //row in a grid
                let index = i;

                while (index > 1) {
                    for (let j = 1; j < el.length - 1; j++) {
                        this.grid[index][j] = this.grid[index - 1][j];
                    }
                    index--;
                }

                this.state.paused = true;
                this.dataUrlState.restoreInitDataUrl();
                this.dataUrlState.restore()
                    .then(() => {

                        this.increaseScore()

                        this.drawBoxes();
                        this.dataUrlState.update();
                        this.state.paused = false;
                    })

            }
        })
    }


    rotateTetromino = (): boolean => {

        const grid = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];

        //column
        for (let i = 0; i < 4; i++) {
            //row
            for (let j = 3; j >= 0; j--) grid[i][3 - j] = this.tetromino.grid[j][i];
        }

        //check if a tetromino can be rotated without collision
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j]) {
                    if (this.grid[i + this.tetromino.position.y][j + this.tetromino.position.x]) {
                        return false;
                    }
                }
            }
        }

        this.tetromino.grid = grid;

        return true;
    }

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

const game = new Game()

document.body.onkeyup = (e: KeyboardEvent) => {
    switch (e.code) {
        case "ArrowLeft": {
            game.state.paused = true;
            if (game.cannotShift(-1)) return game.state.paused = false;
            game.dataUrlState.restore()
                .then(() => {
                    game.tetromino.position.x--;
                    game.drawTetromino();
                    game.state.paused = false;
                })
        } break;

        case "ArrowRight": {
            game.state.paused = true;
            if (game.cannotShift(1)) return game.state.paused = false;
            game.dataUrlState.restore()
                .then(() => {
                    game.tetromino.position.x++;
                    game.drawTetromino();
                    game.state.paused = false;
                })
        } break;

        case "ArrowDown": {
            game.state.paused = true;
            if (game.hitGround) return game.state.paused = false;
            game.dataUrlState.restore()
                .then(() => {
                    game.tetromino.position.y++;
                    game.drawTetromino();
                    game.state.paused = false;
                })
        } break;

        case "Enter": {
            game.state.paused = true;
            if (!game.rotateTetromino()) return game.state.paused = false;

            game.dataUrlState.restore()
                .then(() => {
                    game.drawTetromino();
                    game.state.paused = false;
                })
        } break;

    }
}
