import { IFormProps, IValues } from "../../../common/form/formTypes";
import { rowIndexField } from "../../rates/newRates/common";
import { quoteRequestCreationMessages } from "./QuotesRequestsProps";

const OceanFCLHelperColumns = [
  {
    field: "containerType",
    value: "container Type",
    readOnly: true,
    head: true,
  },
  {
    field: "containerWeight",
    value: "Weight (Tons)",
    readOnly: true,
    head: true,
    fieldType: "ton",
  },
  {
    field: "numberOfContainers",
    value: "Number of units",
    readOnly: true,
    head: true,
  },
];
// const minWeight = {field: "minimumWeight", value: "Min Weight", readonly: true, head: true, fieldType: 'kg'};

export const OcenFclColumns = [[rowIndexField, ...OceanFCLHelperColumns]];

export const shipmentDetailsOceanFCLForm = [
  {
    name: "OceanFCLTable",
    label: "Ocean FCL:",
    editor: "spreadsheet",
    spreadsheetColumns: OcenFclColumns,
    required: true,
  },
];

export const ShipmentDetailsOceanFCL: IFormProps = {
  formSystemMessage: quoteRequestCreationMessages,
  schema: shipmentDetailsOceanFCLForm,
  submitButtonTitle: "Next",
  title: "Add Shipment Info",
  validate: function (values: IValues) {
    return {};
  },
};
