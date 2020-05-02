import { Position } from "./Position";

/**
 * The primary class for Mandelbrot set calculations.
 */
export class Mandelbrot {

    readonly pixelHeight: number;
    readonly pixelWidth: number;
    readonly centerX: number;
    readonly centerY: number;
    readonly width: number;
    readonly maxIterations: number;
    readonly increment: number;

    constructor(
            pixelHeight: number,
            pixelWidth: number,
            centerX: number,
            centerY: number,
            width: number,
            maxIterations: number) {
        this.pixelHeight = pixelHeight;
        this.pixelWidth = pixelWidth;
        this.centerX = centerX;
        this.centerY = centerY;
        this.width = width;
        this.maxIterations = maxIterations;
        if (this.maxIterations < 1) {
            throw new Error("Invalid number of max iterations: " + this.maxIterations);
        }

        this.increment = width / pixelWidth;
    }

    calculateEscapeDepth(p: Position): number {
        let c = 0.0;
        let cSquared = 0.0;
        let i = 0.0;
        let iSquared = 0.0;

        let iteration = 0;
        while (iteration < this.maxIterations && (cSquared + iSquared) <= 4.0) {
            let cNext = (c * c) - (i * i) + p.x;
            let iNext = (2.0 * c * i) + p.y;

            c = cNext;
            i = iNext;

            cSquared = c * c;
            iSquared = i * i;

            iteration++;
        }

        return iteration;
    }

    determinePosition(x: number, y: number): Position {
        let xPos = (this.centerX - (this.width / 2)) + (x * this.increment);
        let yPos = (this.centerY + (this.pixelHeight * this.increment / 2)) - (y * this.increment);

        return new Position(xPos, yPos);
    }
}