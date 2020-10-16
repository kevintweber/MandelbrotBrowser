import maxIterations from "../../src/calculation/MaxIterations";
import { ParameterHandler } from "../../src/display/ParameterHandler";
import { SetType } from "../../src/calculation/engine/SetType";

describe("maxIterations", () => {
    it("Calculate maximum number of iterations", () => {
        const parameterHandler1 = new ParameterHandler();
        parameterHandler1.width = 1;
        parameterHandler1.set = SetType.Mandelbrot;
        const maxIter1 = maxIterations(parameterHandler1);
        expect(maxIter1).toStrictEqual(150);

        const parameterHandler2 = new ParameterHandler();
        parameterHandler2.width = 0.1;
        parameterHandler2.set = SetType.Mandelbrot;
        const maxIter2 = maxIterations(parameterHandler2);
        expect(maxIter2).toStrictEqual(459);

        const parameterHandler3 = new ParameterHandler();
        parameterHandler3.width = 0.01;
        parameterHandler3.set = SetType.Mandelbrot;
        const maxIter3 = maxIterations(parameterHandler3);
        expect(maxIter3).toStrictEqual(1158);

        const parameterHandler4 = new ParameterHandler();
        parameterHandler4.width = 0.001;
        parameterHandler4.set = SetType.Mandelbrot;
        const maxIter4 = maxIterations(parameterHandler4);
        expect(maxIter4).toStrictEqual(2176);

        const parameterHandler5 = new ParameterHandler();
        parameterHandler5.width = 0.0001;
        parameterHandler5.set = SetType.Mandelbrot;
        const maxIter5 = maxIterations(parameterHandler5);
        expect(maxIter5).toStrictEqual(3512);
    });
});