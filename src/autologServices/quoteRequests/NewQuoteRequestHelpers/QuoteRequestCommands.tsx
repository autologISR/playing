import React, { useState, useEffect } from "react";
import Amplify, { API, graphqlOperation, Auth } from "aws-amplify";
import { uuid } from "uuidv4";
import { IValues } from "../../../common/form/formTypes";
import axios from "axios";
import * as mutations from "../../../graphql/mutations";
// import * as queries from "../../../graphql/queries";
// import { Switch } from "@material-ui/core";

const requestLmabdaUrl =
  "https://12t8bytiwf.execute-api.eu-west-1.amazonaws.com/default/RFQHan-dev";

let date: Date = new Date();

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function goToOffers(id: string) {
  const path = "/offers/?id=" + id;
  var win = window.open(path);
  // var win = window.open(path, "_blank");
  if (win != null) win.focus();
}

//goes axios for requestLmabdaUrl
//recives the oferrs
async function getOffers(requestForQuote: IValues, userMail: string) {
  let offers = undefined;
  let idHelper = uuid();
  let RFQHelper = {
    ...requestForQuote,
    requestID: idHelper,
    userMail: userMail,
  };
  console.log("inside getOffers this is RFQHelper -> ", RFQHelper);

  try {
    offers = await axios.post(requestLmabdaUrl, { RFQHelper }).then((res) => {
      console.log("response from RFQ HANDLER -> ", res);
      return res;
    });
  } catch (err) {
    console.log(err);
  }
  if (offers !== undefined) {
    console.log("offers not undefined! -> ", offers);
    return offers;
  } else {
    console.log("offers are undefined!");
    return "";
  }
}

//todo - add params Type
async function AppenedAllRequests(offersHelper: any, submissionData: IValues) {
  let requestID = offersHelper.data.requestID;
  let terms = submissionData.GeneralInfo.incoTerms;
  let airOcean = submissionData.GeneralInfo.airOcean;

  let inputToAddAllRequest;
  switch (terms) {
    case "FOB":
      if (airOcean === "Air")
        inputToAddAllRequest = GetInputFobAir(
          offersHelper.data,
          submissionData
        );
      break;

    default:
      break;
  }

  console.log("offersHelper -> ", offersHelper);
  console.log("submissionData -> ", submissionData);
  console.log("inputToAddAllRequest -> ", inputToAddAllRequest);

  if (inputToAddAllRequest) {
    await API.graphql(
      graphqlOperation(mutations.createAllRequests, {
        input: inputToAddAllRequest,
      })
    );

    goToOffers(inputToAddAllRequest.id);
  }
}

function GetInputFobAir(offersData: any, submissionData: IValues) {
  let id = offersData.requestID;
  let fromRegion = submissionData.GeneralInfo.region;
  let fromState, fromPort;
  let terms = submissionData.GeneralInfo.incoTerms;
  let airOcean = submissionData.GeneralInfo.airOcean;
  let madeByUserMail = offersData.madeByUserMail;
  let createdAt = new Date();
  let details = { offersData, submissionData };
  let Test = "NO";
  let offersCount = offersData.relevantOffers.length;
  let offers = offersData.relevantOffers;

  switch (fromRegion) {
    case "USA":
      fromState = submissionData.LocationFOBAirUSA.state;
      fromPort = submissionData.LocationFOBAirUSA.portFrom;
      break;
    case "Europe":
      fromState = submissionData.LocationFOBAirEurope.state;
      fromPort = submissionData.LocationFOBAirEurope.portFrom;
      break;
    case "FarEast":
      fromState = submissionData.LocationFOBAirFarEast.state;
      fromPort = submissionData.LocationFOBAirFarEast.portFrom;
      break;
    default:
      break;
  }
  return {
    id: id,
    fromRegion: fromRegion,
    fromState: fromState,
    terms: terms,
    airOcean: airOcean,
    madeByUserMail: madeByUserMail,
    createdAt: createdAt,
    details: JSON.stringify(details),
    Test: Test,
    offersCount: offersCount,
    offers: JSON.stringify(offers),
  };
}

export const QuoteRequestSubmissions = async (submissionData: IValues) => {
  const currentUserInfo = await Auth.currentUserInfo();
  const userMail = currentUserInfo.attributes.email;

  const { incoTerms, airOcean, region } = submissionData.GeneralInfo;

  let offersHelper = await getOffers(submissionData, userMail);
  if (offersHelper) {
    console.log("offersHelper -> ", offersHelper);

    await AppenedAllRequests(offersHelper, submissionData);

    //appened all request
    // get id
    //go to offers
  }
  console.log("done QuoteRequestSubmissions");
  return;
};
