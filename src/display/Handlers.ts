import { Image } from "../calculation/Image";

export function registerCanvasDoubleClick(
        canvas: HTMLCanvasElement,
        image: Image) {
    canvas.ondblclick = function (e) {
        const xJulia = image.coordinates.getXCoordinate(e.clientX);
        const yJulia = image.coordinates.getYCoordinate(e.clientY);
        window.open("index.html?set=Julia&center=0,0&julia=" + xJulia + "," + yJulia, "_blank");
    }
}

export function registerSelectionBoxHandlers(
        canvas: HTMLCanvasElement,
        image: Image) {
    const selectionCtx = canvas.getContext("2d");
    let selectionBox = null;

    canvas.onmousedown = function (e) {
        if (selectionBox === null) {
            console.log("Starting selection box at:", e.clientX, e.clientY);
            selectionBox = [ e.clientX, e.clientY, null, null ];
        }
    }

    const coordinatesSpan = document.getElementById("coordinates");
    const depthSpan = document.getElementById("depth");
    canvas.onmousemove = (e) => {
        if (selectionBox !== null) {
            selectionCtx.clearRect(
                    0,
                    0,
                    window.innerWidth,
                    window.innerHeight
            );

            selectionCtx.lineWidth = 1;
            selectionCtx.strokeStyle = "#F8F8F8";
            selectionBox[2] = e.clientX;
            selectionBox[3] = e.clientY;

            selectionCtx.strokeRect(
                    selectionBox[0],
                    selectionBox[1],
                    selectionBox[2] - selectionBox[0],
                    selectionBox[3] - selectionBox[1]
            );
        }

        const precision = Math.max(6, Math.floor(3 + Math.log10(5 / image.coordinates.width)));
        coordinatesSpan.textContent = image.coordinates.getXCoordinate(e.clientX).toFixed(precision) + " + " +
                image.coordinates.getYCoordinate(e.clientY).toFixed(precision) + "i";
        depthSpan.textContent = image.calculateEscapeDepth(e.clientX, e.clientY).toString();
    }

    const enlargeButton = document.getElementById("enlarge");
    canvas.onmouseup = (e) => {
        console.log("Stopping selection box at:", e.clientX, e.clientY);

        const xCoordinateStart = image.coordinates.getXCoordinate(Math.min(selectionBox[0], selectionBox[2]));
        const yCoordinateStart = image.coordinates.getYCoordinate(Math.min(selectionBox[1], selectionBox[3]));

        const xCoordinateStop = image.coordinates.getXCoordinate(Math.max(selectionBox[0], selectionBox[2]));
        const yCoordinateStop = image.coordinates.getYCoordinate(Math.max(selectionBox[1], selectionBox[3]));

        enlargeButton.setAttribute("data-width", (xCoordinateStop - xCoordinateStart).toString());
        enlargeButton.setAttribute("data-xcenter", ((xCoordinateStart + xCoordinateStop) / 2).toString());
        enlargeButton.setAttribute("data-ycenter", ((yCoordinateStart + yCoordinateStop) / 2).toString());

        selectionBox = null;
    }
}

export function registerAlgorithmSelect() {
    const enlargeInput = document.getElementById("enlarge");
    const algorithmSelect = document.getElementById("algorithm");
    algorithmSelect.onchange = function (e) {
        const target = e.target as HTMLSelectElement
        enlargeInput.setAttribute("data-algorithm", target[target.selectedIndex].getAttribute("value"));
    }
}