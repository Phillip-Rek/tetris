export class SidePanel {
    container: HTMLElement;
    scoreElement: HTMLElement;
    constructor() {

        this.container = this.createContainer();
        this.scoreElement = this.createScoreElement();

    }

    createContainer() {
        const sidePanel = document.createElement("div");
        sidePanel.style.width = "350px";
        sidePanel.style.height = "100%";
        sidePanel.style.border = "2px solid red";
        sidePanel.style.display = "flex";
        sidePanel.style.flexDirection = "column"

        document.body.appendChild(sidePanel);

        return sidePanel;
    }

    createScoreElement() {
        const scoreContainer = document.createElement("div");
        const scoreElement = document.createElement("p");
        scoreContainer.appendChild(scoreElement);

        scoreContainer.style.width = "100%";
        scoreContainer.style.border = "2px solid green";

        this.container.appendChild(scoreContainer);

        return scoreContainer;
    }
}