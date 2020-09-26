import {
  StepForm,
  StepFormSchema,
  StepsCallbackProps,
} from "../../../common/stepForm/stepFormTypes";
import { newRateSubmissions } from "./AlphaHelpers/NewRateAlphaCommand";
import { RateGeneralInfoProps } from "./AlphaHelpers/RateGeneralInfo";
import { validateRate } from "./AlphaHelpers/ValidateRate";
import { ratesCreationMessages } from "./AlphaHelpers/RatesCreationMsg";

import { FreightTransportOceanLclForm } from "./AlphaHelpers/FOB/FreightOceanLCL";
import { FreightTransportOceanFclForm } from "./AlphaHelpers/FOB/FreightOceanFCL";
import { FreightTransportAirForm } from "./AlphaHelpers/FOB/FreightTransporAir";

import { LocalsOCEANLCLForm } from "./AlphaHelpers/LOCAL/LocalsOCEANLCL";
import { LocalsOCEANFCLForm } from "./AlphaHelpers/LOCAL/LocalsOCEANFCL";
import { LocalsAIRForm } from "./AlphaHelpers/LOCAL/LocalAIR";

export const newRatesStepFormMap = new Map([
  ["GeneralInfo", RateGeneralInfoProps],
  
  ["FreightTransportOCEANLCL", FreightTransportOceanLclForm],
  ["FreightTransportOCEANFCL", FreightTransportOceanFclForm],
  ["FreightTransportAIR", FreightTransportAirForm],

  ["LocalsOCEANLCL", LocalsOCEANLCLForm],
  ["LocalsOCEANFCL", LocalsOCEANFCLForm],
  ["LocalsAIR", LocalsAIRForm],
]);

export function newRateCreationStepsCallback(props: StepsCallbackProps) {
  const { stageValues } = props;

  //modeOfTransport = airOcean
  const { direction, modeOfTransport, cargoLoad, incoterm } = stageValues;

  const fob = ["FreightTransport", "Locals"];
  // const fob = ["FreightTransport", "Locals"];

  // const exw = ["SupplierDetails", "ShipmentDetails"];
  // const cif = ["PickUp", "FreightTransport", "Locals"];
  // const courier = ["Courier", "Locals"];

  //ShipmentDetailsOCEANFCL.....ShipmentDetailsOCEANlCL.....ShipmentDetailsAIR
  //LocationFOBOCEANFCL.....LocationFOBOCEANlCL.....LocationFOBAIR
  console.log(
    "params of first stage -> ",
    direction,
    modeOfTransport,
    cargoLoad,
    incoterm
  );
  const getSteps = (step: string) => {
    if (direction === "Import") {
      switch (step) {
        case "FreightTransport":
          if (modeOfTransport === "OCEAN") {
            // eslint-disable-next-line no-useless-concat
            return "FreightTransport" + "OCEAN" + cargoLoad;
          } else {
            // eslint-disable-next-line no-useless-concat
            return "FreightTransport" + "AIR";
          }
          break;

        case "Locals":
          if (modeOfTransport === "OCEAN") {
            // eslint-disable-next-line no-useless-concat
            return "Locals" + "OCEAN" + cargoLoad;
          } else {
            // eslint-disable-next-line no-useless-concat
            return "Locals" + "AIR";
          }
          break;

        default:
          console.log("defauilt..");
          return "GeneralInfo";
          break;
      }
    }
  };

  const stagesArr = () => {
    switch (incoterm) {
      case "FOB":
        return fob;
      case "EXW":
        return;
    }
  };
  const incotermStages = stagesArr();

  const formStages =
    incotermStages !== undefined && (incotermStages.map(getSteps) as string[]);
  // console.log("this is formStages -> ", formStages);

  return formStages ? ["GeneralInfo", ...formStages] : ["GeneralInfo"];
}

const newRatesStepForm: StepForm = [
  newRateCreationStepsCallback,
  newRatesStepFormMap,
];

export const newRateSchema: StepFormSchema = {
  sourceStage: "GeneralInfo",
  command: newRateSubmissions,
  newEntityStepForm: newRatesStepForm,
  validate: validateRate,
  formSystemMessage: ratesCreationMessages,
};

// ['FreightTransportEXWAIRLCL', FreightTransportEXWAir],
// ['FreightTransportFOBAIRLCL', FreightTransportFOBAir],
// ['FreightTransportEXWOCEANFCL', FreightTransportEXWOceanFcl],
// ['FreightTransportFOBOCEANFCL', FreightTransportFOBOceanFcl],
// ['LocalsImportOCEANFCL', AddLocalsProps('LocalsImportOCEANFCL')],
// ['LocalsImportOCEANLCL', AddLocalsProps('LocalsImportOCEANLCL')],
// ['LocalsImportAIRLCL', AddLocalsProps('LocalsImportAIRLCL')],
// ['LocalsExportOCEANFCL', AddLocalsProps()],
// ['LocalsExportOCEANLCL', AddLocalsProps()],
// ['LocalsExportAIRLCL', AddLocalsProps()],
// ['AddTaxAndRules', AddTaxAndRules],
// ['PickUp', PickUp],
// ['Courier', Courier],
// ['Delivery', Delivery],
