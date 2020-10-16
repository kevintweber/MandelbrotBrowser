import { ParameterHandler } from "../display/ParameterHandler";
import { SetType } from "./engine/SetType";

export default function determineMaxIterations(parameterHandler: ParameterHandler): number {
    let logWidth = Math.log(5.0 / parameterHandler.width);
    let iterations = Math.floor(logWidth * logWidth * 30);

    if (parameterHandler.set === SetType.Julia) {
        return Math.max(iterations, 4000);
    }

    return Math.max(iterations, 150);
}