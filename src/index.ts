import "font-awesome/css/font-awesome.min.css";
import "./index.css";
import { createContext } from "./create-context";
import { DataUrlState } from "./data-url-state";

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
}