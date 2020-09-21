import { IFormProps, IValues } from "../../../common/form/formTypes";
import { quoteRequestCreationMessages } from "./QuotesRequestsProps";

// const { , airOcean, direction, shipmentType, region } = stageValues;
/*
Terms
Region
Air/Ocean
LCL FCL(shipmentType)
Import Export(direction)
Dates
Insurance
Dangerouse goods
Dischardge port
*/
export const quoteRequestGeneralInfoForm = [
  {
    name: "incoTerms",
    label: "Terms",
    editor: "dropdown",
    options: ["EXW", "FOB"],
    // options: ["FOB", "EXW", "CIF", "Courier"],
    required: true,
  },
  {
    name: "dischargePort",
    label: "Discharge port",
    editor: "dropdown",
    options: ["TLV","ASHDOD","hAIFA"],
    required: true,
  },
  {
    name: "region",
    label: "Region",
    editor: "dropdown",
    options: ["USA", "FarEast", "Europe"],
    required: true,
  },
  {
    name: "airOcean",
    label: "Air or Ocen",
    editor: "dropdown",
    options: ["Air", "Ocean"],
    required: true,
  },
  {
    name: "shipmentType",
    label: "LCL or FCL",
    editor: "dropdown",
    options: ["LCL", "FCL"],
    required: true,
  },
  {
    name: "direction",
    label: "Import or export",
    editor: "dropdown",
    options: ["Import", "Export"],
    required: true,
  },
  {
    name: "dateFrom",
    label: "Dates of readiness",
    editor: "dateinput",
    required: true,
  },
  {
    name: "dateTo",
    label: "Until",
    editor: "dateinput",
    required: true,
  },
  {
    name: "insurance",
    label: "Insurance",
    editor: "dropdown",
    options: ["yes", "no"],
    required: true,
  },
  {
    name: "dangerouseGoods",
    label: "Dangerouse goods?",
    editor: "dropdown",
    options: ["yes", "no"],
    required: true,
  },
];

/* New Company Account Stage IFormProps */
export const AddGeneralInfoFormProps: IFormProps = {
  formSystemMessage: quoteRequestCreationMessages,
  schema: quoteRequestGeneralInfoForm,
  submitButtonTitle: "Next",
  title: "Add request general info",
  validate: function (values: IValues) {
    return {};
  },
};
