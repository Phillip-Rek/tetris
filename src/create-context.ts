export function createContext(w?: number, h?: number): [CanvasRenderingContext2D, HTMLCanvasElement] {

    let canvas = document.createElement("canvas");

    if (Array.from(document.getElementsByTagName("canvas")).length > 0) {
        canvas = Array.from(document.getElementsByTagName("canvas"))[0];
    }

    document.body.appendChild(canvas);
    canvas.width = w || 390;
    canvas.height = h || 600;
    canvas.style.backgroundColor = "#fff";
    canvas.style.width = "390px";
    canvas.style.height = "600px";
    document.getElementById("draw-pad")?.appendChild(canvas);

    const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
    return [ctx, canvas];
}