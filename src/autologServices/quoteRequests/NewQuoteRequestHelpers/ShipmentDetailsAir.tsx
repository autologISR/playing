import { IFormProps, IValues } from "../../../common/form/formTypes";
import { rowIndexField } from "../../rates/newRates/common";
import { quoteRequestCreationMessages } from "./QuotesRequestsProps";

const airShipmentDetailstColumns = [
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

export const airColumns = [[rowIndexField, ...airShipmentDetailstColumns]];
export const shipmentDetailsAirForm = [

  {
    name: "shipmentDetailsAir",
    label: "shipment Details Air :",
    editor: "spreadsheet",
    spreadsheetColumns: airColumns,
    required: true,
  },
];

export const ShipmentDetailsAir: IFormProps = {
  formSystemMessage: quoteRequestCreationMessages,
  schema: shipmentDetailsAirForm,
  submitButtonTitle: "Next",
  title: "Add Shipment Info",
  validate: function (values: IValues) {
    return {};
  },
};
