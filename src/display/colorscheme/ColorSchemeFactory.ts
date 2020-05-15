import { ColorSchemeType } from "./ColorSchemeType";
import { ColorScheme } from "./ColorScheme";
import { Hsl } from "./Hsl";
import { Greyscale } from "./Greyscale";
import { ParameterHandler } from "../ParameterHandler";
import { SetType } from "../../calculation/engine/SetType";

export default function createColorScheme(
        parameterHandler: ParameterHandler,
        colorSchemeType: ColorSchemeType,
        maxIterations: number): ColorScheme {
    if (parameterHandler.set === SetType.Julia) {
        colorSchemeType = ColorSchemeType.Julia;
    }

    switch (colorSchemeType) {
        case ColorSchemeType.RGB:
            return new Hsl(
                    maxIterations,
                    300,
                    150,
                    1,
                    0.5
            );

        case ColorSchemeType.Greyscale:
            return new Greyscale(
                    maxIterations,
                    100,
                    50
            );

        case ColorSchemeType.Julia:
            return new Hsl(
                    maxIterations,
                    100,
                    150,
                    1,
                    0.5
            );
    }

    throw new Error("Invalid color scheme type: " + colorSchemeType);
}