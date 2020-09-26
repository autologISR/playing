//////////////////////////////////////////////////
import { rowIndexField } from "../../common";

export const LocalOCEANLCLByWeightColumnsHelper = [
  {
    field: "ByWeightRuleName",
    value: "Weight Rule Name",
    readOnly: true,
    head: true,
  },
  { field: "ratio", value: "1CBM=?KG", readOnyly: true, head: true },
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
  { field: "ammount", value: "ammount", readOnyly: true, head: true },
];

export const LocalAIRByWeightColumnsHelper = [
  {
    field: "ByWeightRuleName",
    value: "Weight Rule Name",
    readOnly: true,
    head: true,
  },
  { field: "scale", value: "1CBM=?KG", readOnyly: true, head: true },
  {
    field: "currency",
    value: "currency (NIS,USD,EUR)",
    readOnyly: true,
    head: true,
  },
  { field: "ammount", value: "ammount", readOnyly: true, head: true },
  {
    field: "mandatory",
    value: "mandatory? (Y/N)",
    readOnyly: true,
    head: true,
  },
];

export const LocalOCEANLCLByWeightColumns = [
  [rowIndexField, ...LocalOCEANLCLByWeightColumnsHelper],
];

export const LocalAIRByWeightColumns = [
  [rowIndexField, ...LocalAIRByWeightColumnsHelper],
];
