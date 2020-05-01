class Position {
    readonly x: number;
    readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class Mandelbrot {

    readonly pixelHeight: number;
    readonly pixelWidth: number;
    readonly centerX: number;
    readonly centerY: number;
    readonly width: number;
    readonly maxIterations: number;
    readonly escapeSquared: number;
    readonly increment: number;

    constructor(
            pixelHeight: number,
            pixelWidth: number,
            centerX: number,
            centerY: number,
            width: number,
            maxIterations: number,
            escape: number) {
        this.pixelHeight = pixelHeight;
        this.pixelWidth = pixelWidth;
        this.centerX = centerX;
        this.centerY = centerY;
        this.width = width;
        this.maxIterations = maxIterations;
        if (this.maxIterations < 1) {
            throw new Error("Invalid number of max iterations: " + this.maxIterations);
        }

        this.escapeSquared = escape * escape;
        if (escape < 1.0) {
            throw new Error("Invalid escape value: " + escape);
        }

        this.increment = width / pixelWidth;
    }

    calculateEscapeDepth(p: Position): number {
        let c = 0.0;
        let cSquared = 0.0;
        let i = 0.0;
        let iSquared = 0.0;

        let iteration = 0;
        while (iteration < this.maxIterations && (cSquared + iSquared) <= this.escapeSquared) {
            let cNext = (c * c) - (i * i) + p.x;
            let iNext = (2.0 * c * i) + p.y;

            c = cNext;
            i = iNext;

            cSquared = c * c;
            iSquared = i * i;

            iteration++;
        }

        return iteration;
    }

    private determineColor(depth: number): number[] {
        if (depth == this.maxIterations) {
            return [ 0, 0, 0 ];
        }

        return this.hslToRgb(((depth + 140) % 255) / 255, 1, 0.5);
    }

    determinePosition(x: number, y: number): Position {
        let xPos = (this.centerX - (this.width / 2)) + (x * this.increment);
        let yPos = (this.centerY + (this.pixelHeight * this.increment / 2)) - (y * this.increment);

        return new Position(xPos, yPos);
    }

    drawLine(y: number) {
        let offset = 0;
        for (let x = 0; x < this.pixelWidth; x++) {
            let position = this.determinePosition(x, y);
            let depth = this.calculateEscapeDepth(position);
            let color = this.determineColor(depth);

            img.data[offset++] = color[0];
            img.data[offset++] = color[1];
            img.data[offset++] = color[2];
            img.data[offset++] = 255;
        }
    }

    private hslToRgb(h, s, l) {
        let r, g, b;

        if (s == 0) {
            r = g = b = l; // achromatic
        } else {
            var hue2rgb = function hue2rgb(p, q, t) {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;

                return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        return [ Math.round(r * 255), Math.round(g * 255), Math.round(b * 255) ];
    }
}

function determineMaxIterations(width: number): number {
    let iterations = 150 / width;

    return Math.floor(Math.max(iterations, 80));
}

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
let mandelbrot = new Mandelbrot(canvas.height, canvas.width, centerX, centerY, width, maxIterations, 2);
console.log(mandelbrot);

let startTime = (new Date).getTime();
for (let y = 0; y < mandelbrot.pixelHeight; y++) {
    mandelbrot.drawLine(y);
    ctx.putImageData(img, 0, y);
}
let completionTime = (new Date).getTime();

// Handle position reporting.
let xPositionSpan = document.getElementById("x-coordinate");
let yPositionSpan = document.getElementById("y-coordinate");
let depthSpan = document.getElementById("depth");
canvas.onmousemove = function (e) {
    let position = mandelbrot.determinePosition(e.clientX, e.clientY);
    xPositionSpan.textContent = position.x.toPrecision(5);
    yPositionSpan.textContent = position.y.toPrecision(5);
    depthSpan.textContent = mandelbrot.calculateEscapeDepth(position).toString();
}

// Handle performance stats
function makeHumanReadable(value: number): string {
    let unit = [ "", "k", "M", "B", "T" ];
    let magnitude = Math.ceil((1 + Math.log(value) / Math.log(10)) / 3);

    return (value / Math.pow(10, 3 * (magnitude - 1))).toFixed(3) + unit[magnitude - 1];
}

let renderingTimeSpan = document.getElementById("rendering-time");
renderingTimeSpan.textContent = ((completionTime - startTime) / 1000).toPrecision(3);
let pixelsPerSecondSpan = document.getElementById("pixels-per-second");
pixelsPerSecondSpan.textContent = makeHumanReadable(canvas.width * canvas.height / ((completionTime - startTime) / 1000));

// Handle reset
let resetButton = document.getElementById("reset");
resetButton.onclick = function (e) {
    location.reload();
}
