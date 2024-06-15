export class SidePanel {
    constructor() {

        const sidePanel = this.createContainer();

    }

    createContainer() {
        const sidePanel = document.createElement("div");
        sidePanel.style.width = "350px";
        sidePanel.style.height = "100%";
        sidePanel.style.border = "2px solid red";

        document.body.appendChild(sidePanel);

        return sidePanel;
    }
}