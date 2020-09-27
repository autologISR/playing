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

//
//, ,
// incoterms   dischargePort region   modeOfTransport cargoLoad  direction dateFrom dateTo  dangerouseGoods ,insurance
export const quoteRequestGeneralInfoForm = [
  {
    name: "incoterms",
    label: "Terms",
    editor: "dropdown",
    options: ["FOB"],
    // options: ["FOB", "EXW", "CIF", "Courier"],
    required: true,
  },
  {
    name: "dischargePort",
    label: "Discharge port",
    editor: "dropdown",
    options: ["TLV", "ASHDOD", "HAIFA"],
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
    name: "modeOfTransport",
    label: "Air or Ocen",
    editor: "dropdown",
    options: ["Air", "Ocean"],
    required: true,
  },
  {
    name: "cargoLoad",
    label: "LCL or FCL",
    editor: "dropdown",
    options: ["LCL", "FCL"],
    required: true,
  },
  {
    name: "direction",
    label: "Import or export",
    editor: "dropdown",
    options: ["Import"],
    // options: ["Import", "Export"],
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
  validate: function(values: IValues) {
    let errors: IValues = {};

    if (!("incoterms" in values)) {
      errors.incoterms = "IncoTerms are required.";
    }
    if (!("dischargePort" in values)) {
      errors.dischargePort = "Discharge Port  Name is required.";
    }
    if (!("region" in values)) {
      errors.region = "Region is required.";
    }
    if (!("modeOfTransport" in values)) {
      errors.modeOfTransport = "Mode of Transport is required.";
    }
    if (!("dateFrom" in values)) {
      errors.dateFrom = "Validity Start Date is required.";
    }
    if (!("dateTo" in values)) {
      errors.dateTo = "Validity End Date is required.";
    }
    if (!("direction" in values)) {
      errors.direction = "Rate Direction is required.";
    }
    if (!("dangerouseGoods" in values)) {
      errors.dangerouseGoods = "Rate Direction is required.";
    }
    if (!("insurance" in values)) {
      errors.insurance = "Rate Direction is required.";
    }

    if ("modeOfTransport" in values) {
      if (values.modeOfTransport === "Ocean") {
        if (!("cargoLoad" in values)) {
          errors.cargoLoad = "Cargoload (FCL/LCL) is required.";
        }
      }
    }
    //
    return errors;
  },
};
