import React, { useState, useEffect } from "react";
import Amplify, { API, graphqlOperation, Auth } from "aws-amplify";
import { uuid } from "uuidv4";
import { IValues } from "../../../common/form/formTypes";
import axios from "axios";
import * as mutations from "../../../graphql/mutations";
import { listDeclinedRfQs } from "../../../graphql/queries";
// import * as queries from "../../../graphql/queries";
// import { Switch } from "@material-ui/core";

const exchangeUrl_EUR = "https://api.exchangeratesapi.io/latest?base=EUR";
const exchangeUrl_ILS = "https://api.exchangeratesapi.io/latest?base=ILS";
const exchangeUrl_USD = "https://api.exchangeratesapi.io/latest?base=USD";

const RFQ_FOB_AIR_Lambda =
  "https://k95s9rnfm9.execute-api.eu-west-1.amazonaws.com/default/RFQFobAir-dev";

const RFQ_FOB_OceanFCL_Lambda = "";

const RFQ_FOB_OceanLCL_Lambda = "";

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
interface request {
  fromRegion: string;
  fromState: string;
  fromPort: string;

  incoterms: string;
  modeOfTransport: string;

  madeByUserMail: string;
  createdAt: string;

  status: string;
  details: string;

  Test: string;

  offersCount: string;
  offers: string;
}

interface exchanges {
  eurToUSD: number;
  nisToUSD: number;
  usdToNis: number;
  usdToEur: number;
}

//goes axios for requestLmabdaUrl
//recives the oferrs
async function getOffers(
  requestForQuote: IValues,
  userMail: string,
  exchanges: exchanges
) {
  let offers = undefined;
  const {
    incoterms,
    modeOfTransport,
    cargoLoad,
    region,
  } = requestForQuote.GeneralInfo;
  let idHelper = uuid();
  let RFQHelper = {
    ...requestForQuote,
    requestID: idHelper,
    userMail: userMail,
    exchanges: exchanges,
    user: { userDeltaUSD: 0.3 },
  };

  let responseFromRFQ;
  try {
    switch (incoterms) {
      case "FOB":
        // console.log(
        //   "inside getOffers -> case if FOB -  this is RFQHelper -> ",
        //   RFQHelper
        // );

        if (modeOfTransport === "Air") {
          responseFromRFQ = await axios
            .post(RFQ_FOB_AIR_Lambda, { RFQHelper })
            .then((res) => {
              // console.log("response from RFQ HANDLER.. AirFob -> ", res);
              return res;
            });
        } else {
          //RFQ IS OCEAN
          if (cargoLoad === "FCL") {
            responseFromRFQ = await axios
              .post(RFQ_FOB_OceanFCL_Lambda, { RFQHelper })
              .then((res) => {
                // console.log("response from RFQ HANDLER -> ", res);
                return res;
              });
          } else {
            //Means OCEAN LCL
            responseFromRFQ = await axios
              .post(RFQ_FOB_OceanLCL_Lambda, { RFQHelper })
              .then((res) => {
                // console.log("response from RFQ HANDLER -> ", res);
                return res;
              });
          } //end else of LCL
        } // end else of OCEAN
    }
    // console.log("this is response from RFQ -> ", responseFromRFQ);
    return responseFromRFQ;
  } catch (err) {
    console.log("error -> ", err);
  }
}

function goToNoValidRatesPage() {
  const path = "/NOOFFERS";
  var win = window.open(path);
  // var win = window.open(path, "_blank");
  if (win != null) win.focus();
}

//todo - add params Type
async function AppenedAllRequests(
  offersHelper: any,
  submissionData: IValues,
  userMail: string
) {
  console.log("123456789 -> ", offersHelper);
  let requestID = offersHelper.requestID;
  let terms = submissionData.GeneralInfo.incoterms;
  let modeOfTransport = submissionData.GeneralInfo.modeOfTransport;

  let inputToAddAllRequest;

  switch (terms) {
    case "FOB":
      if (modeOfTransport === "Air") {
        inputToAddAllRequest = GetInputFobAir_AppendingAllRequests(
          offersHelper,
          submissionData,
          userMail
        );
        console.log(
          "AppenedAllRequests.. this is inputToAddAllRequest ->",
          inputToAddAllRequest
        );
      } else {
        //Means its FOB OCEAN
        inputToAddAllRequest = GetInputFobOcean(
          offersHelper.data,
          submissionData
        );
      }

      break;

    default:
      break;
  }

  // console.log("offersHelper -> ", offersHelper);
  // console.log("submissionData -> ", submissionData);
  console.log("inputToAddAllRequest -> ", inputToAddAllRequest);
  try {
    if (inputToAddAllRequest) {
      await API.graphql(
        graphqlOperation(mutations.createAllRequests, {
          input: inputToAddAllRequest,
        })
      );

      goToOffers(inputToAddAllRequest.id);
    }
  } catch (err) {
    console.log("error putting allrequest.. ", err);
  }
}

function GetInputFobOcean(offersData: any, submissionData: IValues) {
  let id = offersData.requestID;
  let fromRegion = submissionData.GeneralInfo.region;
  // let fromState, submissionData.;
  let incoterms = submissionData.GeneralInfo.incoterms;
  let modeOfTransport = submissionData.GeneralInfo.modeOfTransport;
  let madeByUserMail = offersData.madeByUserMail;
  // let createdAt = new Date();
  let details = { offersData, submissionData };
  let Test = "NO";
  let offersCount = offersData.relevantOffers.length;
  let offers = offersData.relevantOffers;

  let fromState, fromPort;

  switch (fromRegion) {
    case "USA":
      fromState = submissionData.LocationFOBOceanUSA.state;
      fromPort = submissionData.LocationFOBOceanUSA.portFrom;
      break;
    case "Europe":
      fromState = submissionData.LocationFOBOceanEurope.state;
      fromPort = submissionData.LocationFOBOceanEurope.portFrom;
      break;
    case "FarEast":
      fromState = submissionData.LocationFOBOceanFarEast.state;
      fromPort = submissionData.LocationFOBOceanFarEast.portFrom;
      break;
    default:
      break;
  }
  return {
    id: id,
    fromRegion: fromRegion,
    fromState: fromState,
    fromPort: fromPort,
    incoterms: incoterms,
    modeOfTransport: modeOfTransport,
    madeByUserMail: madeByUserMail,
    // createdAt: createdAt,
    details: JSON.stringify(details),
    Test: Test,
    offersCount: offersCount,
    offers: JSON.stringify(offers),
  };
}

function GetInputFobAir_AppendingAllRequests(
  offersData: any,
  submissionData: IValues,
  userMail: string
) {
  let requestID = offersData.requestID;
  let fromRegion = submissionData.GeneralInfo.region;
  let incoterms = submissionData.GeneralInfo.incoterms;
  let modeOfTransport = submissionData.GeneralInfo.modeOfTransport;
  let madeByUserMail = userMail;
  // let createdAt = new Date();
  let details = { offersData, submissionData };
  let Test = "NO";
  let offersCount = offersData.relevantOffers.length;
  let offers = offersData.relevantOffers;

  let fromState, fromPort;

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
    id: requestID,
    fromRegion: fromRegion,
    fromState: fromState,
    fromPort: fromPort,
    incoterms: incoterms,
    modeOfTransport: modeOfTransport,
    madeByUserMail: madeByUserMail,
    details: JSON.stringify(details),
    Test: Test,
    offersCount: offersCount,
    offers: JSON.stringify(offers),
  };
}
async function getExchanges() {
  let resEURHelper = await axios.get(exchangeUrl_EUR);
  let resNISHelper = await axios.get(exchangeUrl_ILS);
  let resUSDHelper = await axios.get(exchangeUrl_USD);

  let resEUR = resEURHelper.data.rates.USD;
  let resNIS = resNISHelper.data.rates.USD;

  let res_USDtoEur = resUSDHelper.data.rates.EUR;
  let res_USDtoNis = resUSDHelper.data.rates.ILS;
  return {
    eurToUSD: resEUR,
    nisToUSD: resNIS,
    usdToNis: res_USDtoNis,
    usdToEur: res_USDtoEur,
  };
}

export const QuoteRequestSubmissions = async (submissionData: IValues) => {
  // const currentUserInfo = await Auth.currentUserInfo();
  // const userMail = currentUserInfo.attributes.email;
  let userMail = "autolog@gmail.com<fake>";

  // const [nisToUsd, setNisToUsd] = useState(-1);
  // const [eurToUsd, setEurToUsd] = useState(-1);

  // const [usdToNis, setUsdToNis] = useState(-1)
  // const [usdToEur, setUsdToEur] = useState(-1)
  let exchanges = await getExchanges();

  let offersHelper = await getOffers(submissionData, userMail, exchanges);

  //if there are relevant offers we procceed to offers Page
  if (offersHelper) {
    if (offersHelper.status === 200) {
      console.log("offersHelper status 200 ");
      console.log("offersHelper -> ", offersHelper);

      await AppenedAllRequests(
        offersHelper.data.offers,
        submissionData,
        userMail
      );
    }
    if (offersHelper.status === 217) {
      goToNoValidRatesPage();
    }
  }
  console.log("done QuoteRequestSubmissions");
  return;
};
