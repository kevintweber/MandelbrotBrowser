import { AlgorithmType } from "./AlgorithmType";
import { Coloring } from "../../display/coloring/Coloring";
import { LineByLine } from "./LineByLine";
import { Mandelbrot } from "../Mandelbrot";
import { TimedAlgorithm } from "./TimedAlgorithm";

export default function createTimedAlgorithm(algorithmType: AlgorithmType, coloring: Coloring, mandelbrot: Mandelbrot): TimedAlgorithm {
    switch (algorithmType) {
        case AlgorithmType.LineByLine:
            let lineByLine = new LineByLine(coloring, mandelbrot);
            return new TimedAlgorithm(lineByLine);
    }
}