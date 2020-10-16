import createColorScheme from "../display/colorscheme/ColorSchemeFactory";
import createEngine from "./engine/EngineFactory";
import createTimedAlgorithm from "./algorithm/AlgorithmFactory";
import determineMaxIterations from "./MaxIterations";
import { ColorSchemeType } from "../display/colorscheme/ColorSchemeType";
import { Coordinates } from "./Coordinates";
import { Image } from "./Image";
import { ParameterHandler } from "../display/ParameterHandler";

export default function createImage(
        colorSchemeType: ColorSchemeType,
        canvas: HTMLCanvasElement,
        parameterHandler: ParameterHandler): Image {
    const maxIterations = determineMaxIterations(parameterHandler);
    console.log("Max iterations: ", maxIterations);

    const colorScheme = createColorScheme(parameterHandler, colorSchemeType, maxIterations);
    console.log("Color scheme: ", colorScheme.toString());

    const coordinates = new Coordinates(
            canvas.height,
            canvas.width,
            parameterHandler.centerX,
            parameterHandler.centerY,
            parameterHandler.width
    );
    console.log("Coordinates: ", coordinates.toString());

    const engine = createEngine(
            parameterHandler.set,
            maxIterations,
            parameterHandler
    );
    console.log("Engine: ", engine.toString());

    const algorithm = createTimedAlgorithm(
            parameterHandler.algorithm,
            colorScheme,
            coordinates,
            canvas.getContext("2d"),
            engine
    );
    console.log("Algorithm: ", algorithm.toString());

    return new Image(
            algorithm,
            coordinates,
            engine,
            maxIterations
    );
}
