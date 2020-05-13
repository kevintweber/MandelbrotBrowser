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
        this.blockSize = 16;
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
        let fillDepth = this.getFillDepth(
                xLeft,
                xRight,
                yTop,
                yBottom
        );
        if (fillDepth === null) {
            return this.calculateBlock(
                    localImg,
                    xLeft,
                    xRight,
                    yTop,
                    yBottom
            );
        }

        return this.fillBlock(
                localImg,
                xLeft,
                xRight,
                yTop,
                yBottom,
                fillDepth
        );
    }

    private calculateBlock(
            localImg: ImageData,
            xLeft: number,
            xRight: number,
            yTop: number,
            yBottom: number) {
        let offset = 0;
        for (let y = yTop; y < yBottom; y++) {
            for (let x = xLeft; x < xRight; x++) {
                let depth = this.calculateDepth(x, y);
                let color = this.colorScheme.getColor(depth);

                localImg.data[offset++] = color[0];
                localImg.data[offset++] = color[1];
                localImg.data[offset++] = color[2];
                localImg.data[offset++] = color[3];
            }
        }
    }

    private fillBlock(
            localImg: ImageData,
            xLeft: number,
            xRight: number,
            yTop: number,
            yBottom: number,
            depth: number) {
        let offset = 0;
        let color = this.colorScheme.getColor(depth);
        for (let y = yTop; y < yBottom; y++) {
            for (let x = xLeft; x < xRight; x++) {
                localImg.data[offset++] = color[0];
                localImg.data[offset++] = color[1];
                localImg.data[offset++] = color[2];
                localImg.data[offset++] = color[3];
            }
        }
    }

    private getFillDepth(
            xLeft: number,
            xRight: number,
            yTop: number,
            yBottom: number): number | null {
        const depth = this.calculateDepth(xLeft, yTop);

        // Top & Bottom
        for (let x = xLeft; x < xRight; x++) {
            let topDepth = this.calculateDepth(x, yTop);
            if (topDepth !== depth) {
                return null;
            }

            let bottomDepth = this.calculateDepth(x, yBottom - 1);
            if (bottomDepth !== depth) {
                return null;
            }
        }

        // Left & Right
        for (let y = yTop + 1; y < yBottom - 2; y++) {
            let leftDepth = this.calculateDepth(xLeft, y);
            if (leftDepth !== depth) {
                return null;
            }

            let rightDepth = this.calculateDepth(xRight - 1, y);
            if (rightDepth !== depth) {
                return null;
            }
        }

        return depth;
    }

    private calculateDepth(x: number, y: number): number {
        let xCoordinate = this.coordinates.getXCoordinate(x);
        let yCoordinate = this.coordinates.getYCoordinate(y);

        return this.engine.calculateEscapeDepth(xCoordinate, yCoordinate);
    }

    toString(): string {
        return "Blockwise[" +
                "engine={" + this.engine.toString() + "};" +
                "blockSize=" + this.blockSize +
                "]"
    }
}