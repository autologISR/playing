import { IFormProps, IValues } from "../../../../../common/form/formTypes";
import { ratesCreationMessages } from "../RatesCreationMsg";
import * as React from "react";
import { rulesInput } from "../../AlphaHelpers/rulesInput";
import {
  fromWeightAdHocColumnsSpreadsheetParser,
  fromWeightRatesCustomComponentFunc,
  rowIndexField,
  WeightLimitsComponent,
} from "../common";
import { additionalChargesTable } from "../additionalChargesInput";
export const airFreightPartColumns = [
  { field: "portFrom", value: "Port From", readOnly: true, head: true },
  // { field: "portTo", value: "Port To", readOnly: true, head: true },
  {
    field: "transitTime",
    value: "Transit Time",
    readOnly: true,
    head: true,
    fieldType: "day",
  },
];
export const route = {
  field: "route",
  value: "Routes",
  readOnly: true,
  head: true,
};
export const minWeight = {
  field: "minimumWeight",
  value: "Min Weight",
  readonly: true,
  head: true,
  fieldType: "kg",
};

export const airColumns = [
  [rowIndexField, ...airFreightPartColumns, route, minWeight],
];

export const airRates = [
  {
    name: "airTable",
    label: "Air Rates:",
    editor: "spreadsheet",
    customComponent: WeightLimitsComponent,
    customSpreadsheetInputFunc: fromWeightRatesCustomComponentFunc,
    adHocColumnsSpreadsheetParser: fromWeightAdHocColumnsSpreadsheetParser,
    spreadsheetColumns: airColumns,
    required: true,
  },

  {
    name: "limitHeight",
    label: "Height limit per shippment (cm)",
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
    name: "airRateRatio",
    label: "1CBM = ? (KG), usually 167",
    editor: "number",
    required: true,
  },
];
export const FreightTransportAirForm: IFormProps = {
  formSystemMessage: ratesCreationMessages,
  schema: airRates,
  submitButtonTitle: "Next",
  title: "Add Freight Air Transport Rates",
  validate: function(values: IValues) {
    return {};
  },
};
