import { Coloring } from "./Coloring";
import hslToRgb from "../HslToRgb";

export class Rgb1 implements Coloring {

    private readonly maxIterations: number;
    private readonly cycle: number;
    private readonly offset: number;

    constructor(
            maxIterations: number,
            cycle: number,
            offset: number) {
        this.maxIterations = maxIterations;
        this.cycle = cycle;
        this.offset = offset;
    }

    getColor(depth: number): number[] {
        if (depth == this.maxIterations) {
            return [ 0, 0, 0 ];
        }

        let color = hslToRgb(((depth + this.offset) % this.cycle) / this.cycle, 1, 0.5);
        color.push(255);

        return color;
    }

}