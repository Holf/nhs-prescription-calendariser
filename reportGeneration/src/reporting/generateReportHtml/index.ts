import { renderFileToString } from "../../deps.ts";
import { htmlReportTemplateFilePath } from "../../persistence/constants.ts";

const tableHeaders = [
  "Medication",
  "Daily dose",
  "Stock count",
  "Days until stock depleted",
  "Uncollected stock count",
  "Days until repeat can be ordered",
];

// The following must be ordered lowest, first.
const stockDepletionWarningLevels = [{
  days: 7,
  colour: "text-red-600",
}, {
  days: 10,
  colour: "text-amber-500",
}];

const formatDailyDose = (dailyDose: number) =>
  dailyDose < 1 ? dailyDose.toFixed(2) : dailyDose;

const formatDaysUntilStockIsDepleted = (daysUntilStockIsDepleted: number) => {
  const colour = stockDepletionWarningLevels.find((x) =>
    daysUntilStockIsDepleted <= x.days
  )?.colour;

  return daysUntilStockIsDepleted <= 10
    ? `<span class="font-bold ${colour}">${daysUntilStockIsDepleted}</span>`
    : daysUntilStockIsDepleted;
};

const formatDaysUntilRepeatCanBeOrdered = (
  daysUntilRepeatCanBeOrdered: number,
) =>
  daysUntilRepeatCanBeOrdered === 0
    ? `<span class="font-bold text-gray-400">${daysUntilRepeatCanBeOrdered}</span>`
    : daysUntilRepeatCanBeOrdered;

const formatStockInfo = (stockInfo: any) => ({
  ...stockInfo,
  dailyDose: formatDailyDose(stockInfo.dailyDose),
  stockCount: Math.floor(stockInfo.stockCount),
  daysUntilStockIsDepleted: formatDaysUntilStockIsDepleted(
    stockInfo.daysUntilStockIsDepleted,
  ),
});

const formatPrescriptionInfo = (prescriptionInfo: any) => ({
  ...prescriptionInfo,
  daysUntilRepeatCanBeOrdered: formatDaysUntilRepeatCanBeOrdered(
    prescriptionInfo.daysUntilRepeatCanBeOrdered,
  ),
});

export const generateReportHtml = async (reportData: any) => {
  const presentationData = reportData.map((x: any) => ({
    ...x,
    stockInfo: formatStockInfo(x.stockInfo),
    prescriptionInfo: formatPrescriptionInfo(x.prescriptionInfo),
  }));

  return await renderFileToString(
    htmlReportTemplateFilePath,
    { tableHeaders, reportData: presentationData },
  );
};
