import { ColorScheme } from "./ColorScheme";

export class Greyscale implements ColorScheme {

    private readonly maxIterations: number;
    private readonly cycleLength: number;
    private readonly offset: number;

    constructor(
            maxIterations: number,
            cycleLength: number,
            offset: number) {
        this.maxIterations = maxIterations;
        this.cycleLength = cycleLength;
        this.offset = offset;
    }

    getColor(depth: number): number[] {
        if (depth >= this.maxIterations) {
            return [ 0, 0, 0, 255 ];
        }

        let cycle = Math.abs(((depth + this.offset) % (this.cycleLength * 2) / this.cycleLength) - 1);
        let color = Math.floor(cycle * 200) + 35;

        return [ color, color, color, 255 ];
    }
}