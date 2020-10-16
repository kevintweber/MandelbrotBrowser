import { ColorScheme } from "./ColorScheme";
import hslToRgb from "../HslToRgb";

export class Hsl implements ColorScheme {

    private readonly maxIterations: number;
    private readonly cycleLength: number;
    private readonly hueOffset: number;
    private readonly saturation: number;
    private readonly luminosity: number;

    constructor(
            maxIterations: number,
            cycleLength: number,
            hueOffset: number,
            saturation: number,
            luminosity: number) {
        this.maxIterations = maxIterations;
        this.cycleLength = cycleLength;
        this.hueOffset = hueOffset;
        this.saturation = saturation;
        this.luminosity = luminosity;
    }

    getColor(depth: number): number[] {
        if (depth >= this.maxIterations) {
            return [ 0, 0, 0, 255 ];
        }

        let color = hslToRgb(
                ((depth + this.hueOffset) % this.cycleLength) / this.cycleLength,
                this.saturation,
                this.luminosity
        );
        color.push(255);

        return color;
    }

    toString(): string {
        return "Hsl[" +
                "cycleLength=" + this.cycleLength + ";" +
                "hueOffset=" + this.hueOffset + ";" +
                "]";
    }
}