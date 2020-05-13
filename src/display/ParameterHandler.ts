import { AlgorithmType } from "../calculation/algorithm/AlgorithmType";

export class ParameterHandler {

    algorithm: AlgorithmType = AlgorithmType["LineByLine"];
    centerX: number = -0.5;
    centerY: number = 0;
    width: number = 5;

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

                case "width":
                    this.width = parseFloat(value);
                    break;
            }
        }

        this.updateUI();
    }

    private updateUI() {
        let algorithmSelect = document.getElementById("algorithm") as HTMLSelectElement;
        algorithmSelect.value = AlgorithmType[this.algorithm];

        let enlargeInput = document.getElementById("enlarge");
        enlargeInput.setAttribute("data-algorithm", AlgorithmType[this.algorithm]);
        enlargeInput.setAttribute("data-xcenter", this.centerX.toString());
        enlargeInput.setAttribute("data-ycenter", this.centerY.toString());
        enlargeInput.setAttribute("data-width", this.width.toString());
    }
}