import { Algorithm } from "./Algorithm";
import { Mandelbrot } from "../Mandelbrot";
import { Coloring } from "../../display/coloring/Coloring";

export class LineByLine implements Algorithm {

    private coloring: Coloring;
    private mandelbrot: Mandelbrot;

    constructor(
            coloring: Coloring,
            mandelbrot: Mandelbrot) {
        this.coloring = coloring;
        this.mandelbrot = mandelbrot;
    }

    draw(ctx: CanvasRenderingContext2D) {
        let img = ctx.createImageData(this.mandelbrot.pixelWidth, 1);
        for (let y = 0; y < this.mandelbrot.pixelHeight; y++) {
            this.drawLine(img, y);
            ctx.putImageData(img, 0, y);
        }
    }

    private drawLine(img: ImageData, y: number) {
        let offset = 0;
        for (let x = 0; x < this.mandelbrot.pixelWidth; x++) {
            let position = this.mandelbrot.determinePosition(x, y);
            let depth = this.mandelbrot.calculateEscapeDepth(position);
            let color = this.coloring.getColor(depth);

            img.data[offset++] = color[0];
            img.data[offset++] = color[1];
            img.data[offset++] = color[2];
            img.data[offset++] = color[3];
        }
    }
}