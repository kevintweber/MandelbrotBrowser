export default function hslToRgb(h: number, s: number, l: number): number[] {
    let r, g, b;

    if (s == 0) {
        return [ Math.round(l * 255), Math.round(l * 255), Math.round(l * 255) ];
    }

    let hue2rgb = function hue2rgb(p: number, q: number, t: number): number {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;

        return p;
    }

    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);

    return [ Math.round(r * 255), Math.round(g * 255), Math.round(b * 255) ];
}