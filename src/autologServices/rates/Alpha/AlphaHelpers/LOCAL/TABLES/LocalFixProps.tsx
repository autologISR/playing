import { rowIndexField } from "../../common";
export const LocalAIRFixColumnsHelper = [
  { field: "FixRuleName", value: "Fix Rule Name", readOnly: true, head: true },
  { field: "amount", value: "Amount", readOnyly: true, head: true },
  {
    field: "currency",
    value: "currency (NIS,USD,EUR)",
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

export const LocalOCEANFCLFixColumnsHelper = [
  { field: "FixRuleName", value: "Fix Rule Name", readOnly: true, head: true },
  { field: "amount", value: "Amount", readOnyly: true, head: true },
  {
    field: "currency",
    value: "currency (NIS, USD, EUR)",
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


export const LocalOCEANLCLFixColumnsHelper = [
  { field: "FixRuleName", value: "Fix Rule Name", readOnly: true, head: true },
  { field: "amount", value: "Amount", readOnyly: true, head: true },
  {
    field: "currency",
    value: "currency (NIS, USD, EUR)",
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

////////////////////////////////////////////////

export const LocalOCEANLCLFixColumns = [
  [rowIndexField, ...LocalOCEANLCLFixColumnsHelper],
];

export const LocalOCEANFCLFixColumns = [
  [rowIndexField, ...LocalOCEANFCLFixColumnsHelper],
];

export const LocalAIRFixColumns = [
  [rowIndexField, ...LocalAIRFixColumnsHelper],
];
