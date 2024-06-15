export class DataUrlState {
    private dataUrl: string;
    private initDataUrl_: string = "";
    constructor(
        private canvas: HTMLCanvasElement,
        private ctx: CanvasRenderingContext2D
    ) {
        this.ctx.fillStyle = "#ffff";
        this.ctx.fillRect(0, 0, 400, 600);
        this.dataUrl = canvas.toDataURL();
    }

    initDataUrl(url: string) {
        if (!url) return this.initDataUrl_
        this.initDataUrl_ = url;
    }

    getDataUrl = () => {
        return this.dataUrl;
    }

    restoreInitDataUrl = () => {
        this.dataUrl = this.initDataUrl_;
    }

    restore = (): Promise<string> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.addEventListener("load", () => {
                this.ctx.drawImage(img, 0, 0);
                resolve(this.dataUrl);
            })
            img.src = this.dataUrl;

            img.onerror = (err) => {
                reject(err);
            }
        })
    }

    update = () => {
        this.dataUrl = this.canvas.toDataURL();
    }
}