import { beforeEach, describe, expect, test } from "@harpiya/hoot";
import { getService, makeMockEnv } from "@web/../tests/web_test_helpers";

describe.current.tags("headless");

let titleService;

beforeEach(async () => {
    await makeMockEnv();
    titleService = getService("title");
});

test("simple title", () => {
    titleService.setParts({ one: "MyHarpiya" });
    expect(titleService.current).toBe("MyHarpiya");
});

test("add title part", () => {
    titleService.setParts({ one: "MyHarpiya", two: null });
    expect(titleService.current).toBe("MyHarpiya");
    titleService.setParts({ three: "Import" });
    expect(titleService.current).toBe("MyHarpiya - Import");
});

test("modify title part", () => {
    titleService.setParts({ one: "MyHarpiya" });
    expect(titleService.current).toBe("MyHarpiya");
    titleService.setParts({ one: "Zopenerp" });
    expect(titleService.current).toBe("Zopenerp");
});

test("delete title part", () => {
    titleService.setParts({ one: "MyHarpiya" });
    expect(titleService.current).toBe("MyHarpiya");
    titleService.setParts({ one: null });
    expect(titleService.current).toBe("Harpiya");
});

test("all at once", () => {
    titleService.setParts({ one: "MyHarpiya", two: "Import" });
    expect(titleService.current).toBe("MyHarpiya - Import");
    titleService.setParts({ one: "Zopenerp", two: null, three: "Sauron" });
    expect(titleService.current).toBe("Zopenerp - Sauron");
});

test("get title parts", () => {
    expect(titleService.current).toBe("");
    titleService.setParts({ one: "MyHarpiya", two: "Import" });
    expect(titleService.current).toBe("MyHarpiya - Import");
    const parts = titleService.getParts();
    expect(parts).toEqual({ one: "MyHarpiya", two: "Import" });
    parts.action = "Export";
    expect(titleService.current).toBe("MyHarpiya - Import"); // parts is a copy!
});
