import { rowIndexField } from "../../../../newRates/common";

export const FreightOceanFCLFIXColsHelper = [
  { field: "FixRuleName", value: "Fix Rule Name", readOnly: true, head: true },
  { field: "amount", value: "Amount", readOnyly: true, head: true },
  {
    field: "currency",
    value: "Currency (NIS,USD,EUR)",
    readOnyly: true,
    head: true,
  },
  {
    field: "mandatory",
    value: "mandatory? (Y/N)",
    readOnyly: true,
    head: true,
  },
];

export const FreightOceanFCLFIXCols = [
  [rowIndexField, ...FreightOceanFCLFIXColsHelper],
];
