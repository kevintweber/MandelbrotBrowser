import hslToRgb from "../../src/display/HslToRgb";

describe("hslToRgb", () => {
    it("HSL to RGB conversion", () => {
        const black = hslToRgb(0, 0, 0);
        expect(black).toStrictEqual([ 0, 0, 0 ]);

        const white = hslToRgb(0, 0, 1);
        expect(white).toStrictEqual([ 255, 255, 255 ]);

        const grey = hslToRgb(128, 0, 0.5);
        expect(grey).toStrictEqual([ 128, 128, 128 ]);

        const red = hslToRgb(0, 1, 0.5);
        expect(red).toStrictEqual([ 255, 0, 0 ]);

        const green = hslToRgb(120 / 360, 1, 0.5);
        expect(green).toStrictEqual([ 0, 255, 0 ]);

        const blue = hslToRgb(240 / 360, 1, 0.5);
        expect(blue).toStrictEqual([ 0, 0, 255 ]);

        const color = hslToRgb(0.4, 0.6, 0.4);
        expect(color).toStrictEqual([ 41, 163, 90 ]);
    })
});