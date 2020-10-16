import { ColorSchemeType } from "./ColorSchemeType";
import { ColorScheme } from "./ColorScheme";
import { Hsl } from "./Hsl";
import { Greyscale } from "./Greyscale";
import { ParameterHandler } from "../ParameterHandler";
import { SetType } from "../../calculation/engine/SetType";
import { CachedColorScheme } from "./CachedColorScheme";

export default function createColorScheme(
        parameterHandler: ParameterHandler,
        colorSchemeType: ColorSchemeType,
        maxIterations: number): ColorScheme {
    if (parameterHandler.set === SetType.Julia) {
        colorSchemeType = ColorSchemeType.Julia;
    }

    let colorScheme;
    switch (colorSchemeType) {
        case ColorSchemeType.RGB:
            colorScheme = new Hsl(
                    maxIterations,
                    300,
                    150,
                    1,
                    0.5
            );
            break;

        case ColorSchemeType.Greyscale:
            colorScheme = new Greyscale(
                    maxIterations,
                    100,
                    50
            );
            break;

        case ColorSchemeType.Julia:
            colorScheme = new Hsl(
                    maxIterations,
                    100,
                    150,
                    1,
                    0.5
            );
            break;

        default:
            throw new Error("Invalid color scheme type: " + colorSchemeType);
    }

    return new CachedColorScheme(colorScheme);
}