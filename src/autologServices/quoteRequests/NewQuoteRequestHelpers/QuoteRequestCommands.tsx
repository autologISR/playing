import React, { useState, useEffect } from "react";
import Amplify, { API, graphqlOperation, Auth } from "aws-amplify";
import * as mutations from "../../../graphql/mutations";
import * as queries from "../../../graphql/queries";
import { uuid } from "uuidv4";
import { IValues } from "../../../common/form/formTypes";
import { Switch } from "@material-ui/core";
import axios from "axios";

const requestLmabdaUrl =
  // "https://9cv95bz5b9.execute-api.eu-west-1.amazonaws.com/default/quoteRequestHandler-dev";
  "https://9cv95bz5b9.execute-api.eu-west-1.amazonaws.com/default/hello-dev";

let date: Date = new Date();

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getShipmentsDetailsOcean(submissionData: IValues) {
  let conainerType = submissionData.GeneralInfo.shipmentType;
  if (conainerType === "FCL") return submissionData.ShipmentDetailsOceanFCL;
  else return submissionData.ShipmentDetailsOceanLCL;
}
function getShipmentsDetailsAir(submissionData: IValues) {
  let shipmentDetails = submissionData.ShipmentDetailsAir;
  return shipmentDetails;
}

function getInputForRFQEXW(
  submissionData: IValues,
  airOcean: string,
  region: string,
  userMail: string
) {
  let helperShipmentDetails;
  if (airOcean === "Ocean") {
    helperShipmentDetails = getShipmentsDetailsOcean(submissionData);
  } else {
    helperShipmentDetails = getShipmentsDetailsAir(submissionData);
  }

  let helperSuppliersDetails = submissionData.SupplierDetails;

  let detailsToAdd = {
    genralInfo: submissionData.GeneralInfo,
    shipmentDetails: helperShipmentDetails,
    supplierDetails: helperSuppliersDetails,
  };

  let idHelper = uuid()
  let requestidHelper = idHelper + "123"

  let helper = {
    id:idHelper,
    requestID: requestidHelper,
    offersID: uuid(),
    fromRegion: region,
    fromState: submissionData.SupplierDetails.supplierState,
    Test:"No",

    terms: "EXW",
    airOcean: airOcean,

    madeByUserMail: userMail,
    createdAt: date,
    status: "Pending",

    details: JSON.stringify(detailsToAdd),
  };
  return helper;
}

function getInputForRFQFOB(
  submissionData: IValues,
  airOcean: string,
  region: string,
  userMail: string
) {
  let helperShipmentDetails;
  if (airOcean === "Ocean") {
    helperShipmentDetails = getShipmentsDetailsOcean(submissionData);
  } else {
    helperShipmentDetails = getShipmentsDetailsAir(submissionData);
  }

  let locationFOBHelper;
  switch (region) {
    case "USA":
      if (airOcean === "Air") {
        locationFOBHelper = submissionData.LocationFOBAirUSA;
      } else {
        locationFOBHelper = submissionData.LocationFOBOceanUSA;
      }
      break;

    case "Europe":
      if (airOcean === "Air") {
        locationFOBHelper = submissionData.LocationFOBAirEurope;
      } else {
        locationFOBHelper = submissionData.LocationFOBOceanEurope;
      }
      break;

    case "FarEast":
      if (airOcean === "Air") {
        locationFOBHelper = submissionData.LocationFOBAirFarEast;
      } else {
        locationFOBHelper = submissionData.LocationFOBOceanFarEast;
      }
      break;

    default:
      locationFOBHelper = { state: "", portFrom: "" };
      break;
  }

  console.log("this is locationFOB -> ", locationFOBHelper);

  let detailsToAdd = {
    genralInfo: submissionData.GeneralInfo,
    shipmentDetails: helperShipmentDetails,
    locationFob: locationFOBHelper,
  };

  let idHelper = uuid();
  let requestidHelper = idHelper + "123";

  let helper = {
    id: idHelper,
    requestID: requestidHelper,
    offersID: uuid(),
    fromRegion: region,
    fromState: locationFOBHelper.state,
    fromPort: locationFOBHelper.portFrom,
    Test:"No",
    terms: "FOB",
    airOcean: airOcean,

    madeByUserMail: userMail,
    createdAt: date,
    status: "Pending",

    details: JSON.stringify(detailsToAdd),
  };
  return helper;
}

function goToOffers(id: string) {
  const path = "/offers/?id=" + id;
  var win = window.open(path, "_blank");
  if (win != null) win.focus();
}

function getInputAddAllRequests(rfq: any, offers: any) {
  return { ...rfq, offers: offers };
}

export const QuoteRequestSubmissions = async (submissionData: IValues) => {
  // const [offers, setOffers] = useState({});
  // const [rfq, setRfq] = useState({});
  // const [offersID, setOfferID] = useState("");

  const currentUserInfo = await Auth.currentUserInfo();
  const userMail = currentUserInfo.attributes.email;
  let requestForQuote: any;

  const { incoTerms, airOcean, region } = submissionData.GeneralInfo;

  switch (incoTerms) {
    case "EXW":
      requestForQuote = getInputForRFQEXW(
        submissionData,
        airOcean,
        region,
        userMail
      );
      break;
    case "FOB":
      requestForQuote = getInputForRFQFOB(
        submissionData,
        airOcean,
        region,
        userMail
      );

    default:
      break;
  }

  console.log("requestForQuote -> ", requestForQuote);

  // let requestID = await API.graphql(
  //   graphqlOperation(mutations.createAllRequests, {
  //     input: inputToAdd,
  //   })
  // );

  let x;
  // console.log("requestID -> ", requestID);

  if (requestForQuote) {
    // setRfq(requestForQuote);

    try {
      x = await axios
        .post(requestLmabdaUrl, { requestForQuote })
        .then(async (res) => {
          // console.log("res -> ", res);
          // console.log("res.data.relevantOffers -> ", res.data.relevantOffers);

          // setOffers(res.data.relevantOffers);
          // setOfferID(res.data.offersID);

          let offers = res.data.relevantOffers;
          let inputToAddAllRequests = getInputAddAllRequests(
            requestForQuote,
            offers
          );
          console.log(
            "this is inputToAddAllRequests -> ",
            inputToAddAllRequests
          );

          let requestAndOffer = await API.graphql(
            graphqlOperation(mutations.createAllRequests, {
              input: inputToAddAllRequests,
            })
          );

          let requestID = inputToAddAllRequests.requestID;
          goToOffers(requestID);

          // let path = res.data.toString();
          // goToOffers(path);
        });
    } catch (err) {
      console.log("erroe -> ", err);
    }
  }

  // try {
  //   offersID = await axios
  //     .post(requestLmabdaUrl, { inputToAdd })
  //     .then((res) => {
  //       console.log("res -> ", res);

  //       console.log("res.data -> ", res.data);
  //       let path = res.data.toString();
  //       goToOffers(path);
  //       console.log("MadeItTOHERE");
  //     });
  // } catch (err) {
  //   console.log("error -> ", err);
  // }
  await delay(3000);

  // console.log("offersID -> ", offersID);
  return;
};

// function handleclikurl() {
//   let id = "id1";
//   const path = "/offers/?id=" + id;
//   openInNewTab(path);
// }
