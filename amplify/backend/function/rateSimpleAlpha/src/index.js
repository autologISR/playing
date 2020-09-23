/*
This function recives a RFQ, proccess it (relevant rates + rating them)
=> sends back the id at offerstable (not offersID)
*/
var AWS = require("aws-sdk");
AWS.config.update({ region: "eu-west-1" });
const docClient = new AWS.DynamoDB.DocumentClient({ region: "eu-west-1" });

exports.handler = async (event) => {
  let params;
  let hash;

  if (
    JSON.parse(event.body).requestForQuote.Test ===
    "fakeRequest_OCEAN_FCL_FAREAST_FOB"
  ) {
    console.log("entered Test");

    params = InitialFake_FCL_OCEAN_FAREAST_FOB(
      JSON.parse(event.body).requestForQuote
    );
    hash = "FOBImportOCEANFCL";
    // terms + "Import" + "OCEAN" + containerTyp =
    console.log("params -> ", params);
  } else {
    console.log("entered Not Test");
    console.log("event -> ", event);

    console.log("JSON.parse(event.body) -> ", JSON.parse(event.body));

    //fetching request
    let request = JSON.parse(event.body).requestForQuote;
    // console.log("request -> ", request);

    //initializing parmas from request
    params = initial(request);
    console.log("params -> ", params);

    console.log("event.body => ", event.body);
    console.log(JSON.parse(event.body));

    //constructing hash for relevant rates
    hash = getHashImport(
      params.fromRegion,
      params.fromState,
      params.terms,
      params.airOcean,
      params.containerType
    );
  }

  let response = {
    statusCode: 0,
    body: "",
  };

  //building query params
  //       EWX -> Using State
  //       FOB -> Using Port
  let paramsForQuery = getParamsForQueryRelevanyRates(
    hash,
    params.fromState,
    params.fromPort
  );
  console.log("paramsForQuery -> ", paramsForQuery);

  await docClient
    .query(paramsForQuery, function(err, data) {
      if (err) {
        response = {
          statusCode: 400,
          body: "",
        };
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
      }
    })
    .promise()
    .then((res) => {
      console.log("Query succeeded");

      if (res.Count > 0) {
        console.log("there are " + res.Count + " valid rates found");
        // console.log(res.Items)

        let offers = makeOffersForAppendTable(res.Items, params);
        console.log("offers -> ", offers);
        response = {
          statusCode: 200,
          body: JSON.stringify(offers),
        };
      } else {
        response = {
          statusCode: 400,
          body: "",
        };
        console.log("no valid rates found");
      }
    });

  console.log("done");
  return response;
};

function updateOffers(offers) {
  let offesHelper = {
    id: offers.offersID + "123",
    offersID: offers.offersID,
    requestID: offers.requestID,
    madeByUserMail: offers.madeByUserMail,
    relevantOffers: offers.relevantOffers,
  };
  let params = {
    TableName: "offers-3pjs4yu4wbfp7csh4v4j6x3yla-dev",
    Item: offesHelper,
  };
  docClient
    .put(params)
    .promise()
    .catch((e) => console.log("error ", e));
}

function getHashImport(fromRegion, fromState, terms, airOcean, containerType) {
  let hash;

  if (airOcean === "Air") hash = terms + "Import" + "AIR" + "LCL";
  else hash = terms + "Import" + "OCEAN" + containerType;

  return hash;
}

function InitialFake_FCL_OCEAN_FAREAST_FOB(rfq) {
  console.log(rfq);
  let initialPropsFOB = {
    requestID: rfq.requestID,
    offersID: rfq.offersID,
    fromRegion: rfq.fromRegion,
    fromState: rfq.fromState,
    fromPort: rfq.fromPort,
    terms: "FOB",
    airOcean: rfq.airOcean,
    madeByUserMail: rfq.madeByUserMail,
    containerType: "FCL",
    details: rfq.detailsHelper,
    shipmentDetails: rfq.shipmentDetailsHelper,
    genralInfo: rfq.generalInfoHelper,
  };
  return initialPropsFOB;
}

function initial(request) {
  console.log("inside initial.. this is request -> ", request);
  let terms = request.GeneralInfo.incoTerms;
  console.log("inside iniitial.. this is terms -> ", terms);
  switch (terms) {
    case "EXW":
      let initialPropsEXW = initialEXW(request);
      return initialPropsEXW;
      break;

    case "FOB":
      let initialPropsFOB = initialFOB(request);
      return initialPropsFOB;
      break;
    default:
      break;
  }
}

function initialFOB(request) {
  console.log("entered initial FOB");
  console.log("inse initialFOB -- request -> ", request);

  let airOcean = request.GeneralInfo.airOcean;

  let detailsHelper = JSON.parse(request.details);

  let generalInfoHelper = detailsHelper.genralInfo;
  let locationFob = detailsHelper.locationFob;
  let shipmentDetailsHelper = detailsHelper.shipmentDetails;

  let containerTypeHelper = "";

  console.log("generalInfoHelper -> ", generalInfoHelper);

  if (request.airOcean === "Ocean") {
    containerTypeHelper = generalInfoHelper.shipmentType;
  }
  console.log("locationFob -> ", locationFob);
  console.log("containerTypeHelper -> ", containerTypeHelper);

  let initialPropsFOB = {
    requestID: request.requestID,
    offersID: request.offersID,
    fromRegion: request.fromRegion,
    fromState: request.fromState,
    fromPort: locationFob.portFrom,
    terms: "FOB",
    airOcean: request.airOcean,
    madeByUserMail: request.madeByUserMail,
    containerType: containerTypeHelper,
    details: detailsHelper,
    shipmentDetails: shipmentDetailsHelper,
    genralInfo: generalInfoHelper,
  };
  return initialPropsFOB;
}
function initialFob_AIR() {}

function initialEXW(request) {
  let detailsHelper = JSON.parse(request.details);
  let generalInfoHelper = detailsHelper.genralInfo;
  let supplierDetails = detailsHelper.supplierDetails;
  let shipmentDetailsHelper = detailsHelper.shipmentDetails;

  let containerTypeHelper = "";

  // console.log("request -> ", request);
  // console.log("detailsHelper -> ", detailsHelper);
  // console.log("generalInfoHelper -> ", generalInfoHelper);

  console.log("generalInfoHelper -> ", generalInfoHelper);
  if (request.airOcean === "Ocean") {
    containerTypeHelper = generalInfoHelper.shipmentType;
  }

  let initialPropsEXW = {
    requestID: request.requestID,
    offersID: request.offersID,
    fromRegion: request.fromRegion,
    fromState: request.fromState,
    fromPort: "",
    terms: "EXW",
    airOcean: request.airOcean,
    madeByUserMail: request.madeByUserMail,
    containerType: containerTypeHelper,
    details: detailsHelper,
    shipmentDetails: shipmentDetailsHelper,
    genralInfo: generalInfoHelper,
  };
  // console.log("initialPropsEXW -> ", initialPropsEXW);
  return initialPropsEXW;
}

function getParamsForQueryRelevanyRates(hash, state, port) {
  let table = "IMPORTRatesSimplified-3pjs4yu4wbfp7csh4v4j6x3yla-dev";
  let Index_FOB = "rateHash-portFrom-index";
  let Index_EXW = "rateHash-state-index";

  let myCase;
  if (
    hash === "FOBImportOCEANLCL" ||
    hash === "FOBImportOCEANFCL" ||
    hash === "FOBImportAIRLCL"
  ) {
    myCase = "FOB";
  }

  if (
    hash === "EXWImportOCEANFCL" ||
    hash === "EXWImportOCEANLCL" ||
    hash === "EXWImportAIRLCL"
  ) {
    myCase = "EXW";
  }

  console.log("myCase -> ", myCase);

  let ans;
  switch (myCase) {
    case "FOB":
      console.log("im inside hash fob-> ", hash);
      ans = {
        TableName: table,
        IndexName: Index_FOB,
        KeyConditionExpression:
          "#rateHash = :rateHash and #portFrom = :portFrom",
        ExpressionAttributeNames: {
          "#rateHash": "rateHash",
          "#portFrom": "portFrom",
        },
        ExpressionAttributeValues: {
          ":rateHash": hash,
          ":portFrom": port,
        },
      };
      return ans;
      break;

    case "EXW":
      console.log("im inside hash exw-> ", hash);

      ans = {
        TableName: table,
        IndexName: Index_EXW,
        KeyConditionExpression: "#rateHash = :rateHash and #state = :state",
        ExpressionAttributeNames: {
          "#rateHash": "rateHash",
          "#state": "state",
        },
        ExpressionAttributeValues: {
          ":rateHash": hash,
          ":state": state,
        },
      };
      return ans;
      break;

    default:
      console.log("NOT GOOD -> THIS IS  HASH -> ", hash);
      break;
  }
}

function makeOffersForAppendTable(rates, params) {
  let MyrelevantOffers = makeActuallOffers(rates, params);

  let offersRow = {
    offersID: params.offersID,
    requestID: params.requestID,
    madeByUserMail: params.madeByUserMail,
    // relevantOffers: JSON.stringify(MyrelevantOffers),
    relevantOffers: MyrelevantOffers,
  };

  return offersRow;
}

function makeActuallOffers(rates, params) {
  let offers = [];

  rates.map((rate, index) => {
    //looping threw each relevant rate, getting its total
    let total = getTotalForRate(rate, params);

    //creating current Offer
    let curOffer = {
      rateID: rate.rateID,
      operatedBy: rate.freightForwarderName,
      totalForThisRate: total,
    };

    //Appending offers to return
    offers.push(curOffer);
  });

  return offers;
}

function getTotalForRate(rate, params) {
  let total = {
    exw: getRandomInt(100),
    fob: getRandomInt(200),
    local: 100,
  };
  return total;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
