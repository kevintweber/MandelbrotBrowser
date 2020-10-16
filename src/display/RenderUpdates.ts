import humanReadable from "./HumanReadable";
import { Image } from "../calculation/Image";
import { Julia } from "../calculation/engine/Julia";

export function preDrawUpdate(image: Image) {
    console.log("Pre-draw update");

    // Handle max-iterations
    const maxIterationsSpan = document.getElementById("max-iterations");
    maxIterationsSpan.textContent = image.maxIterations.toString();

    // Handle reset
    const resetButton = document.getElementById("reset");
    resetButton.onclick = () => {
        window.location.search = "";
    }

    // Handle enlarge
    const enlargeButton = document.getElementById("enlarge");
    enlargeButton.onclick = () => {
        if (image.engine instanceof Julia) {
            window.location.search = "set=Julia&algorithm=LineByLine&center=" + parseFloat(enlargeButton.getAttribute("data-xcenter")) + "," +
                    parseFloat(enlargeButton.getAttribute("data-ycenter")) +
                    "&width=" + parseFloat(enlargeButton.getAttribute("data-width")) +
                    "&julia=" + enlargeButton.getAttribute("data-julia");

            return;
        }

        window.location.search = "set=" + enlargeButton.getAttribute("data-set") +
                "&algorithm=" + enlargeButton.getAttribute("data-algorithm") +
                "&center=" + parseFloat(enlargeButton.getAttribute("data-xcenter")) + "," +
                parseFloat(enlargeButton.getAttribute("data-ycenter")) +
                "&width=" + parseFloat(enlargeButton.getAttribute("data-width"));
    }

    // Handle magnification
    const magnificationSpan = document.getElementById("magnification");
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
    const renderingTimeSpan = document.getElementById("rendering-time");
    renderingTimeSpan.textContent = (image.getRenderingTime() / 1000).toPrecision(2) + " sec.";

    // Pixels / second
    const pixelsPerSecondSpan = document.getElementById("pixels-per-second");
    pixelsPerSecondSpan.textContent = humanReadable(
            1000 * image.coordinates.pixelWidth * image.coordinates.pixelHeight / image.getRenderingTime()
    );
}
