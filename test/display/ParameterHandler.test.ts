/**
 * @jest-environment jsdom
 */
import { ParameterHandler } from "../../src/display/ParameterHandler";
import { SetType } from "../../src/calculation/engine/SetType";
import { AlgorithmType } from "../../src/calculation/algorithm/AlgorithmType";

describe("ParameterHandler", () => {
    it("defaults", () => {
        const parameterHandler = new ParameterHandler(
                document.createElement('select'),
                document.createElement('div'),
                document.createElement('div')
        );

        expect(parameterHandler.width)
                .toStrictEqual(5);
    });

    it("parseQueryParameters", () => {
        const parameterHandler = new ParameterHandler(
                document.createElement('select'),
                document.createElement('div'),
                document.createElement('div')
        );

        parameterHandler.parseQueryParameters("set=Mandelbrot&algorithm=LineByLine&center=-0.5429687500000002,0.6471354166666666&width=0.2630208333333335");
        expect(parameterHandler.set)
                .toStrictEqual(SetType.Mandelbrot);
        expect(parameterHandler.algorithm)
                .toStrictEqual(AlgorithmType.LineByLine);
        expect(parameterHandler.centerX)
                .toStrictEqual(-0.5429687500000002);
        expect(parameterHandler.centerY)
                .toStrictEqual(0.6471354166666666);
        expect(parameterHandler.width)
                .toStrictEqual(0.2630208333333335);
    });
});