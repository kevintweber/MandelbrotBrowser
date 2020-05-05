import { AlgorithmType } from "./AlgorithmType";
import { ColorScheme } from "../../display/colorscheme/ColorScheme";
import { Coordinates } from "../Coordinates";
import { LineByLine } from "./LineByLine";
import { Mandelbrot } from "../Mandelbrot";
import { TimedAlgorithm } from "./TimedAlgorithm";

export default function createTimedAlgorithm(
        algorithmType: AlgorithmType,
        coloring: ColorScheme,
        coordinates: Coordinates,
        context: CanvasRenderingContext2D,
        engine: Mandelbrot): TimedAlgorithm {
    switch (algorithmType) {
        case AlgorithmType.LineByLine:
            let lineByLine = new LineByLine(coloring, coordinates, context, engine);
            return new TimedAlgorithm(lineByLine);
    }

    throw new Error("Invalid algorithm type: " + algorithmType)
}