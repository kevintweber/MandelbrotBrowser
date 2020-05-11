import humanReadable from "./HumanReadable";
import { Image } from "../calculation/Image";

export function preDrawUpdate(image: Image) {
    console.log("Pre-draw update");

    // Handle max-iterations
    let maxIterationsSpan = document.getElementById("max-iterations");
    maxIterationsSpan.textContent = image.maxIterations.toString();

    // Handle reset
    let resetButton = document.getElementById("reset");
    resetButton.onclick = () => {
        window.location.search = "";
    }

    // Handle enlarge
    let enlargeButton = document.getElementById("enlarge");
    enlargeButton.onclick = () => {
        window.location.search = "algorithm=" + enlargeButton.getAttribute("data-algorithm") + "&center=" +
                parseFloat(enlargeButton.getAttribute("data-xcenter")) + "," +
                parseFloat(enlargeButton.getAttribute("data-ycenter")) + "&width=" +
                parseFloat(enlargeButton.getAttribute("data-width"));
    }

    // Handle magnification
    let magnificationSpan = document.getElementById("magnification");
    const magnification = 5.0 / image.coordinates.width;
    let magnificationText;
    if (magnification < 1000000) {
        magnificationText = Math.floor(magnification);
    } else {
        magnificationText = magnification.toExponential(3);
    }

    magnificationSpan.textContent = magnificationText;
}

export function updateRenderStatistics(image: Image) {
    console.log("Updating render statistics");

    // Rendering time.
    let renderingTimeSpan = document.getElementById("rendering-time");
    renderingTimeSpan.textContent = (image.getRenderingTime() / 1000).toPrecision(2) + " sec.";

    // Pixels / second
    let pixelsPerSecondSpan = document.getElementById("pixels-per-second");
    pixelsPerSecondSpan.textContent = humanReadable(
            1000 * image.coordinates.pixelWidth * image.coordinates.pixelHeight / image.getRenderingTime()
    );
}
