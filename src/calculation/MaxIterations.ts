export default function determineMaxIterations(width: number): number {
    let logWidth = Math.log(5.0 / width);
    let iterations = Math.floor(logWidth * logWidth * 30);

    return Math.max(iterations, 150);
}