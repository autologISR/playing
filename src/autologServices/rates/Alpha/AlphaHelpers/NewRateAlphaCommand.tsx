import React, { useState, useEffect } from "react";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { uuid } from "uuidv4";
import { IValues } from "../../../../common/form/formTypes";
import axios from "axios";
import * as mutations from "../../../../graphql/mutations";
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

function getRateToAddFOBAir(submissionData: IValues) {
  let ans: RateSub;
  ans = getRateToAppendFinal({
    id: "",
    rateName: submissionData.GeneralInfo.rateName,
    freightForwarderName: submissionData.GeneralInfo.freightForwarderName,
    carrierName: submissionData.GeneralInfo.carrierName,
    rateType: "FOBImportAIR",
    validFrom: submissionData.GeneralInfo.validFrom,
    validTo: submissionData.GeneralInfo.validTo,
    originCharges: "",
    freightTransportCharges: JSON.stringify(submissionData.FreightTransportAIR),
    localCharges: JSON.stringify(submissionData.LocalsAIR),
  });
  return ans;
}

function getRateToAddFOBOcean(submissionData: IValues) {
  let ans: RateSub;
  if (submissionData.GeneralInfo.modeOfTransport === "OCEAN") {
    if (submissionData.GeneralInfo.cargoLoad === "FCL") {
      ans = getRateToAppendFinal({
        id: "",
        rateName: submissionData.GeneralInfo.rateName,
        freightForwarderName: submissionData.GeneralInfo.freightForwarderName,
        carrierName: submissionData.GeneralInfo.carrierName,
        rateType: "FOBImportOCEANFCL",
        validFrom: submissionData.GeneralInfo.validFrom,
        validTo: submissionData.GeneralInfo.validTo,
        originCharges: "",
        freightTransportCharges: JSON.stringify(
          submissionData.FreightTransportOCEANFCL
        ),
        localCharges: JSON.stringify(submissionData.LocalsOCEANFCL),
      });
    } else {
      //means it is LCL and not FCL
      ans = getRateToAppendFinal({
        id: "",
        rateName: submissionData.GeneralInfo.rateName,
        freightForwarderName: submissionData.GeneralInfo.freightForwarderName,
        carrierName: submissionData.GeneralInfo.carrierName,
        rateType: "FOBImportOCEANLCL",
        validFrom: submissionData.GeneralInfo.validFrom,
        validTo: submissionData.GeneralInfo.validTo,
        originCharges: "",
        freightTransportCharges: JSON.stringify(
          submissionData.FreightTransportOCEANLCL
        ),
        localCharges: JSON.stringify(submissionData.LocalsOCEANLCL),
      });
    }
  } else {
    return;
  }

  return ans;
}

function getRateToAppendFinal(params: RateSub) {
  let idHelper = uuid();

  let rateToAddReturn: RateSub = {
    id: idHelper,
    rateName: params.rateName,
    freightForwarderName: params.freightForwarderName,
    carrierName: params.carrierName,
    rateType: params.rateType,
    validFrom: params.validFrom,
    validTo: params.validTo,
    originCharges: params.originCharges,
    freightTransportCharges: params.freightTransportCharges,
    localCharges: params.localCharges,
  };
  return rateToAddReturn;
}

async function goSubmitRate(inputToAdd: RateSub) {
  try {
    console.log("sumbitting  rate -> ", inputToAdd);
    await API.graphql(
      graphqlOperation(mutations.createRateSubmission, {
        input: inputToAdd,
      })
    );
  } catch (err) {
    console.log(err);
  }
}
export const newRateSubmissions = async (submissionData: IValues) => {
  const currentUserInfo = await Auth.currentUserInfo();
  // const userMail = currentUserInfo.attributes.email;

  const { incoterms, modeOfTransport } = submissionData.GeneralInfo;
  let FOBOceanRateToAdd: RateSub | undefined = undefined;
  let FOBAirRateToAdd: RateSub | undefined = undefined;
  let actualInputToAdd: RateSub;
  console.log("this is params $$$ ", incoterms, modeOfTransport);

  switch (incoterms) {
    case "FOB":
      if (modeOfTransport === "OCEAN") {
        FOBOceanRateToAdd = getRateToAddFOBOcean(submissionData);
        if (FOBOceanRateToAdd !== undefined) {
          goSubmitRate(FOBOceanRateToAdd);
          break;
        }
      } else {
        //Means its FOB_AIR
        FOBAirRateToAdd = getRateToAddFOBAir(submissionData);
        if (FOBAirRateToAdd !== undefined) {
          goSubmitRate(FOBAirRateToAdd);
        }
      }
      break;

    default:
      break;
  }
  return;
  // console.log("submissionData -> ", submissionData);
};

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
