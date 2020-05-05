import { ColorSchemeType } from "./ColorSchemeType";
import { ColorScheme } from "./ColorScheme";
import { Hsl } from "./Hsl";
import { Greyscale } from "./Greyscale";

export default function createColorScheme(colorSchemeType: ColorSchemeType, maxIterations: number): ColorScheme {
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
    }

    throw new Error("Invalid color scheme type: " + colorSchemeType);
}