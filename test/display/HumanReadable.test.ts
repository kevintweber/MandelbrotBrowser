import humanReadable from "../../src/display/HumanReadable";

describe('humanReadable', () => {
    it("single digits", () => {
        const result1 = humanReadable(5);
        expect(result1).toBe("5");

        const result2 = humanReadable(15);
        expect(result2).toBe("15");

        const result3 = humanReadable(815);
        expect(result3).toBe("815");

        const negative = humanReadable(-123);
        expect(negative).toBe("-123");
    });

    it("thousands", () => {
        const result1 = humanReadable(1005);
        expect(result1).toBe("1.005 K");

        const result2 = humanReadable(11500);
        expect(result2).toBe("11.500 K");

        const result3 = humanReadable(115006);
        expect(result3).toBe("115.006 K");

        const negative = humanReadable(-12003);
        expect(negative).toBe("-12.003 K");
    });

    it("millions", () => {
        const result1 = humanReadable(1005000);
        expect(result1).toBe("1.005 M");

        const result2 = humanReadable(11500000);
        expect(result2).toBe("11.500 M");

        const result3 = humanReadable(115006000);
        expect(result3).toBe("115.006 M");

        const negative = humanReadable(-12003000);
        expect(negative).toBe("-12.003 M");
    });

    it("billions", () => {
        const result1 = humanReadable(1000005000);
        expect(result1).toBe("1.000 B");

        const result2 = humanReadable(11000500000);
        expect(result2).toBe("11.001 B");

        const result3 = humanReadable(100015006000);
        expect(result3).toBe("100.015 B");

        const negative = humanReadable(-12003000000);
        expect(negative).toBe("-12.003 B");
    });
});