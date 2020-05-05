import { postDrawUpdate, preDrawUpdate } from "../display/RenderUpdates";
import { Mandelbrot } from "./Mandelbrot";
import { TimedAlgorithm } from "./algorithm/TimedAlgorithm";
import { Coordinates } from "./Coordinates";

export class Image {

    private readonly algorithm: TimedAlgorithm;
    readonly coordinates: Coordinates;
    private readonly engine: Mandelbrot;
    readonly maxIterations: number;

    constructor(
            algorithm: TimedAlgorithm,
            coordinates: Coordinates,
            engine: Mandelbrot,
            maxIterations: number) {
        this.algorithm = algorithm;
        this.coordinates = coordinates;
        this.engine = engine;
        this.maxIterations = maxIterations;
    }

    calculateEscapeDepth(xPosition: number, yPosition: number): number {
        return this.engine.calculateEscapeDepth(
                this.coordinates.getXCoordinate(xPosition),
                this.coordinates.getYCoordinate(yPosition)
        );
    }

    generate() {
        preDrawUpdate(this);
        this.algorithm.draw(() => {
            postDrawUpdate(this);
        });
    }

    getRenderingTime(): number {
        return this.algorithm.milliseconds;
    }
}