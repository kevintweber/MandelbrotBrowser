import createImage from "./calculation/ImageFactory";
import { registerAlgorithmSelect, registerSelectionBoxHandlers } from "./display/Handlers";
import { ColorSchemeType } from "./display/colorscheme/ColorSchemeType";
import { ParameterHandler } from "./display/ParameterHandler";

// Initialize the canvas.
let imageCanvas = <HTMLCanvasElement>document.getElementById("mandelbrot");
imageCanvas.height = window.innerHeight;
imageCanvas.width = window.innerWidth;
let selectionCanvas = <HTMLCanvasElement>document.getElementById("selection");
selectionCanvas.height = window.innerHeight;
selectionCanvas.width = window.innerWidth;

// Handle parameters
let parameterHandler = new ParameterHandler();
parameterHandler.parseQueryParameters(window.location.search);

// Build the image.
let image = createImage(
        ColorSchemeType.RGB,
        imageCanvas,
        parameterHandler
);
registerSelectionBoxHandlers(selectionCanvas, image);
registerAlgorithmSelect();
image.generate();
