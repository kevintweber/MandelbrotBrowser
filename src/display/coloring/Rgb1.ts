import { Coloring } from "./Coloring";
import hslToRgb from "../HslToRgb";

export class Rgb1 implements Coloring {

    private readonly maxIterations: number;
    private readonly offset: number;

    constructor(
            maxIterations: number,
            offset: number) {
        this.maxIterations = maxIterations;
        this.offset = offset;
    }

    getColor(depth: number): number[] {
        if (depth == this.maxIterations) {
            return [ 0, 0, 0 ];
        }

        let color = hslToRgb(((depth + this.offset) % 255) / 255, 1, 0.5);
        color.push(255);

        return color;
    }

}