import React, { useState, useEffect } from "react";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { uuid } from "uuidv4";
import { IValues } from "../../../../common/form/formTypes";
import axios from "axios";
import * as mutations from "../../../../graphql/mutations";
import {
  simple_OCEANFCL_FobRate,
  simple_AIR_FobRate,
  simple_OCEANLCL_FobRate,
} from "./EXECUTION_LAMBDA";
// enum RateType {
//   FOBImportOCEANLCL = "FOBImportOCEANLCL",
//   FOBImportOCEANFCL = "FOBImportOCEANFCL",
//   FOBImportAIR = "FOBImportAIR",
// }
interface RateSub {
  id: string;
  rateName: string;
  freightForwarderName: string;
  carrierName: string;
  rateType: string;
  validFrom: string;
  validTo: string;
  originCharges: string;
  freightTransportCharges: string;
  localCharges: string;
}

function simple_General_FobRate(submissionData: IValues) {
  const { modeOfTransport, cargoLoad } = submissionData.GeneralInfo;
  if (modeOfTransport === "AIR") {
    return simple_AIR_FobRate(submissionData);
  } else {
    if (cargoLoad !== undefined) {
      if (cargoLoad === "FCL") return simple_OCEANFCL_FobRate(submissionData);
      else return simple_OCEANLCL_FobRate(submissionData);
    }
  }
  // return axios.post()
}
export const newRateSubmissions = async (submissionData: IValues) => {
  // const currentUserInfo = await Auth.currentUserInfo();
  // const userMail = currentUserInfo.attributes.email;
  console.log("submissionData -> ", submissionData);

  const { incoterms, modeOfTransport } = submissionData.GeneralInfo;

  // let FOBOceanRateToAdd: RateSub | undefined = undefined;
  // let FOBAirRateToAdd: RateSub | undefined = undefined;
  // let actualInputToAdd: RateSub;
  console.log("this is params $$$ ", incoterms, modeOfTransport);

  switch (incoterms) {
    case "FOB":
      console.log(
        "inside submmision.. entered FOB, about to enter aimpleFobRates.."
      );
      // let responseFromSimple_Fob = simpleFobRate().then()
      let responseFrom_General_Simple = await simple_General_FobRate(
        submissionData
      );
      console.log(
        "fer General FOB handler.. this is response => ",
        responseFrom_General_Simple
      );

      if (responseFrom_General_Simple)
        SubmitRate(responseFrom_General_Simple.data);
      break;
  }
  return;
  // console.log("submissionData -> ", submissionData);
};
async function SubmitRate(rate: RateSub) {
  try {
    await API.graphql(
      graphqlOperation(mutations.createRateSubmission, {
        input: rate,
      })
    );
  } catch (err) {
    console.log("err puting rate.. ->", err);
  }
}
// function getRateToAddFOBAir(submissionData: IValues) {
//   let ans: RateSub;
//   ans = getRateToAppendFinal({
//     id: "",
//     rateName: submissionData.GeneralInfo.rateName,
//     freightForwarderName: submissionData.GeneralInfo.freightForwarderName,
//     carrierName: submissionData.GeneralInfo.carrierName,
//     rateType: "FOBImportAIR",
//     validFrom: submissionData.GeneralInfo.validFrom,
//     validTo: submissionData.GeneralInfo.validTo,
//     originCharges: "",
//     freightTransportCharges: JSON.stringify(submissionData.FreightTransportAIR),
//     localCharges: JSON.stringify(submissionData.LocalsAIR),
//   });
//   return ans;
// }

// function getRateToAddFOBOcean(submissionData: IValues) {
//   let ans: RateSub;

//   if (submissionData.GeneralInfo.modeOfTransport === "OCEAN") {
//     if (submissionData.GeneralInfo.cargoLoad === "FCL") {
//       // let localChargesHelper_FCL = {
//       //   LocalsOceanFCLFixTable:
//       //     submissionData.LocalsOCEANFCL.LocalsOceanFCLFixTable,
//       //   LocalsOceanFCLByContainerTypeTable:
//       //     submissionData.LocalsOCEANFCL.LocalsOceanFCLByContainerTypeTable,
//       //   thc20: submissionData.LocalsOCEANFCL.thc20,
//       //   thc40: submissionData.LocalsOCEANFCL.thc40,
//       // };
//       console.log("inside getRateToAddFOBOcean, doing OCEAN FOB  ");
//       ans = getRateToAppendFinal({
//         id: "",
//         rateName: submissionData.GeneralInfo.rateName,
//         freightForwarderName: submissionData.GeneralInfo.freightForwarderName,
//         carrierName: submissionData.GeneralInfo.carrierName,
//         rateType: "FOBImportOCEANFCL",
//         validFrom: submissionData.GeneralInfo.validFrom,
//         validTo: submissionData.GeneralInfo.validTo,
//         originCharges: "",
//         freightTransportCharges: JSON.stringify(
//           submissionData.FreightTransportOCEANFCL
//         ),
//         localCharges: JSON.stringify(submissionData.LocalsOCEANFCL),
//       });
//     } else {
//       //means it is LCL and not FCL
//       ans = getRateToAppendFinal({
//         id: "",
//         rateName: submissionData.GeneralInfo.rateName,
//         freightForwarderName: submissionData.GeneralInfo.freightForwarderName,
//         carrierName: submissionData.GeneralInfo.carrierName,
//         rateType: "FOBImportOCEANLCL",
//         validFrom: submissionData.GeneralInfo.validFrom,
//         validTo: submissionData.GeneralInfo.validTo,
//         originCharges: "",
//         freightTransportCharges: JSON.stringify(
//           submissionData.FreightTransportOCEANLCL
//         ),
//         localCharges: JSON.stringify(submissionData.LocalsOCEANLCL),
//       });
//     }
//   } else {
//     return;
//   }
//   console.log(
//     "returnin to aappend from ocean fcl - > getRateToAddFOBOcean- > ",
//     ans
//   );
//   return ans;
// }

// function getRateToAppendFinal(params: RateSub) {
//   let idHelper = uuid();

//   let rateToAddReturn: RateSub = {
//     id: idHelper,
//     rateName: params.rateName,
//     freightForwarderName: params.freightForwarderName,
//     carrierName: params.carrierName,
//     rateType: params.rateType,
//     validFrom: params.validFrom,
//     validTo: params.validTo,
//     originCharges: params.originCharges,
//     freightTransportCharges: params.freightTransportCharges,
//     localCharges: params.localCharges,
//   };
//   return rateToAddReturn;
// }

// async function goSubmitRate(inputToAdd: RateSub) {
//   try {
//     console.log("sumbitting  rate -> ", inputToAdd);
//     await API.graphql(
//       graphqlOperation(mutations.createRateSubmission, {
//         input: inputToAdd,
//       })
//     );
//   } catch (err) {
//     console.log(err);
//   }
// }

// EXWImportOCEANFCL
// EXWImportOCEANLCL
// EXWImportAIRLCL

// CIFImportOCEANLCL
// CIFImportOCEANFCL
// CIFImportAIRLCL

// DAPImportOCEANLCL
// DAPImportOCEANFCL
// DAPImportAIRLCL

// DDPImportOCEANLCL
// DDPImportOCEANFCL
// DDPImportAIRLCL

// FOBExportOCEANLCL
// FOBExportOCEANFCL
// FOBExportAIRLCL

// EXWExportOCEANFCL
// EXWExportOCEANLCL
// EXWExportAIRLCL

// CIFExportOCEANLCL
// CIFExportOCEANFCL
// CIFExportAIRLCL

// DAPExportOCEANLCL
// DAPExportOCEANFCL
// DAPExportAIRLCL

// DDPExportOCEANLCL
// DDPExportOCEANFCL
// DDPExportAIRLCL

// COURIERExport
// COURIERImport

// switch (incoterms) {
//   case "FOB":
//     if (modeOfTransport === "OCEAN") {
//       FOBOceanRateToAdd = getRateToAddFOBOcean(submissionData);
//       if (FOBOceanRateToAdd !== undefined) {
//         await goSubmitRate(FOBOceanRateToAdd);
//         break;
//       }
//     } else {
//       //Means its FOB_AIR
//       FOBAirRateToAdd = getRateToAddFOBAir(submissionData);
//       if (FOBAirRateToAdd !== undefined) {
//         await goSubmitRate(FOBAirRateToAdd);
//       }
//     }
//     break;

//   default:
//     break;
// }
