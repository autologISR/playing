import React from "react";
import { uuid } from "uuidv4";
import { IValues } from "../../../../common/form/formTypes";
import axios from "axios";
let createdAt = new Date().toISOString();

const LambdaFobOceanLCL =
  " https://1ck4qsbez0.execute-api.eu-west-1.amazonaws.com/default/rateSimpleOceanLCLFob-dev";
const LambdaFobAirURL =
  "https://7fmcjzpbz5.execute-api.eu-west-1.amazonaws.com/default/rateSimpleAirFob-dev";

const LambdaForOceanFCL =
  "https://0q9k8y7xxl.execute-api.eu-west-1.amazonaws.com/default/rateSimpleOceanFCLFob-dev";

export async function simple_AIR_FobRate(submissionData: IValues) {
  console.log("entered simple_AIR_FobRate");

  let rateID = uuid();
  let submmisionHelper = {
    ...submissionData,
    rateID,
  };
  let response = await axios.post(LambdaFobAirURL, { submmisionHelper });
  console.log(
    "inside simple_AIR_FobRate, AFTER POSTING.. this is response -> ",
    response
  );
  return response;
}

export async function simple_OCEANFCL_FobRate(submissionData: IValues) {
  console.log("entered simple_OCEANFCL_FobRate");

  let rateID = uuid();
  let submmisionHelper = {
    ...submissionData,
    rateID,
  };
  let response = await axios.post(LambdaForOceanFCL, { submmisionHelper });
  console.log(
    "inside simple_OCEANFCL_FobRate, AFTER POSTING.. this is response -> ",
    response
  );
  return response;
}

export async function simple_OCEANLCL_FobRate(submissionData: IValues) {
  console.log("entered simple_OCEANLCL_FobRate");

  let rateID = uuid();
  let submmisionHelper = {
    ...submissionData,
    rateID,
  };
  let response = await axios.post(LambdaFobOceanLCL, { submmisionHelper });
  console.log(
    "inside simple_OCEANLCL_FobRate, AFTER POSTING.. this is response -> ",
    response
  );
  return response;
}
