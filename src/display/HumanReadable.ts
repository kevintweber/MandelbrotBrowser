export default function humanReadable(value: number): string {
    const normalizedValue = Math.abs(value);
    if (normalizedValue < 1000) {
        return value.toString();
    }

    const sign = value < 0 ? "-" : "";
    const unit = [ "", "K", "M", "B", "T" ];
    const magnitude = Math.floor(Math.log10(normalizedValue) / 3);

    return sign + (normalizedValue / Math.pow(1000, magnitude)).toFixed(3) + " " + unit[magnitude];
}