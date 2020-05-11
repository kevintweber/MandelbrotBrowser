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
        this.blockSize = 10;
    }

    draw(x: number, y: number, onSuccessCallback: () => void) {
        let lastUpdate = (new Date).getTime();
        let maxX = this.coordinates.pixelWidth;
        let maxY = this.coordinates.pixelHeight;

        let drawCallback = () => {
            let xLeft = x;
            let xRight = x + this.blockSize > maxX ? maxX - x : x + this.blockSize;
            let yTop = y;
            let yBottom = y + this.blockSize > maxY ? maxY - y : y + this.blockSize;

            let img = this.context.createImageData(xRight - xLeft, yBottom - yTop);
            this.drawBlock(img, this.colorScheme, this.coordinates, this.engine, xLeft, xRight, yTop, yBottom);
            this.context.putImageData(img, xLeft, yTop);

            x = x + this.blockSize;
            if (x > maxX) {
                x = 0;
                y = y + this.blockSize;
                if (y > maxY) {
                    return;
                }
            }

            // Relinquish execution back to the browser once every second,
            // so it can paint what is has so far.
            let now = (new Date).getTime();
            if (now - lastUpdate > 1000) {
                lastUpdate = (new Date).getTime();
                setTimeout(drawCallback, 0);
            } else {
                drawCallback();
            }
        }

        drawCallback();
    }

    private drawBlock(
            localImg: ImageData,
            localColorScheme: ColorScheme,
            localCoordinates: Coordinates,
            localEngine: Mandelbrot,
            xLeft: number,
            xRight: number,
            yTop: number,
            yBottom: number) {
        let offset = 0;
        for (let y = yTop; y < yBottom; y++) {
            for (let x = xLeft; x < xRight; x++) {
                let xCoordinate = localCoordinates.getXCoordinate(x);
                let yCoordinate = localCoordinates.getYCoordinate(y);

                let depth = localEngine.calculateEscapeDepth(xCoordinate, yCoordinate);
                let color = localColorScheme.getColor(depth);

                localImg.data[offset++] = color[0];
                localImg.data[offset++] = color[1];
                localImg.data[offset++] = color[2];
                localImg.data[offset++] = color[3];
            }
        }
    }
}