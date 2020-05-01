export default function humanReadable(value: number): string {
    let unit = [ "", "k", "M", "B", "T" ];
    let magnitude = Math.ceil((1 + Math.log(value) / Math.log(10)) / 3);

    return (value / Math.pow(10, 3 * (magnitude - 1))).toFixed(3) + unit[magnitude - 1];
}