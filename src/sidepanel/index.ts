export class SidePanel {
    container: HTMLElement;
    scoreElement: HTMLElement;
    constructor() {

        this.container = this.createContainer();
        this.scoreElement = this.createScoreElement();

        this.showInstructions();
    }

    createContainer() {
        const sidePanel = document.createElement("div");
        sidePanel.style.width = "250px";
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
}