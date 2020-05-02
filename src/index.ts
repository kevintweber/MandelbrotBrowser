import createTimedAlgorithm from "./calculation/algorithm/AlgorithmFactory";
import determineMaxIterations from "./calculation/MaxIterations";
import humanReadable from "./display/HumanReadable";
import { AlgorithmType } from "./calculation/algorithm/AlgorithmType";
import { Mandelbrot } from "./calculation/Mandelbrot";
import { Rgb1 } from "./display/coloring/Rgb1";
import { ParameterHandler } from "./display/ParameterHandler";

let parameterHandler = new ParameterHandler();
parameterHandler.parseQueryParameters();

// Determine and display max iterations.
let maxIterations = determineMaxIterations(parameterHandler.width);
let maxIterationsSpan = document.getElementById("max-iterations");
maxIterationsSpan.textContent = maxIterations.toString();

// Draw Mandelbrot set
let canvas = <HTMLCanvasElement>document.getElementById("mandelbrot");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let ctx = canvas.getContext("2d");
let mandelbrot = new Mandelbrot(
        canvas.height,
        canvas.width,
        parameterHandler.centerX,
        parameterHandler.centerY,
        parameterHandler.width,
        maxIterations
);
console.log(mandelbrot);

let coloring = new Rgb1(maxIterations, 140);
let algorithm = createTimedAlgorithm(AlgorithmType.LineByLine, coloring, mandelbrot);
algorithm.draw(ctx);

// Handle position reporting.
let coordinatesSpan = document.getElementById("coordinates");
let depthSpan = document.getElementById("depth");
canvas.onmousemove = function (e) {
    let position = mandelbrot.determinePosition(e.clientX, e.clientY);
    coordinatesSpan.textContent = position.x.toPrecision(5) + " + " +
            position.y.toPrecision(5) + "i";
    depthSpan.textContent = mandelbrot.calculateEscapeDepth(position).toString();
}

let renderingTimeSpan = document.getElementById("rendering-time");
renderingTimeSpan.textContent = ((algorithm.milliseconds) / 1000).toPrecision(3);
let pixelsPerSecondSpan = document.getElementById("pixels-per-second");
pixelsPerSecondSpan.textContent = humanReadable(canvas.width * canvas.height / ((algorithm.milliseconds) / 1000));

// Handle reset
let resetButton = document.getElementById("reset");
resetButton.onclick = function () {
    window.location.pathname = window.location.href.split("?")[0];
}
