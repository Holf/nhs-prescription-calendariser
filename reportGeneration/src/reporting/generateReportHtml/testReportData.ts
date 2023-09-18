export const testReportData = [
  {
    name: "Pregabalin 150mg capsules",
    prescriptionInfo: {
      dateLastIssued: "Thu Aug 17 2023",
      nextIssueDate: "Fri Sep 15 2023",
      daysUntilRepeatCanBeOrdered: 0,
    },
    stockInfo: {
      dailyDose: 2,
      stockCount: 132,
      daysUntilStockIsDepleted: 66,
      uncollectedStockCount: null,
    },
    errors: [
      "Calculated Daily Dose of 4 does not match most recent Daily Dose of 2. Using most recent Daily Dose.",
    ],
  },
  {
    name: "Pregabalin 75mg capsules",
    prescriptionInfo: {
      dateLastIssued: "Tue Aug 29 2023",
      nextIssueDate: "Wed Sep 13 2023",
      daysUntilRepeatCanBeOrdered: 0,
    },
    stockInfo: {
      dailyDose: 2,
      stockCount: 35,
      daysUntilStockIsDepleted: 17,
      uncollectedStockCount: null,
    },
    errors: [],
  },
  {
    name: "Fentanyl 400microgram lozenges",
    prescriptionInfo: {
      dateLastIssued: "Thu Sep 14 2023",
      nextIssueDate: "Fri Oct 13 2023",
      daysUntilRepeatCanBeOrdered: 18,
    },
    stockInfo: {
      dailyDose: 4,
      stockCount: 59,
      daysUntilStockIsDepleted: 14,
      uncollectedStockCount: 112,
    },
    errors: [],
  },
  {
    name: "Mezolar Matrix 50micrograms/hour transdermal patches (Sandoz Ltd)",
    prescriptionInfo: {
      dateLastIssued: "Thu Sep 14 2023",
      nextIssueDate: "Fri Oct 13 2023",
      daysUntilRepeatCanBeOrdered: 18,
    },
    stockInfo: {
      dailyDose: 0.3333333333333333,
      stockCount: 1.6666666666666679,
      daysUntilStockIsDepleted: 5,
      uncollectedStockCount: 10,
    },
    errors: [
      "Calculated Daily Dose of 0.35714285714285715 does not match most recent Daily Dose of 0.3333333333333333. Using most recent Daily Dose.",
    ],
  },
  {
    name: "Fentanyl 200microgram lozenges",
    prescriptionInfo: {
      dateLastIssued: "Tue Aug 29 2023",
      nextIssueDate: "Wed Sep 27 2023",
      daysUntilRepeatCanBeOrdered: 2,
    },
    stockInfo: {
      dailyDose: 4,
      stockCount: 89,
      daysUntilStockIsDepleted: 22,
      uncollectedStockCount: null,
    },
    errors: [],
  },
];
