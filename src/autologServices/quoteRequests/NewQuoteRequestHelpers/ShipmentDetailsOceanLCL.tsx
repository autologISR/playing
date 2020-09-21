import { IFormProps, IValues } from "../../../common/form/formTypes";
import { rowIndexField } from "../../rates/newRates/common";
import { quoteRequestCreationMessages } from "./QuotesRequestsProps";

const OceanLCLHelperColumns = [
  {
    field: "unitWeight",
    value: "unit Weight(kg)",
    fieldType: "kg",
    readOnly: true,
    head: true,
  },
  {
    field: "numberOfUnits",
    value: "Number of units",
    readOnly: true,
    head: true,
  },
  {
    field: "unitLength",
    value: "Length (cm)",
    readOnly: true,
    head: true,
  },
  {
    field: "unitWidth",
    value: "Width (cm)",
    readOnly: true,
    head: true,
  },
  {
    field: "unitHeight",
    value: "Height (cm)",
    readOnly: true,
    head: true,
  },
];

export const OcenFclColumns = [[rowIndexField, ...OceanLCLHelperColumns]];

export const shipmentDetailsOceanLCLForm = [
  {
    name: "OceanLCLTable",
    label: "Ocean LCL:",
    editor: "spreadsheet",
    spreadsheetColumns: OcenFclColumns,
    required: true,
  },
];

export const ShipmentDetailsOceanLCL: IFormProps = {
  formSystemMessage: quoteRequestCreationMessages,
  schema: shipmentDetailsOceanLCLForm,
  submitButtonTitle: "Next",
  title: "Add Shipment Info",
  validate: function (values: IValues) {
    return {};
  },
};
