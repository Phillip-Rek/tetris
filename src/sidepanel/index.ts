import { Draw } from "..";
import { createContext } from "../create-context";
import { Tetromino } from "../tetromino-grid";

export class SidePanel {
    container: HTMLElement;
    scoreElement: HTMLElement;
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;

    private draw: Draw

    tetromino?: Tetromino;

    constructor(private width = "250px") {

        this.container = this.createContainer();
        this.scoreElement = this.createScoreElement();

        this.showInstructions();
        const [ctx, canvas] = this.nextTetromino();

        this.ctx = ctx;
        this.canvas = canvas;

        this.draw = new Draw(this.ctx);

        this.drawTetromino();
    }

    createContainer() {
        const sidePanel = document.createElement("div");
        sidePanel.style.width = this.width;
        sidePanel.style.height = "600px";
        sidePanel.style.border = "1px solid #00af";
        sidePanel.style.display = "flex";
        sidePanel.style.padding = "0px 15px";
        sidePanel.style.flexDirection = "column"

        document.body.appendChild(sidePanel);

        return sidePanel;
    }

    createScoreElement() {
        const scoreContainer = document.createElement("div");
        const scoreElement = document.createElement("p");
        scoreElement.innerHTML = "<b>Score: </b>" + "00";
        scoreContainer.appendChild(scoreElement);

        scoreContainer.style.width = "100%";
        // scoreContainer.style.border = "2px solid green";

        this.container.appendChild(scoreContainer);

        return scoreElement;
    }

    updateScore(score: string) {
        this.scoreElement.innerHTML = "<b>Score: </b>" + score;
    }

    showInstructions() {
        const container = document.createElement("div");

        const instructions = document.createElement("p");
        instructions.innerHTML = "<b>HOW TO PLAY</b>";

        const left = document.createElement("p");
        left.innerHTML = "<b>Left:</b> Left Arrow [<]";

        const right = document.createElement("p");
        right.innerHTML = "<b>Right:</b> Right Arrow [>]";

        const down = document.createElement("p");
        down.innerHTML = "<b>Down:</b> Down Arrow [v]";

        const rotate = document.createElement("p");
        rotate.innerHTML = "<b>Rotate:</b> Enter [<-]";

        container.appendChild(instructions);
        container.appendChild(left);
        container.appendChild(right);
        container.appendChild(down);
        container.appendChild(rotate);

        this.container.appendChild(container);

        return container;
    }

    private nextTetromino(): [CanvasRenderingContext2D, HTMLCanvasElement] {
        const [ctx, canvas] = createContext(250, 250, false);
        ctx.fillStyle = "#cccf";
        ctx.fillRect(0, 0, 250, 250);
        // canvas.style.border = "1px solid red"
        canvas.style.width = this.width
        canvas.style.height = "250px";

        const heading = document.createElement("p");
        heading.innerHTML = "<b>NEXT</b>";

        this.container.appendChild(heading);
        this.container.appendChild(canvas);

        return [ctx, canvas];
    }

    updateTetromino(tetromino: Tetromino) {
        this.ctx.fillStyle = "#cccf";
        this.ctx.fillRect(0, 0, 250, 250);

        this.tetromino = tetromino;
        this.tetromino.position = { x: 0, y: 1 }
        this.drawTetromino();
    }

    private drawTetromino = () => {
        if (!this.tetromino) return;
        // console.log(this.draw)
        for (let i = 0; i < this.tetromino.grid.length; i++) {
            for (let j = 0; j < this.tetromino.grid[i].length; j++) {
                if (this.tetromino.grid[i][j]) {
                    this.draw.box([(j + this.tetromino.position.x) * 30, (i + this.tetromino.position.y) * 30], false, this.tetromino.color);
                }
            }
        }
    }
}