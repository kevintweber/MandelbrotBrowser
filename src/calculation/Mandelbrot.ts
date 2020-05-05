/**
 * The primary class for Mandelbrot set calculations.
 */
export class Mandelbrot {

    readonly maxIterations: number;

    constructor(maxIterations: number) {
        this.maxIterations = maxIterations;
        if (this.maxIterations < 1) {
            throw new Error("Invalid number of max iterations: " + this.maxIterations);
        }
    }

    calculateEscapeDepth(xCoordinate: number, yCoordinate: number): number {
        let c = 0.0;
        let cSquared = 0.0;
        let i = 0.0;
        let iSquared = 0.0;

        let iteration = 0;
        while (iteration < this.maxIterations && (cSquared + iSquared) <= 4.0) {
            let cNext = (c * c) - (i * i) + xCoordinate;
            let iNext = (2.0 * c * i) + yCoordinate;

            c = cNext;
            i = iNext;

            cSquared = c * c;
            iSquared = i * i;

            iteration++;
        }

        return iteration;
    }
}