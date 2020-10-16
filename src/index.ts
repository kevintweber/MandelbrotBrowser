import createImage from "./calculation/ImageFactory";
import { registerAlgorithmSelect, registerCanvasDoubleClick, registerSelectionBoxHandlers } from "./display/Handlers";
import { ColorSchemeType } from "./display/colorscheme/ColorSchemeType";
import { ParameterHandler } from "./display/ParameterHandler";

// Initialize the canvas.
const imageCanvas = <HTMLCanvasElement>document.getElementById("mandelbrot");
imageCanvas.height = window.innerHeight;
imageCanvas.width = window.innerWidth;
const selectionCanvas = <HTMLCanvasElement>document.getElementById("selection");
selectionCanvas.height = window.innerHeight;
selectionCanvas.width = window.innerWidth;

// Handle parameters
const parameterHandler = new ParameterHandler(
        <HTMLSelectElement>document.getElementById("algorithm"),
        document.getElementById("enlarge"),
        document.getElementById("title")
);
parameterHandler.parseQueryParameters(window.location.search);

// Build the image.
const image = createImage(
        ColorSchemeType.RGB,
        imageCanvas,
        parameterHandler
);
registerCanvasDoubleClick(selectionCanvas, image)
registerSelectionBoxHandlers(selectionCanvas, image);
registerAlgorithmSelect();
image.generate();
