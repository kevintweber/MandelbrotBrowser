import { Hsl } from "../../../src/display/colorscheme/Hsl";

describe("Hsl", () => {
    it("Hsl colorscheme", () => {
        const hsl1 = new Hsl(
                1000,
                100,
                0,
                1,
                0.5
        );
        const color1 = hsl1.getColor(100);
        expect(color1).toStrictEqual([255, 0, 0, 255]);

        const color2 = hsl1.getColor(200);
        expect(color2).toStrictEqual([255, 0, 0, 255]);

        const color3 = hsl1.getColor(150);
        expect(color3).toStrictEqual([0, 255, 255, 255]);
    });
});