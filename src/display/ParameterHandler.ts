import { AlgorithmType } from "../calculation/algorithm/AlgorithmType";
import { SetType } from "../calculation/engine/SetType";

export class ParameterHandler {

    algorithm: AlgorithmType = AlgorithmType["LineByLine"];
    set: SetType = SetType["Mandelbrot"];
    centerX: number = -0.5;
    centerY: number = 0;
    juliaX: number = 0;
    juliaY: number = 0;
    width: number = 5;

    private readonly algorithmSelectElement: HTMLSelectElement;
    private readonly enlargeElement: HTMLElement;
    private readonly titleElement: HTMLElement;

    constructor(
            algorithmSelectElement: HTMLSelectElement,
            enlargeElement: HTMLElement,
            titleElement: HTMLElement) {
        this.algorithmSelectElement = algorithmSelectElement;
        this.enlargeElement = enlargeElement;
        this.titleElement = titleElement;
    }

    parseQueryParameters(query: string) {
        let queryParameters = query.replace("?", "").split("&");
        console.log("Query parameters", queryParameters);

        for (let i = 0; i < queryParameters.length; i++) {
            let queryParts = queryParameters[i].split("=");
            let value = queryParts[1];
            switch (queryParts[0]) {
                case "algorithm":
                    this.algorithm = AlgorithmType[value];
                    break;

                case "center":
                    let coordinates = value.split(",");
                    this.centerX = parseFloat(coordinates[0]);
                    this.centerY = parseFloat(coordinates[1]);
                    break;

                case "julia":
                    let julia = value.split(",");
                    this.juliaX = parseFloat(julia[0]);
                    this.juliaY = parseFloat(julia[1]);
                    break;

                case "set":
                    this.set = SetType[value];
                    break;

                case "width":
                    this.width = parseFloat(value);
                    break;
            }
        }

        this.updateUI();
    }

    private updateUI() {
        this.algorithmSelectElement.value = AlgorithmType[this.algorithm];

        this.enlargeElement.setAttribute("data-set", SetType[this.set]);
        this.enlargeElement.setAttribute("data-algorithm", AlgorithmType[this.algorithm]);
        this.enlargeElement.setAttribute("data-xcenter", this.centerX.toString());
        this.enlargeElement.setAttribute("data-ycenter", this.centerY.toString());
        this.enlargeElement.setAttribute("data-width", this.width.toString());
        this.enlargeElement.setAttribute("data-julia", this.juliaX.toString() + "," + this.juliaY.toString());

        if (this.set === SetType.Julia) {
            this.titleElement.textContent = "The Julia Set";
        }
    }
}