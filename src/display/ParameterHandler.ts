export class ParameterHandler {

    centerX: number = -0.5;
    centerY: number = 0;
    width: number = 5;

    parseQueryParameters() {
        let queryParameters = window.location.search.replace("?", "").split("&");
        console.log("Query parameters", queryParameters);

        for (let i = 0; i < queryParameters.length; i++) {
            let queryParts = queryParameters[i].split("=");
            let value = queryParts[1];
            switch (queryParts[0]) {
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
    }
}