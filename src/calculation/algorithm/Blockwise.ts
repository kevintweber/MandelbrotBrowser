import { Algorithm } from "./Algorithm";
import { ColorScheme } from "../../display/colorscheme/ColorScheme";
import { Coordinates } from "../Coordinates";
import { Mandelbrot } from "../Mandelbrot";

export class Blockwise implements Algorithm {

    private readonly colorScheme: ColorScheme;
    private readonly context: CanvasRenderingContext2D;
    private readonly coordinates: Coordinates;
    private readonly engine: Mandelbrot;
    blockSize: number;

    constructor(
            colorScheme: ColorScheme,
            coordinates: Coordinates,
            context: CanvasRenderingContext2D,
            engine: Mandelbrot) {
        this.colorScheme = colorScheme;
        this.coordinates = coordinates;
        this.context = context;
        this.engine = engine;
        this.blockSize = 12;
    }

    async draw(x: number, y: number, onSuccessCallback: () => void) {
        let lastUpdate = (new Date).getTime();
        let maxX = this.coordinates.pixelWidth;
        let maxY = this.coordinates.pixelHeight;

        while (y < maxY) {
            let yTop = y;
            let yBottom = y + this.blockSize > maxY ? maxY - y : y + this.blockSize;

            while (x < maxX) {
                let xLeft = x;
                let xRight = x + this.blockSize > maxX ? maxX - x : x + this.blockSize;

                let img = this.context.createImageData(xRight - xLeft, yBottom - yTop);
                this.drawBlock(img, xLeft, xRight, yTop, yBottom);
                this.context.putImageData(img, xLeft, yTop);

                x = x + this.blockSize;
            }

            x = 0;
            y = y + this.blockSize;

            // Relinquish execution back to the browser once every second,
            // so it can paint what is has so far.
            let now = (new Date).getTime();
            if (now - lastUpdate > 1000) {
                console.log("Updating image.");
                lastUpdate = (new Date).getTime();
                await setTimeout(() => {
                    this.draw(x, y, onSuccessCallback);
                }, 0);

                return;
            }
        }

        return onSuccessCallback();
    }

    private drawBlock(
            localImg: ImageData,
            xLeft: number,
            xRight: number,
            yTop: number,
            yBottom: number) {
        let offset = 0;
        for (let y = yTop; y < yBottom; y++) {
            for (let x = xLeft; x < xRight; x++) {
                let xCoordinate = this.coordinates.getXCoordinate(x);
                let yCoordinate = this.coordinates.getYCoordinate(y);

                let depth = this.engine.calculateEscapeDepth(xCoordinate, yCoordinate);
                let color = this.colorScheme.getColor(depth);

                localImg.data[offset++] = color[0];
                localImg.data[offset++] = color[1];
                localImg.data[offset++] = color[2];
                localImg.data[offset++] = color[3];
            }
        }
    }

    toString(): string {
        return "Blockwise[" +
                "engine={" + this.engine.toString() + "};" +
                "blockSize=" + this.blockSize +
                "]"
    }
}