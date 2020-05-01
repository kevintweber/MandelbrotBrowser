import { Mandelbrot } from "./calculation/Mandelbrot";
import determineMaxIterations from "./calculation/MaxIterations";
import humanReadable from "./display/HumanReadable";

// Handle url queries
let centerX = -0.5;
let centerY = 0;
let width = 5;
let queryParameters = window.location.search.replace("?", "").split("&");
console.log("Query parameters", queryParameters);

for (let i = 0; i < queryParameters.length; i++) {
    let queryParts = queryParameters[i].split("=");
    let value = queryParts[1];
    switch (queryParts[0]) {
        case "center":
            let coordinates = value.split(",");
            centerX = parseFloat(coordinates[0]);
            centerY = parseFloat(coordinates[1]);
            break;

        case "width":
            width = parseFloat(value);
            break;
    }
}

// Determine and display max iterations.
let maxIterations = determineMaxIterations(width);
let maxIterationsSpan = document.getElementById("max-iterations");
maxIterationsSpan.textContent = maxIterations.toString();

// Draw Mandelbrot set
let canvas = <HTMLCanvasElement>document.getElementById("mandelbrot");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let ctx = canvas.getContext("2d");
let img = ctx.createImageData(canvas.width, 1);
let mandelbrot = new Mandelbrot(canvas.height, canvas.width, centerX, centerY, width, maxIterations);
console.log(mandelbrot);

let startTime = (new Date).getTime();
for (let y = 0; y < mandelbrot.pixelHeight; y++) {
    mandelbrot.drawLine(img, y);
    ctx.putImageData(img, 0, y);
}
let completionTime = (new Date).getTime();

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
renderingTimeSpan.textContent = ((completionTime - startTime) / 1000).toPrecision(3);
let pixelsPerSecondSpan = document.getElementById("pixels-per-second");
pixelsPerSecondSpan.textContent = humanReadable(canvas.width * canvas.height / ((completionTime - startTime) / 1000));

// Handle reset
let resetButton = document.getElementById("reset");
resetButton.onclick = function (e) {
    window.location.pathname = window.location.href.split("?")[0];
}
