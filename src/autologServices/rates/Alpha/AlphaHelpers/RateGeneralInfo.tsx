import { IFormProps, IValues } from "../../../../common/form/formTypes";
import { AutologSystemMessageSchema } from "../../../../common/systemMessages/autologSystemMessageTypes";
import { ratesCreationMessages } from "./RatesCreationMsg";

export const rateGeneralInfoForm = [
  { name: "rateName", label: "Rate Name", editor: "textbox", required: true },
  {
    name: "freightForwarderName",
    label: "Freight Forwarder Name",
    editor: "textbox",
    required: true,
  },
  {
    name: "carrierName",
    label: "Carrier Name",
    editor: "textbox",
    required: true,
  },
  {
    name: "validFrom",
    label: "Valid From",
    editor: "dateinput",
    required: true,
  },
  { name: "validTo", label: "Valid To", editor: "dateinput", required: true },
  /*{
        name: 'pointsOfDestination',
        required: true,
        label: 'Add Rate Points of Destination',
        editor: 'spreadsheet',
        spreadsheetColumns: pointsOfDestinationColumns
    },*/
  {
    name: "direction",
    label: "Direction",
    editor: "radio",
    options: ["Import"],
    required: true,
  },
  {
    name: "incoterm",
    label: "Incoterm",
    editor: "radio",
    options: ["FOB"],
    // options: ["EXW", "FOB", "CIF", "DAP", "Courier"],
    required: true,
  },
  {
    name: "modeOfTransport",
    label: "Mode Of Transport",
    editor: "radio",
    options: ["OCEAN", "AIR"],
    required: true,
  },
  {
    name: "cargoLoad",
    label: "Cargo Load",
    editor: "radio",
    options: ["FCL", "LCL"],
    required: true,
  },
];

export const RateGeneralInfoProps: IFormProps = {
  formSystemMessage: ratesCreationMessages,
  schema: rateGeneralInfoForm,
  submitButtonTitle: "Next",
  title: "Basic Rate Info",
  validate: function(values: IValues) {
    let errors: IValues = {};
    if (!("rateName" in values)) {
      errors.rateName = "Rate Name is required.";
    }
    if (!("freightForwarderName" in values)) {
      errors.freightForwarderName = "Freight Forwarder Name is required.";
    }
    if (!("carrierName" in values)) {
      errors.carrierName = "Carrier Name is required.";
    }
    if (!("validFrom" in values)) {
      errors.validFrom = "Validity Start Date is required.";
    }
    if (!("validTo" in values)) {
      errors.validFrom = "Validity End Date is required.";
    }

    if (!("direction" in values)) {
      errors.direction = "Rate Direction is required.";
    }

    if (!("incoterm" in values)) {
      errors.incoterm = "Rate Incoterm is required.";
    }
    if (!("modeOfTransport" in values)) {
      errors.modeOfTransport = "Rate Mode of Transport is required.";
    }

    if ("modeOfTransport" in values) {
      if (values.modeOfTransport === "OCEAN") {
        if (!("cargoLoad" in values)) {
          errors.cargoLoad = "Rate Cargo Load is required.";
        }
      }
    }

    return errors;
  },
};
