
export function createContext(w?: number, h?: number, clean: boolean = true): [CanvasRenderingContext2D, HTMLCanvasElement] {

    let canvas = document.createElement("canvas");

    if (clean)
        Array.from(document.body.children).forEach(el => { el.remove() })

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