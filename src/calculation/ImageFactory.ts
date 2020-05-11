import createColorScheme from "../display/colorscheme/ColorSchemeFactory";
import createTimedAlgorithm from "./algorithm/AlgorithmFactory";
import determineMaxIterations from "./MaxIterations";
import { ColorSchemeType } from "../display/colorscheme/ColorSchemeType";
import { Coordinates } from "./Coordinates";
import { Image } from "./Image";
import { Mandelbrot } from "./Mandelbrot";
import { ParameterHandler } from "../display/ParameterHandler";

export default function createImage(
        colorSchemeType: ColorSchemeType,
        canvas: HTMLCanvasElement,
        parameterHandler: ParameterHandler): Image {
    let maxIterations = determineMaxIterations(parameterHandler.width);
    console.log("Max iterations: ", maxIterations);

    let colorScheme = createColorScheme(colorSchemeType, maxIterations);
    console.log("Color scheme: ", colorScheme);

    let coordinates = new Coordinates(
            canvas.height,
            canvas.width,
            parameterHandler.centerX,
            parameterHandler.centerY,
            parameterHandler.width
    );
    console.log("Coordinates: ", coordinates);

    let engine = new Mandelbrot(maxIterations);
    console.log("Engine: ", engine);

    let algorithm = createTimedAlgorithm(
            parameterHandler.algorithm,
            colorScheme,
            coordinates,
            canvas.getContext("2d"),
            engine
    );
    console.log("Algorithm: ", algorithm);

    return new Image(
            algorithm,
            coordinates,
            engine,
            maxIterations
    );
}
