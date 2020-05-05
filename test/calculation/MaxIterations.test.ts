import maxIterations from "../../src/calculation/MaxIterations";

describe("maxIterations", () => {
    it("Calculate maximum number of iterations", () => {
        let maxIter1 = maxIterations(1);
        expect(maxIter1).toStrictEqual(100);

        let maxIter2 = maxIterations(0.1);
        expect(maxIter2).toStrictEqual(200);

        let maxIter3 = maxIterations(0.01);
        expect(maxIter3).toStrictEqual(800);

        let maxIter4 = maxIterations(0.001);
        expect(maxIter4).toStrictEqual(1800);

        let maxIter5 = maxIterations(0.0001);
        expect(maxIter5).toStrictEqual(3200);
    });
});