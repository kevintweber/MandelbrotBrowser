import { AlgorithmType } from "./AlgorithmType";
import { ColorScheme } from "../../display/colorscheme/ColorScheme";
import { Coordinates } from "../Coordinates";
import { LineByLine } from "./LineByLine";
import { TimedAlgorithm } from "./TimedAlgorithm";
import { Blockwise } from "./Blockwise";
import { Engine } from "../engine/Engine";
import { Julia } from "../engine/Julia";

export default function createTimedAlgorithm(
        algorithmType: AlgorithmType,
        colorScheme: ColorScheme,
        coordinates: Coordinates,
        context: CanvasRenderingContext2D,
        engine: Engine): TimedAlgorithm {
    if (engine instanceof Julia) {
        return new TimedAlgorithm(
                new LineByLine(colorScheme, coordinates, context, engine)
        );
    }

    let algorithm;
    switch (algorithmType) {
        case AlgorithmType.LineByLine:
            algorithm = new LineByLine(colorScheme, coordinates, context, engine);
            break;

        case AlgorithmType.Blockwise:
            algorithm = new Blockwise(colorScheme, coordinates, context, engine);
            break;

        default:
            throw new Error("Invalid algorithm type: " + algorithmType);
    }

    return new TimedAlgorithm(algorithm);
}