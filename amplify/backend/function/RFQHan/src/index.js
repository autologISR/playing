/*
This function recives a RFQ, proccess it (relevant rates + rating them)
=> sends back the id at offerstable (not offersID)
*/
var AWS = require("aws-sdk");
AWS.config.update({ region: "eu-west-1" });
const docClient = new AWS.DynamoDB.DocumentClient({ region: "eu-west-1" });

exports.handler = async (event) => {
  let params;
  console.log(
    "shalom everybody, entered lambda for RFQ.. this is event -> ",
    event
  );
  let hash;

  if (
    JSON.parse(event.body).RFQHelper.Test ===
    "fakeRequest_OCEAN_FCL_FAREAST_FOB"
  ) {
    console.log("entered Test");

    params = InitialFake_FCL_OCEAN_FAREAST_FOB(
      JSON.parse(event.body).RFQHelper
    );
    hash = "FOBImportOCEANFCL";
    // terms + "Import" + "OCEAN" + containerTyp =
    console.log("params -> ", params);
  } else {
    console.log("entered Not Test");
    console.log("event -> ", event);
    console.log("JSON.parse(event.body) -> ", JSON.parse(event.body));

    //fetching request
    let request = JSON.parse(event.body).RFQHelper;
    // console.log("request -> ", request);

    //initializing parmas from request
    params = initial(request);
    // console.log("params -> ", params);

    // console.log("event.body => ", event.body);
    // console.log(JSON.parse(event.body));

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

  console.log("this is hash -> ", hash);

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

function getHashImport(fromRegion, fromState, terms, airOcean, containerType) {
  let hash;

  if (airOcean === "Air") hash = terms + "Import" + "AIR";
  else hash = terms + "Import" + "OCEAN" + containerType;

  return hash;
}

function initial(request) {
  console.log("inside initial.. this is request -> ", request);
  let terms = request.GeneralInfo.incoterms;
  console.log("inside iniitial.. this is terms -> ", terms);
  switch (terms) {
    case "EXW":
      // let initialPropsEXW = initialEXW(request);
      // return initialPropsEXW;
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
  console.log("inside initialFOB -- request -> ", request);

  let generalInfoHelper = request.GeneralInfo;
  let airOceanHelper = request.GeneralInfo.modeOfTransport;
  let regionHelper = request.GeneralInfo.region;

  console.log("generalInfoHelper -> ", generalInfoHelper);
  console.log("airOceanHelper -> ", airOceanHelper);
  console.log("regionHelper -> ", regionHelper);

  let locationFob;
  let cargoLoadHelper = "";
  let shipmentDetailsHelper;

  //in this IF/ELSE we initialize
  //                          locationFob && containerTypeHelper && shipmentDetailsHelper
  if (airOceanHelper === "Air") {
    shipmentDetailsHelper = request.ShipmentDetailsAir;
    switch (regionHelper) {
      case "USA":
        locationFob = request.LocationFOBAirUSA;
        break;

      case "Europe":
        locationFob = request.LocationFOBAirEurope;
        break;

      case "FarEast":
        locationFob = request.LocationFOBAirFarEast;
        break;

      default:
        break;
    }
  } else {
    //airOcean === Ocean
    cargoLoadHelper = generalInfoHelper.cargoLoad;

    if (cargoLoadHelper === "FCL")
      shipmentDetailsHelper = request.ShipmentDetailsOceanFCL;
    else request.ShipmentDetailsOceanLCL;

    switch (regionHelper) {
      case "USA":
        locationFob = request.LocationFOBOceanUSA;
        break;

      case "Europe":
        locationFob = request.LocationFOBOceanEurope;
        break;

      case "FarEast":
        locationFob = request.LocationFOBOceanFarEast;
        break;

      default:
        break;
    }
  }

  console.log("locationFob -> ", locationFob);
  console.log("cargoLoadHelper -> ", cargoLoadHelper);

  let offersIdHepler = request.requestID + "abc123";

  let initialPropsFOB = {
    offersIdHepler: offersIdHepler,
    requestID: request.requestID,
    fromRegion: generalInfoHelper.region,
    fromState: locationFob.state,
    fromPort: locationFob.portFrom,
    terms: "FOB",
    airOcean: airOceanHelper,
    madeByUserMail: request.userMail,
    containerType: cargoLoadHelper,
    shipmentDetails: shipmentDetailsHelper,
    genralInfo: generalInfoHelper,
  };
  console.log(
    "initial params.. returnning this  (initialPropsFOB) -> ",
    initialPropsFOB
  );
  return initialPropsFOB;
}

function getParamsForQueryRelevanyRates(hash, state, port) {
  let table = "IMPORTRatesSimplified-73q7nlgeevdp7fm4c6zv7mppee-dev";
  let Index_FOB = "SimplifiedByPortFOB";
  let Index_EXW = "SimplifiedByStateEXW";

  let myCase;
  if (
    hash === "FOBImportOCEANLCL" ||
    hash === "FOBImportOCEANFCL" ||
    hash === "FOBImportAIR"
  ) {
    myCase = "FOB";
  }

  if (
    hash === "EXWImportOCEANFCL" ||
    hash === "EXWImportOCEANLCL" ||
    hash === "EXWImportAIR"
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
  // console.log("inside makeOffersForAppendTable...rates ", rates)
  let MyrelevantOffers = makeActuallOffers(rates, params);

  let offersRow = {
    // offersID: params.offersID,
    requestID: params.requestID,
    madeByUserMail: params.madeByUserMail,
    relevantOffers: MyrelevantOffers,
  };

  return offersRow;
}

function makeActuallOffers(rates, params) {
  let offers = [];
  console.log("hey im inside makeActuallOffers.. this is pararms ", params);
  rates.map((rate, index) => {
    //looping threw each relevant rate, getting its total
    let total = getTotalForRate(rate, params);

    let offersIDHelper = params.offersIdHepler + index.toString();

    //creating current Offer
    let curOffer = {
      rateID: rate.rateID,
      operatedBy: rate.freightForwarderName,
      totalForThisRate: total,
      offerUniqeId: offersIDHelper,
    };

    //Appending offers to return
    offers.push(curOffer);
  });

  return offers;
}

function getTotalForRate(rate, params) {
  // console.log("getTotalForRate -- rate -> ", rate)
  // console.log(" params -> ", params)

  let termsHelper = params.terms;
  let airOcean = params.airOcean;

  // console.log("airOcean -> ", airOcean)
  // console.log("termsHelper -> ", termsHelper)

  let total = {
    exw: getRandomInt(100),
    fob: getRandomInt(200),
    local: 100,
  };

  switch (termsHelper + airOcean) {
    case "FOBAir":
      total = FobAir(rate, params);
      break;

    default:
      break;
  }

  return total;
}

// still need to calculate by currency
function FobAir(rate, params) {
  console.log("inside FobAir....");
  // console.log("inside FobAir... rate -> ", rate)
  // console.log("inside FobAir... params -> ", params)

  // GetUser Autolog's LOCALS + DELTA

  let shipmentDetailsAir = JSON.parse(params.shipmentDetails.shipmentDetailsAir)
    .grid;
  // let shipmentDetailsLength = shipmentDetailsAir.length
  // let rowShipmentDetailsIndex = 0

  // console.log("inside FobAir.... shipmentDetailsAir -> ", shipmentDetailsAir)
  // console.log("inside FobAir.... shipmentDetailsLength -> ", shipmentDetailsLength)

  //Get different Boxes
  let boxes = getBoxes(shipmentDetailsAir);
  // console.log("inside FobAir... boxes are -> ", boxes)

  let fobPart = calculate_FOB_AIR_FREIGHTPART_WithRules(boxes, rate, params);
  let localPart = calculateLocalAir(boxes, rate, params);

  let total = {
    exw: 0,
    fob: fobPart,
    local: localPart,
  };
  console.log("inside FobAir ... returning total  -> ", total);
  return total;
}

function calculateLocalAir(boxes, rate, params) {
  let Localusd = { locals: 0 };
  let Localeur = { locals: 0 };
  let Localnis = { locals: 0 };

  let localAir = {
    usd: Localusd,
    eur: Localeur,
    nis: Localnis,
  };

  return localAir;
}

//boxes is shape of [Boxes]
//box = { curBoxWeight_KG,
//        curBoxesCount,
//        curBoxDims:{width, height,length}
//      }
//
// Returns ->
// let fobPart = {
//          usd:FOBusd,
//          eur:FOBeur,
//          nis:FOBnis
//            }
//let FOBusd = {fobFreight:freightNetoBoxes, fobRules:0}
function calculate_FOB_AIR_FREIGHTPART_WithRules(boxes, rate, params) {
  console.log(
    "inside calculate_FOB_AIR_FREIGHTPART_WithRules.. rate is -> ",
    rate
  );
  let numOfBoxes = boxes.length;

  let VolumeWeight;
  let indexBox;
  let curBox;
  let WEIGHT_MASTER;

  let freightNetoBoxes = 0;
  for (indexBox = 0; indexBox < numOfBoxes; indexBox++) {
    // VolumeWeight = getVolumeWeight()
    VolumeWeight = 0;

    curBox = boxes[indexBox];

    // console.log("curbox -> ",curBox)
    let weightHelper = Number(curBox.curBoxWeight_KG.replace(" kg", ""));

    //setting up Weight_master
    if (weightHelper > VolumeWeight) {
      WEIGHT_MASTER = weightHelper;
    } else {
      WEIGHT_MASTER = VolumeWeight;
    }
    // console.log("inside calculate_FOB_AIR_FREIGHTPART_WithRules.. WEIGHT_MASTER -> ",WEIGHT_MASTER )

    let curRating = getRelevantQuoteForWeight(rate, WEIGHT_MASTER);
    // console.log("this is curRating  -> ", curRating.toString() ," for box ", indexBox.toString())

    let boxCountTimesRating = curRating * WEIGHT_MASTER;
    freightNetoBoxes += boxCountTimesRating;
  }

  let FOBusd = { fobFreight: freightNetoBoxes, fobRules: 0 };
  let FOBeur = {};
  let FOBnis = {};

  let fobPart = {
    usd: FOBusd,
    eur: FOBeur,
    nis: FOBnis,
  };

  return fobPart;
}

//Helper Method
//returns the relevant air Rate for specific weight for this rate
//rate.airRate =  [[weightsArray], [ actualRates]]
function getRelevantQuoteForWeight(rate, WEIGHT_MASTER) {
  let index = 0;
  let ans = 0;
  let index_keeper = 0;
  let airRateHelper = JSON.parse(rate.airRate);

  let weightsArray = airRateHelper[0];
  let actualRates = airRateHelper[1];

  console.log("this is airRateHelper ->", airRateHelper);
  console.log("this is weightsArray -> ", weightsArray);

  for (index = 0; index < weightsArray.length; index++) {
    // console.log("weightsArray[index] -> ", Number(weightsArray[index]))

    if (WEIGHT_MASTER > Number(weightsArray[index])) {
      index_keeper = index;
      ans = Number(actualRates[index]);
    }
  }
  // console.log("returning from getRelevantQuoteForWeight.. index_keeper -> ", index_keeper)
  // console.log("returning from getRelevantQuoteForWeight.. WEIGHT_MASTER -> ", WEIGHT_MASTER)
  // console.log("returning from getRelevantQuoteForWeight.. ans -> ", ans)
  return ans;
}

//Helper method ->
// returns the different boxes from the quote
function getBoxes(shipmentDetailsAir) {
  console.log(
    "222 -> inside getBoxes.. this is shipmentDetailsAir -> ",
    shipmentDetailsAir
  );

  let boxes = [];
  let shipmentDetailsLength = shipmentDetailsAir.length;
  let rowShipmentDetailsIndex;

  let widthHelper, heightHelper, lengthHelper;

  for (
    rowShipmentDetailsIndex = 1;
    rowShipmentDetailsIndex < shipmentDetailsLength;
    rowShipmentDetailsIndex++
  ) {
    // console.log("shipmentDetails at index ", rowShipmentDetailsIndex)
    // console.log("shipmentDetailsAir[index] -> ", shipmentDetailsAir[rowShipmentDetailsIndex] )

    let curRow = shipmentDetailsAir[rowShipmentDetailsIndex];
    console.log("curRow -> ", curRow);
    let curBox = {};
    let curBoxesCount;

    let curBoxWeight_KG;

    curRow.forEach((element) => {
      console.log("this is element -> ", element);
      switch (element.field) {
        case "unitWeight":
          curBoxWeight_KG = element.value;
          break;

        case "numberOfUnits":
          curBoxesCount = element.value;
          break;

        case "unitWidth":
          widthHelper = element.value;
          break;

        case "unitHeight":
          heightHelper = element.value;
          break;

        case "unitLength":
          lengthHelper = element.value;
          break;

        default:
          console.log("element.field .. default-> ", element.field);
          break;
      }
    });
    if (curBoxesCount > 0) {
      let curBox = {
        curBoxWeight_KG: curBoxWeight_KG,
        curBoxesCount: curBoxesCount,
        curBoxDims: {
          width: widthHelper,
          length: lengthHelper,
          height: heightHelper,
        },
      };
      console.log("addid curBoxWeight_KG ->", curBox.curBoxWeight_KG);
      console.log("addid curBoxesCount ->", curBox.curBoxesCount);
      console.log("addid curBoxDims ->", curBox.curBoxDims);
      boxes.push(curBox);
    }
    curBoxesCount = 0;
  }
  console.log("inside getBoxes... returning boxes -> ", boxes);
  return boxes;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
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
