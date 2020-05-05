export default function determineMaxIterations(width: number): number {
    let log10Width = Math.log10(width);
    let iterations = log10Width * log10Width * 200;

    return Math.floor(Math.max(iterations, 100));
}