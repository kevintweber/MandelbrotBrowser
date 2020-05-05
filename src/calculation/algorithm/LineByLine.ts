import { Algorithm } from "./Algorithm";
import { Mandelbrot } from "../Mandelbrot";
import { ColorScheme } from "../../display/colorscheme/ColorScheme";
import { Coordinates } from "../Coordinates";

export class LineByLine implements Algorithm {

    private readonly colorScheme: ColorScheme;
    private readonly context: CanvasRenderingContext2D;
    private readonly coordinates: Coordinates;
    private readonly engine: Mandelbrot;

    constructor(
            colorScheme: ColorScheme,
            coordinates: Coordinates,
            context: CanvasRenderingContext2D,
            engine: Mandelbrot) {
        this.colorScheme = colorScheme;
        this.coordinates = coordinates;
        this.context = context;
        this.engine = engine;
    }

    draw(onSuccessCallback: () => void) {
        let img = this.context.createImageData(this.coordinates.pixelWidth, 1);

        let lastUpdate = (new Date).getTime();
        let y = 0;
        let maxY = this.coordinates.pixelHeight;

        let drawCallback = () => {
            this.drawLine(img, this.colorScheme, this.coordinates, this.engine, y);
            this.context.putImageData(img, 0, y);

            y++;
            if (y > maxY) {
                return onSuccessCallback();
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

    private drawLine(
            localImg: ImageData,
            localColorScheme: ColorScheme,
            localCoordinates: Coordinates,
            localEngine: Mandelbrot,
            y: number) {
        let offset = 0;
        for (let x = 0; x < localCoordinates.pixelWidth; x++) {
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