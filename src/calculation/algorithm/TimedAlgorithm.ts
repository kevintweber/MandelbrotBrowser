import { Algorithm } from "./Algorithm";

export class TimedAlgorithm implements Algorithm {

    private readonly algorithm: Algorithm;
    milliseconds: number;

    constructor(algorithm: Algorithm) {
        this.algorithm = algorithm;
        this.milliseconds = 0;
    }

    draw(onSuccessCallback: () => void) {
        let startTime = (new Date).getTime();
        let timedSuccessCallback = () => {
            let stopTime = (new Date).getTime();
            this.milliseconds = stopTime - startTime;

            onSuccessCallback();
        }

        this.algorithm.draw(timedSuccessCallback);
    }
}