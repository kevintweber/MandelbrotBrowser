import { ParameterHandler } from "../display/ParameterHandler";
import { SetType } from "./engine/SetType";

export default function determineMaxIterations(parameterHandler: ParameterHandler): number {
    if (parameterHandler.set === SetType.Julia) {
        return 2000;
    }

    let logWidth = Math.log(5.0 / parameterHandler.width);
    let iterations = Math.floor(logWidth * logWidth * 30);

    return Math.max(iterations, 150);
}