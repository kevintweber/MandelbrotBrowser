import { Algorithm } from "./Algorithm";
import { ColorScheme } from "../../display/colorscheme/ColorScheme";
import { Coordinates } from "../Coordinates";
import { Engine } from "../engine/Engine";

export class LineByLine implements Algorithm {

    private readonly colorScheme: ColorScheme;
    private readonly context: CanvasRenderingContext2D;
    private readonly coordinates: Coordinates;
    private readonly engine: Engine;

    constructor(
            colorScheme: ColorScheme,
            coordinates: Coordinates,
            context: CanvasRenderingContext2D,
            engine: Engine) {
        this.colorScheme = colorScheme;
        this.coordinates = coordinates;
        this.context = context;
        this.engine = engine;
    }

    async draw(x: number, y: number, onSuccessCallback: () => void) {
        let img = this.context.createImageData(this.coordinates.pixelWidth, 1);
        let lastUpdate = (new Date).getTime();

        for (; y < this.coordinates.pixelHeight; y++) {
            this.drawLine(img, y);
            this.context.putImageData(img, 0, y);

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

    private drawLine(
            localImg: ImageData,
            y: number) {
        let offset = 0;
        for (let x = 0; x < this.coordinates.pixelWidth; x++) {
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

    toString(): string {
        return "LineByLine[" +
                "engine={" + this.engine.toString() + "};" +
                "]"
    }
}