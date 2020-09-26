import { IFormProps, IValues } from "../../../../../common/form/formTypes";
import { ratesCreationMessages } from "../RatesCreationMsg";

import { rowIndexField } from "../common";

export const oceanFreightPartColumns = [
  { field: "portFrom", value: "Port From", readOnly: true, head: true },
  { field: "portTo", value: "Port To", readOnyly: true, head: true },
  {
    field: "transitTime",
    value: "Transit Time",
    readOnly: true,
    head: true,
    fieldType: "day",
  },
];

const remarksField = {
  field: "remarks",
  value: "Remarks",
  readOnly: true,
  head: true,
};

const lclFieldWeight = {
  field: "weightMeasure",
  value: "W/M",
  readonly: true,
  head: true,
  fieldType: "number",
};
const lclFieldCurrency = {
  field: "weightMeasureCurrency",
  value: "currency (NIS, USD, EUR)",
  readonly: true,
  head: true,
  fieldType: "textbox",
};

export const FreightOceanLCLColumns = [
  [
    rowIndexField,
    ...oceanFreightPartColumns,
    lclFieldWeight,
    lclFieldCurrency,
    remarksField,
  ],
];

export const OceanLclRates = [
  {
    name: "oceanLCLTable",
    label: "Ocean LCL Rates",
    editor: "spreadsheet",
    spreadsheetColumns: FreightOceanLCLColumns,
    required: true,
  },
  {
    name: "limitHeight",
    label: "Height limit per shippment",
    editor: "number",
    required: true,
  },
  {
    name: "limitWeightShippment",
    label: "Weight limit per shippment (KG)",
    editor: "number",
    required: true,
  },
  {
    name: "limitWeightBox",
    label: "Weight limit per box (KG)",
    editor: "number",
    required: true,
  },
  {
    name: "oceanLCLRateRatio",
    label: "1CBM = ? (KG), usually 1000",
    editor: "number",
    required: true,
  },
];

export const FreightTransportOceanLclForm: IFormProps = {
  formSystemMessage: ratesCreationMessages,
  schema: OceanLclRates,
  submitButtonTitle: "Next",
  title: "Add Freight OceanLCL Transport Rates",
  validate: function(values: IValues) {
    return {};
  },
};
