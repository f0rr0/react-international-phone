import { describe, expect, test } from "@jest/globals";

import { applyMask } from "../applyMask";

describe("applyMask", () => {
  test("should apply mask", () => {
    expect(
      applyMask({ value: "12345678", mask: ".. .. ....", maskSymbol: "." }),
    ).toBe("12 34 5678");
    expect(
      applyMask({ value: "12345678", mask: ".... ....", maskSymbol: "." }),
    ).toBe("1234 5678");
    expect(
      applyMask({ value: "12345678", mask: "## ## ## ##", maskSymbol: "#" }),
    ).toBe("12 34 56 78");
    expect(
      applyMask({ value: "12345678", mask: ".. (..) .. ..", maskSymbol: "." }),
    ).toBe("12 (34) 56 78");
  });

  test("should trim values that bigger than mask", () => {
    expect(
      applyMask({ value: "1234567890", mask: ".. .. ....", maskSymbol: "." }),
    ).toBe("12 34 5678");
    expect(
      applyMask({ value: "1234567890", mask: ".... ....", maskSymbol: "." }),
    ).toBe("1234 5678");
  });

  test("should apply mask on value that shorter that mask", () => {
    expect(
      applyMask({ value: "1234", mask: ".. .. ....", maskSymbol: "." }),
    ).toBe("12 34");
    expect(
      applyMask({ value: "1234", mask: ".... ....", maskSymbol: "." }),
    ).toBe("1234");
    expect(applyMask({ value: "1", mask: ".... ....", maskSymbol: "." })).toBe(
      "1",
    );
    expect(applyMask({ value: "", mask: ".... ....", maskSymbol: "." })).toBe(
      "",
    );
  });

  test("should accept all symbols", () => {
    expect(
      applyMask({ value: "abcdefgh", mask: ".. .. ....", maskSymbol: "." }),
    ).toBe("ab cd efgh");
    expect(
      applyMask({ value: "sometest", mask: ".... ....", maskSymbol: "." }),
    ).toBe("some test");
    expect(
      applyMask({ value: "+12345678", mask: ".... ....", maskSymbol: "." }),
    ).toBe("+123 4567");
    expect(
      applyMask({ value: "+123", mask: ".... ....", maskSymbol: "." }),
    ).toBe("+123");
  });

  test("should handle offset", () => {
    expect(
      applyMask({
        value: "+380991234567",
        mask: "(..) ... .. ..",
        maskSymbol: ".",
        offset: 4,
        insertSpaceAfterOffset: true,
      }),
    ).toBe("+380 (99) 123 45 67");
    expect(
      applyMask({
        value: "+380991234567",
        mask: "(..) ... .. ..",
        maskSymbol: ".",
        offset: 4,
        insertSpaceAfterOffset: false,
      }),
    ).toBe("+380(99) 123 45 67");
  });
});
