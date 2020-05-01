import { Position } from "./Position";

/**
 * The primary class for Mandelbrot set calculations.
 */
export class Mandelbrot {

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
            maxIterations: number) {
        this.pixelHeight = pixelHeight;
        this.pixelWidth = pixelWidth;
        this.centerX = centerX;
        this.centerY = centerY;
        this.width = width;
        this.maxIterations = maxIterations;
        if (this.maxIterations < 1) {
            throw new Error("Invalid number of max iterations: " + this.maxIterations);
        }

        this.increment = width / pixelWidth;
    }

    calculateEscapeDepth(p: Position): number {
        let c = 0.0;
        let cSquared = 0.0;
        let i = 0.0;
        let iSquared = 0.0;

        let iteration = 0;
        while (iteration < this.maxIterations && (cSquared + iSquared) <= 4.0) {
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

    drawLine(img: ImageData, y: number) {
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