export default function determineMaxIterations(width: number): number {
    let iterations = 100 / width;

    return Math.floor(Math.max(iterations, 80));
}