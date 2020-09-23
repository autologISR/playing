import React, { useState, useEffect } from "react";
import Amplify, { API, graphqlOperation, Auth } from "aws-amplify";
import { uuid } from "uuidv4";
import { IValues } from "../../../common/form/formTypes";
import axios from "axios";

// import * as mutations from "../../../graphql/mutations";
// import * as queries from "../../../graphql/queries";
// import { Switch } from "@material-ui/core";

const requestLmabdaUrl =
  "https://12t8bytiwf.execute-api.eu-west-1.amazonaws.com/default/RFQHan-dev";

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

function goToOffers(id: string) {
  const path = "/offers/?id=" + id;
  var win = window.open(path, "_blank");
  if (win != null) win.focus();
}

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

export const QuoteRequestSubmissions = async (submissionData: IValues) => {
  // const [offers, setOffers] = useState({});
  // const [rfq, setRfq] = useState({});
  // const [offersID, setOfferID] = useState("");

  const currentUserInfo = await Auth.currentUserInfo();
  const userMail = currentUserInfo.attributes.email;

  const { incoTerms, airOcean, region } = submissionData.GeneralInfo;

  let offersHelper = await getOffers(submissionData, userMail);
  console.log("done QuoteRequestSubmissions");
  return;
};

// function getInputForRFQEXW(
//   submissionData: IValues,
//   airOcean: string,
//   region: string,
//   userMail: string
// ) {
//   let helperShipmentDetails;

//   if (airOcean === "Ocean") {
//     helperShipmentDetails = getShipmentsDetailsOcean(submissionData);
//   } else {
//     helperShipmentDetails = getShipmentsDetailsAir(submissionData);
//   }

//   let helperSuppliersDetails = submissionData.SupplierDetails;

//   let detailsToAdd = {
//     genralInfo: submissionData.GeneralInfo,
//     shipmentDetails: helperShipmentDetails,
//     supplierDetails: helperSuppliersDetails,
//   };

//   let idHelper = uuid();
//   let requestidHelper = idHelper + "123";

//   let helper = {
//     id: idHelper,
//     requestID: requestidHelper,
//     fromState: submissionData.SupplierDetails.supplierState,
//     Test: "No",

//     terms: "EXW",
//     airOcean: airOcean,

//     madeByUserMail: userMail,
//     createdAt: date,

//     details: JSON.stringify(detailsToAdd),
//   };
//   return helper;
// }

// switch (incoTerms) {
//   case "EXW":
//     requestForQuote = getInputForRFQEXW(
//       submissionData,
//       airOcean,
//       region,
//       userMail
//     );
//     break;
//   case "FOB":
//     requestForQuote = getInputForRFQFOB(
//       submissionData,
//       airOcean,
//       region,
//       userMail
//     );
//     break;

//   default:
//     break;
// }

// if (requestForQuote) {
//   // setRfq(requestForQuote);

//   try {
//     x = await axios
//       .post(requestLmabdaUrl, { requestForQuote })
//       .then(async (res) => {
//         // console.log("res -> ", res);
//         // console.log("res.data.relevantOffers -> ", res.data.relevantOffers);

//         // setOffers(res.data.relevantOffers);
//         // setOfferID(res.data.offersID);

//         let offers = res.data.relevantOffers;
//         let inputToAddAllRequests = getInputAddAllRequests(
//           requestForQuote,
//           offers
//         );
//         console.log(
//           "this is inputToAddAllRequests -> ",
//           inputToAddAllRequests
//         );

//         let requestAndOffer = await API.graphql(
//           graphqlOperation(mutations.createAllRequests, {
//             input: inputToAddAllRequests,
//           })
//         );

//         let requestID = inputToAddAllRequests.requestID;
//         goToOffers(requestID);

//         // let path = res.data.toString();
//         // goToOffers(path);
//       });
//   } catch (err) {
//     console.log("erroe -> ", err);
//   }
// }

// function handleclikurl() {
//   let id = "id1";
//   const path = "/offers/?id=" + id;
//   openInNewTab(path);
// }

// let requestID = await API.graphql(
//   graphqlOperation(mutations.createAllRequests, {
//     input: inputToAdd,
//   })
// );
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

//   x = await axios
//       .post(requestLmabdaUrl, { requestForQuote })
//       .then(async (res) => {
//         // console.log("res -> ", res);
//         // console.log("res.data.relevantOffers -> ", res.data.relevantOffers);

//         // setOffers(res.data.relevantOffers);
//         // setOfferID(res.data.offersID);

//         let offers = res.data.relevantOffers;
//         let inputToAddAllRequests = getInputAddAllRequests(
//           requestForQuote,
//           offers
//         );
//         console.log(
//           "this is inputToAddAllRequests -> ",
//           inputToAddAllRequests
//         );

//         let requestAndOffer = await API.graphql(
//           graphqlOperation(mutations.createAllRequests, {
//             input: inputToAddAllRequests,
//           })
//         );

//         let requestID = inputToAddAllRequests.requestID;
//         goToOffers(requestID);

//         // let path = res.data.toString();
//         // goToOffers(path);
//       });
//   } catch (err) {
//     console.log("erroe -> ", err);
//   }

// function getInputForRFQFOB(
//   submissionData: IValues,
//   airOcean: string,
//   region: string,
//   userMail: string
// ) {
//   let helperShipmentDetails;
//   if (airOcean === "Ocean") {
//     helperShipmentDetails = getShipmentsDetailsOcean(submissionData);
//   } else {
//     helperShipmentDetails = getShipmentsDetailsAir(submissionData);
//   }

//   let locationFOBHelper;
//   switch (region) {
//     case "USA":
//       if (airOcean === "Air") {
//         locationFOBHelper = submissionData.LocationFOBAirUSA;
//       } else {
//         locationFOBHelper = submissionData.LocationFOBOceanUSA;
//       }
//       break;

//     case "Europe":
//       if (airOcean === "Air") {
//         locationFOBHelper = submissionData.LocationFOBAirEurope;
//       } else {
//         locationFOBHelper = submissionData.LocationFOBOceanEurope;
//       }
//       break;

//     case "FarEast":
//       if (airOcean === "Air") {
//         locationFOBHelper = submissionData.LocationFOBAirFarEast;
//       } else {
//         locationFOBHelper = submissionData.LocationFOBOceanFarEast;
//       }
//       break;

//     default:
//       locationFOBHelper = { state: "", portFrom: "" };
//       break;
//   }

//   console.log("this is locationFOB -> ", locationFOBHelper);

//   let detailsToAdd = {
//     genralInfo: submissionData.GeneralInfo,
//     shipmentDetails: helperShipmentDetails,
//     locationFob: locationFOBHelper,
//   };

//   let idHelper = uuid();
//   let requestidHelper = idHelper + "123";

//   let helper = {
//     id: idHelper,
//     requestID: requestidHelper,
//     offersID: uuid(),
//     fromRegion: region,
//     fromState: locationFOBHelper.state,
//     fromPort: locationFOBHelper.portFrom,
//     Test: "No",
//     terms: "FOB",
//     airOcean: airOcean,

//     madeByUserMail: userMail,
//     createdAt: date,
//     status: "Pending",

//     details: JSON.stringify(detailsToAdd),
//   };
//   return helper;
// }
