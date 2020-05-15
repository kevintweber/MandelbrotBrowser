import { SetType } from "./SetType";
import { Mandelbrot } from "./Mandelbrot";
import { ParameterHandler } from "../../display/ParameterHandler";
import { Julia } from "./Julia";

export default function createEngine(
        setType: SetType,
        maxIterations: number,
        parameterHandler: ParameterHandler) {
    if (setType === SetType.Mandelbrot) {
        return new Mandelbrot(maxIterations);
    }

    return new Julia(
            parameterHandler.juliaX,
            parameterHandler.juliaY,
            maxIterations
    )
}