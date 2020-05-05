export class Coordinates {

    readonly pixelHeight: number;
    readonly pixelWidth: number;
    readonly centerX: number;
    readonly centerY: number;
    readonly width: number;
    private readonly increment: number;

    constructor(
            pixelHeight: number,
            pixelWidth: number,
            centerX: number,
            centerY: number,
            width: number) {
        this.pixelHeight = pixelHeight;
        this.pixelWidth = pixelWidth;
        this.centerX = centerX;
        this.centerY = centerY;
        this.width = width;
        this.increment = width / pixelWidth;
    }

    getXCoordinate(xPosition: number): number {
        return (this.centerX - (this.width / 2)) + (xPosition * this.increment);
    }

    getYCoordinate(yPosition: number): number {
        return (this.centerY + (this.pixelHeight * this.increment / 2)) - (yPosition * this.increment);
    }
}