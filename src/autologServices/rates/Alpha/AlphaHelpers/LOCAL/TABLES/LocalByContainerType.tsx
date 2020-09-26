import { rowIndexField } from "../../common";


export const LocalOCEANFCLByContainerColumnsHelper = [
  { field: "ruleName", value: "rule Name", readOnly: true, head: true },
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
  {
    field: "containerType",
    value: "container Type (20DV / 40DV / 20HC / 40HQ)",
    readOnyly: true,
    head: true,
  },
];

///////////////////////////////////////////////

export const LocalOCEANFCLByContainerColumns = [
  [rowIndexField, ...LocalOCEANFCLByContainerColumnsHelper],
];
