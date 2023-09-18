import { assertEquals, describe, it } from "@src/deps.ts";
import { generateReportHtml } from "@src/reporting/generateReportHtml/index.ts";
import { testReportData } from "@src/reporting/generateReportHtml/testReportData.ts";

describe("generateReportHtml", () => {
  it("more stuff", async () => {
    const result = await generateReportHtml(testReportData);
    console.log(result);
    assertEquals(typeof result, "string");
  });
});
