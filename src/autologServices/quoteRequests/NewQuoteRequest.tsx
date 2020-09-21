import { QuoteRequestSubmissions } from "./NewQuoteRequestHelpers/QuoteRequestCommands";
import {
  StepFormSchema,
  StepsCallbackProps,
  StepForm,
} from "../../common/stepForm/stepFormTypes";
import { IValues, IFormProps } from "../../common/form/formTypes";
import { AutologSystemMessageSchema } from "../../common/systemMessages/autologSystemMessageTypes";
import { quoteRequestCreationMessages } from "./NewQuoteRequestHelpers/QuotesRequestsProps";

import { AddGeneralInfoFormProps } from "./NewQuoteRequestHelpers/AddGeneralInfoFormProps";
import { AddSupplierDetails } from "./NewQuoteRequestHelpers/AddSuplierDetails";
import { ShipmentDetailsAir } from "./NewQuoteRequestHelpers/ShipmentDetailsAir";
import { ShipmentDetailsOceanLCL } from "./NewQuoteRequestHelpers/ShipmentDetailsOceanLCL";
import { ShipmentDetailsOceanFCL } from "./NewQuoteRequestHelpers/ShipmentDetailsOceanFCL";
import {
  AddLocationFOBAirUSA,
  AddLocationFOBAirEurope,
  AddLocationFOBAirFarEast,
} from "./NewQuoteRequestHelpers/AddLocationFob/AddLocationFOBAir";

import {
  AddLocationFOBOceanUSA,
  AddLocationFOBOceanEurope,
  AddLocationFOBOceanFarEast,
} from "./NewQuoteRequestHelpers/AddLocationFob/AddLocationFOBOcean";

/*TODO Implement validation*/
const validateRequestInfo = (values: IValues) => {
  return {};
};

/* New Quote request  Step Form Schema*/
const quoteRequestFormMap = new Map([
  ["GeneralInfo", AddGeneralInfoFormProps],

  ["SupplierDetails", AddSupplierDetails],

  ["ShipmentDetailsAir", ShipmentDetailsAir],
  ["ShipmentDetailsOceanFCL", ShipmentDetailsOceanFCL],
  ["ShipmentDetailsOceanLCL", ShipmentDetailsOceanLCL],

  ["LocationFOBAirUSA", AddLocationFOBAirUSA],
  ["LocationFOBAirEurope", AddLocationFOBAirEurope],
  ["LocationFOBAirFarEast", AddLocationFOBAirFarEast],

  ["LocationFOBOceanUSA", AddLocationFOBOceanUSA],
  ["LocationFOBOceanEurope", AddLocationFOBOceanEurope],
  ["LocationFOBOceanFarEast", AddLocationFOBOceanFarEast],
]);

export function newQuoteRequestNextStageCallback(props: StepsCallbackProps) {
  const { stageValues } = props;

  const { incoTerms, airOcean, shipmentType, region } = stageValues;

  const exw = ["SupplierDetails", "ShipmentDetails"];
  const fob = ["LocationFOB", "ShipmentDetails"];
  // const cif = ["PickUp", "FreightTransport", "Locals"];
  // const courier = ["Courier", "Locals"];

  const getSteps = (step: string) => {
    switch (step) {
      case "SupplierDetails":
        return "SupplierDetails";

      case "ShipmentDetails":
        if (airOcean === "Ocean") {
          return "ShipmentDetails" + "Ocean" + shipmentType;
        } else {
          return "ShipmentDetails" + "Air";
        }

      case "LocationFOB":
        return "LocationFOB" + airOcean + region;
    }
  };

  const stagesArr = () => {
    switch (incoTerms) {
      case "FOB":
        return fob;
      case "EXW":
        return exw;
      // case "CIF":
      //   return cif;
      // case "Courier":
      //   return courier;
    }
  };
  const incotermStages = stagesArr();

  const formStages =
    incotermStages !== undefined && (incotermStages.map(getSteps) as string[]);
  // console.log("this is formStages -> ", formStages);

  return formStages ? ["GeneralInfo", ...formStages] : ["GeneralInfo"];
}

/* New Company Account StepForm Schema */
const newQuoteRequestStepForm: StepForm = [
  newQuoteRequestNextStageCallback,
  quoteRequestFormMap,
];

export const newQuoteRequestSchema: StepFormSchema = {
  sourceStage: "GeneralInfo",
  command: QuoteRequestSubmissions,
  newEntityStepForm: newQuoteRequestStepForm,
  validate: validateRequestInfo,
  formSystemMessage: quoteRequestCreationMessages,
};
