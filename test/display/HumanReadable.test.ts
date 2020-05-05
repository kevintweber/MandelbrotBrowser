import humanReadable from "../../src/display/HumanReadable";

describe('humanReadable', () => {
    it("single digits", () => {
        let result1 = humanReadable(5);
        expect(result1).toBe("5");

        let result2 = humanReadable(15);
        expect(result2).toBe("15");

        let result3 = humanReadable(815);
        expect(result3).toBe("815");

        let negative = humanReadable(-123);
        expect(negative).toBe("-123");
    });

    it("thousands", () => {
        let result1 = humanReadable(1005);
        expect(result1).toBe("1.005 K");

        let result2 = humanReadable(11500);
        expect(result2).toBe("11.500 K");

        let result3 = humanReadable(115006);
        expect(result3).toBe("115.006 K");

        let negative = humanReadable(-12003);
        expect(negative).toBe("-12.003 K");
    });

    it("millions", () => {
        let result1 = humanReadable(1005000);
        expect(result1).toBe("1.005 M");

        let result2 = humanReadable(11500000);
        expect(result2).toBe("11.500 M");

        let result3 = humanReadable(115006000);
        expect(result3).toBe("115.006 M");

        let negative = humanReadable(-12003000);
        expect(negative).toBe("-12.003 M");
    });

    it("billions", () => {
        let result1 = humanReadable(1000005000);
        expect(result1).toBe("1.000 B");

        let result2 = humanReadable(11000500000);
        expect(result2).toBe("11.001 B");

        let result3 = humanReadable(100015006000);
        expect(result3).toBe("100.015 B");

        let negative = humanReadable(-12003000000);
        expect(negative).toBe("-12.003 B");
    });
});