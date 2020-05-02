import { Algorithm } from "./Algorithm";

export class TimedAlgorithm implements Algorithm {

    private readonly algorithm: Algorithm;
    milliseconds: number;

    constructor(algorithm: Algorithm) {
        this.algorithm = algorithm;
        this.milliseconds = 0;
    }

    draw(ctx: CanvasRenderingContext2D) {
        let startTime = (new Date).getTime();
        this.algorithm.draw(ctx);
        let stopTime = (new Date).getTime();

        this.milliseconds = stopTime - startTime;
    }
}