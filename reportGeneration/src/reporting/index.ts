import { generateReportData } from "@src/reporting/generateReportData.ts";
import { generateReportHtml } from "@src/reporting/generateReportHtml/index.ts";

const reportData = await generateReportData();
const htmlReport = await generateReportHtml(reportData);

await Deno.writeTextFile("report.html", htmlReport);
