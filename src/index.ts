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

// Initialize the canvas.
let canvas = <HTMLCanvasElement>document.getElementById("mandelbrot");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let selectionCanvas = <HTMLCanvasElement>document.getElementById("selection");
selectionCanvas.height = window.innerHeight;
selectionCanvas.width = window.innerWidth;
let resetButton = document.getElementById("reset");
let enlargeButton = document.getElementById("enlarge");

// Draw Mandelbrot set
let mandelbrotCtx = canvas.getContext("2d");
let mandelbrot = new Mandelbrot(
        canvas.height,
        canvas.width,
        parameterHandler.centerX,
        parameterHandler.centerY,
        parameterHandler.width,
        maxIterations
);
console.log(mandelbrot);

let coloring = new Rgb1(maxIterations, 200, 120);
let algorithm = createTimedAlgorithm(AlgorithmType.LineByLine, coloring, mandelbrot);
algorithm.draw(mandelbrotCtx);

let renderingTimeSpan = document.getElementById("rendering-time");
renderingTimeSpan.textContent = ((algorithm.milliseconds) / 1000).toPrecision(3);
let pixelsPerSecondSpan = document.getElementById("pixels-per-second");
pixelsPerSecondSpan.textContent = humanReadable(canvas.width * canvas.height / ((algorithm.milliseconds) / 1000));

// Handle selection box
let selectionCtx = selectionCanvas.getContext("2d");
let selectionBox = null;
selectionCanvas.onmousedown = function (e) {
    if (selectionBox === null) {
        console.log(window.location);
        console.log("Starting selection box at:", e.clientX, e.clientY);
        selectionBox = [ e.clientX, e.clientY, null, null ];
    }
}

let coordinatesSpan = document.getElementById("coordinates");
let depthSpan = document.getElementById("depth");
selectionCanvas.onmousemove = function (e) {
    if (selectionBox !== null) {
        selectionCtx.clearRect(
                0,
                0,
                window.innerWidth,
                window.innerHeight
        );

        selectionCtx.lineWidth = 1;
        selectionCtx.strokeStyle = "#EEEEEE";
        selectionBox[2] = e.clientX;
        selectionBox[3] = e.clientY;

        selectionCtx.strokeRect(
                selectionBox[0],
                selectionBox[1],
                selectionBox[2] - selectionBox[0],
                selectionBox[3] - selectionBox[1]
        );
    }

    let position = mandelbrot.determinePosition(e.clientX, e.clientY);
    coordinatesSpan.textContent = position.x.toPrecision(5) + " + " +
            position.y.toPrecision(5) + "i";
    depthSpan.textContent = mandelbrot.calculateEscapeDepth(position).toString();
}
selectionCanvas.onmouseup = function (e) {
    console.log("Stopping selection box at:", e.clientX, e.clientY);
    let positionStart = mandelbrot.determinePosition(Math.min(selectionBox[0], selectionBox[2]), Math.min(selectionBox[1], selectionBox[3]));
    let positionStop = mandelbrot.determinePosition(Math.max(selectionBox[0], selectionBox[2]), Math.max(selectionBox[1], selectionBox[3]));
    enlargeButton.setAttribute("data-width", (positionStop.x - positionStart.x).toString());
    enlargeButton.setAttribute("data-xcenter", ((positionStart.x + positionStop.x) / 2).toString());
    enlargeButton.setAttribute("data-ycenter", ((positionStart.y + positionStop.y) / 2).toString());
    selectionBox = null;
}

// Handle reset
resetButton.onclick = function () {
    window.location.search = "";
}

// Handle enlarge
enlargeButton.onclick = function () {
    window.location.search = "center=" +
            parseFloat(enlargeButton.getAttribute("data-xcenter")) + "," +
            parseFloat(enlargeButton.getAttribute("data-ycenter")) + "&width=" +
            parseFloat(enlargeButton.getAttribute("data-width"));
}
