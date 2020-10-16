import { ColorScheme } from "./ColorScheme";

export class CachedColorScheme implements ColorScheme {

    private readonly colorScheme: ColorScheme;
    private colorCache: Map<number, number[]>;

    constructor(colorScheme: ColorScheme) {
        this.colorScheme = colorScheme;
        this.colorCache = new Map();
    }

    getColor(depth: number): number[] {
        if (this.colorCache.has(depth)) {
            return this.colorCache.get(depth);
        }

        const result = this.colorScheme.getColor(depth);
        this.colorCache.set(depth, result);

        return result;
    }

    toString(): string {
        return "CachedColorScheme[" +
                "colorScheme={" + this.colorScheme.toString() + "};" +
                "]";
    }
}