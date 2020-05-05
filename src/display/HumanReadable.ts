export default function humanReadable(value: number): string {
    let normalizedValue = Math.abs(value);
    if (normalizedValue < 1000) {
        return value.toString();
    }

    let sign = value < 0 ? "-" : "";
    let unit = [ "", "K", "M", "B", "T" ];
    let magnitude = Math.floor(Math.log10(normalizedValue) / 3);

    return sign + (normalizedValue / Math.pow(1000, magnitude)).toFixed(3) + " " + unit[magnitude];
}