/**
 * The primary class for Julia set calculations.
 */
import { Engine } from "./Engine";

export class Julia implements Engine {

    readonly cx: number;
    readonly cy: number;
    readonly maxIterations: number;

    constructor(
            cx: number,
            cy: number,
            maxIterations: number) {
        this.cx = cx;
        this.cy = cy;
        this.maxIterations = maxIterations;
        if (this.maxIterations < 1) {
            throw new Error("Invalid number of max iterations: " + this.maxIterations);
        }
    }

    calculateEscapeDepth(xCoordinate: number, yCoordinate: number): number {
        let iteration = 0;
        let zx = xCoordinate;
        let zy = yCoordinate;
        while (iteration < this.maxIterations && (zx * zx + zy * zy) <= 4.0) {
            let xTemp = zx * zx - zy * zy;
            zy = 2 * zx * zy + this.cy;
            zx = xTemp + this.cx;

            iteration++;
        }

        return iteration;
    }

    toString(): string {
        return "Julia[" +
                "maxIterations=" + this.maxIterations +
                "]";
    }
}