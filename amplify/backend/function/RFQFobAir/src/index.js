/* Amplify Params - DO NOT EDIT
	API_ALPHAKOTEL_GRAPHQLAPIENDPOINTOUTPUT
	API_ALPHAKOTEL_GRAPHQLAPIIDOUTPUT
	API_ALPHAKOTEL_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

var AWS = require("aws-sdk");
AWS.config.update({ region: "eu-west-1" });
const docClient = new AWS.DynamoDB.DocumentClient({ region: "eu-west-1" });

exports.handler = async (event) => {
  let response = {
    statusCode: 0,
    body: "",
  };

  if (event.httpMethod === "POST" && JSON.stringify(event.body).length > 0) {
    console.log("event -> ", event);
    //fetching request
    let request = JSON.parse(event.body).RFQHelper;

    //initializing parmas from request
    // params = {}
    let RequestParams = initialFOB(request);
    console.log("params -> ", RequestParams);

    const Hash = "FOBImportAIR";
    console.log(
      "this is RequestParams.Loc...",
      RequestParams.LocationFOBAirUSA
    );
    console.log(
      "this is RequestParams portFrom..",
      RequestParams.LocationFOBAirUSA.portFrom
    );

    let paramsForQuery = getParamsForQueryRelevantRates(
      Hash,
      RequestParams.LocationFOBAirUSA.portFrom
    );
    console.log("paramsForQuery -> ", paramsForQuery);

    await docClient
      .query(paramsForQuery, function(err, data) {
        if (err) {
          response = {
            statusCode: 400,
            body: "",
          };
          console.error(
            "Unable to query. Error:",
            JSON.stringify(err, null, 2)
          );
        }
      })
      .promise()
      .then((resFromSimplified) => {
        console.log("Query succeeded");

        if (resFromSimplified.Count > 0) {
          console.log("this is res -> ", resFromSimplified);
          let labeldRates = getValidRatesForThisShippment(
            resFromSimplified.Items,
            RequestParams
          );

          if (labeldRates.validRates.length > 0) {
            console.log(
              "there are " + resFromSimplified.Count + " rates found"
            );
            console.log("valid -> ", labeldRates.validRates);
            console.log("notvalid -> ", labeldRates.notValidRates);

            //making offers out of relevant rates
            let offers = makeOffersForAppendTable(
              labeldRates.validRates,
              RequestParams
            );
            console.log("offers returning as Data to CODE -> ", offers);

            response = {
              statusCode: 200,
              body: JSON.stringify({
                offers: offers,
                exchanges: RequestParams.exchanges,
              }),
            };
          } else {
            //Means resFromSimplified > 0, but no valid rates for this shippment...
            response = {
              statusCode: 217,
              body: JSON.stringify(labeldRates),
            };
          }
        } else {
          //Means no rate found
          console.log("no valid rates found");
          response = {
            statusCode: 400,
            body: "no rates has been found...",
          };
        }
      });

    return response;
  }

  // LocationFOBAirUSA  ShipmentDetailsAir
};

////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////

function getValidRatesForThisShippment(rates, RequestParams) {
  console.log("getValidRatesForThisShippment");
  console.log("this is rates -> ", rates);
  console.log("this is RequestParams -> ", RequestParams);

  let validRates = [];
  let notValidRates = [];

  let shipmentDetailsAir = RequestParams.ShipmentDetailsAir;
  let boxes = getBoxes(shipmentDetailsAir);
  console.log("77 -> ", boxes);

  let rateLimits;

  let shippmentTotalWeight = getShippmentTotalWeight_KG(boxes);
  let boxWeight, boxHeight, boxCount;

  let ok_Weight = true;
  let ok_Height = true;

  //itterate through each rate
  //then itterating throgh each box
  rates.forEach((rate) => {
    rateLimits = JSON.parse(rate.limits);
    boxes.forEach((box) => {
      boxCount = box.curBoxesCount;
      boxHeight = box.curBoxDims.height;
      boxWeight = box.curBoxWeight_KG;

      if (boxWeight > rateLimits.limitWeightBox) {
        ok_Weight = false;
      }
      if (boxHeight > rateLimits.limitHeight) {
        ok_Height = false;
      }
    }); //boxes ForEach
    if (
      shippmentTotalWeight < rateLimits.limitWeightShippment &&
      ok_Weight &&
      ok_Height
    ) {
      validRates.push(rate);
    } else {
      console.log(
        "oopsi! not a valid rate... ",
        ok_Weight,
        ok_Height,
        shippmentTotalWeight,
        rateLimits.limitWeightShippment
      );

      notValidRates.push({
        rate: rate,
        errors: {
          ok_Weight: ok_Weight,
          ok_Height: ok_Height,
          shippmentTotalWeight: shippmentTotalWeight,
          rateLimits: rateLimits,
        },
      });
    }

    ok_Weight = true;
    ok_Height = true;
  }); //rate ForEach

  return {
    validRates: validRates,
    notValidRates: notValidRates,
  };
}

//////////////////////////////////////////////

function getShippmentTotalWeight_KG(boxes) {
  let ans = 0;

  boxes.forEach((box) => {
    let count = Number(box.curBoxesCount);
    let weightKg = Number(box.curBoxWeight_KG.replace(" kg", ""));
    ans += count * weightKg;
  });

  console.log("getShippmentTotalWeight_KG.. this is ans ->", ans);
  return ans;
}
//////////////////////////////////////////////

function makeOffersForAppendTable(rates, params) {
  // console.log("inside makeOffersForAppendTable...rates ", rates)
  let MyrelevantOffers = makeActuallOffers(rates, params);

  let offersRow = {
    request: params,
    requestID: params.requestID,
    madeByUserMail: params.madeByUserMail,
    relevantOffers: MyrelevantOffers,
  };

  return offersRow;
}

////////////////////////////////////////////

function makeActuallOffers(rates, RequestParams) {
  let offers = [];
  console.log(
    "hey im inside makeActuallOffers.. this is RequestParams ",
    RequestParams
  );
  rates.map((rate, index) => {
    //looping threw each relevant rate, getting its total
    let total = getTotalForRate_FOBAir(rate, RequestParams);

    let offersIDHelper = RequestParams.requestID + index.toString();

    //creating current Offer
    let curOffer = {
      rateID: rate.rateID,
      operatedBy: rate.freightForwarderName,
      carrier: rate.carrierName,
      totalForThisRate: total,
      offerUniqeId: offersIDHelper,
      originalRequest: RequestParams,
    };

    //Appending offers to return
    offers.push(curOffer);
  });

  return offers;
}

///////////////////////////////////////////

// still need to calculate by currency
function getTotalForRate_FOBAir(rate, params) {
  let shipmentDetailsAir = params.ShipmentDetailsAir;

  let shipmentDetailsLength = shipmentDetailsAir.length;
  let rowShipmentDetailsIndex = 0;

  //Get different Boxes
  let boxes = getBoxes(shipmentDetailsAir);
  // console.log("inside FobAir... boxes are -> ", boxes)

  // fobPart = {FOBPart_currency, boxesRatedArray, totalFreightPart }
  let fobPart = calculate_FOB_AIR_FreightPart(boxes, rate, params);

  // fixPart && byWeightPart = {    localsMandatory, localsNotMandatory, totalMandatory,totalNotMandatory }
  //yata = {amount, currency}
  // localPart = {    fixPart, byWeightPart, yata }
  let localPart = calculate_FOB_AIR_LocalPart(boxes, rate, params, fobPart);

  let total = {
    exwPart: {},
    fobPart: fobPart,
    localPart: localPart,
  };
  console.log("inside FobAir ... returning total.fobPart  -> ", total.fobPart);
  console.log(
    "inside FobAir ... returning total.localPart  -> ",
    total.localPart
  );
  return total;
}

////////////////////////////////////////////

function getParamsForQueryRelevantRates(hash, port) {
  let table = "IMPORTRatesSimplified-73q7nlgeevdp7fm4c6zv7mppee-dev";
  let Index_FOB = "SimplifiedByPortFOB";
  return {
    TableName: table,
    IndexName: Index_FOB,
    KeyConditionExpression: "#rateHash = :rateHash and #portFrom = :portFrom",
    ExpressionAttributeNames: {
      "#rateHash": "rateHash",
      "#portFrom": "portFrom",
    },
    ExpressionAttributeValues: {
      ":rateHash": hash,
      ":portFrom": port,
    },
  };
}

////////////////////////////////////////////
function initialFOB(request) {
  console.log("inside initialFOB -- request -> ", request);

  let generalInfoHelper = request.GeneralInfo;
  let LocationFOBAirUSA = request.LocationFOBAirUSA;
  let ShipmentDetailsAir = JSON.parse(
    request.ShipmentDetailsAir.shipmentDetailsAir
  ).grid;

  console.log("1 -> request -> ", request);
  console.log("1 -> initialFOB_LocationFOBAirUSA -> ", LocationFOBAirUSA);
  console.log("1 -> initialFOB_ShipmentDetailsAir -> ", ShipmentDetailsAir);
  console.log("1234321 -> ", request.exchanges);
  return {
    generalInfoHelper: generalInfoHelper,
    ShipmentDetailsAir: ShipmentDetailsAir,
    requestID: request.requestID,
    userMail: request.userMail,
    LocationFOBAirUSA: LocationFOBAirUSA,
    exchanges: request.exchanges,
    user: request.user,
  };
}

////////////////////////////////////////////

//Helper method ->
// returns the different boxes from the quote
function getBoxes(shipmentDetailsAir) {
  console.log(
    "inside getBoxes.. this is shipmentDetailsAir -> ",
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
    // console.log("curRow -> ", curRow);
    let curBox = {};
    let curBoxesCount;

    let curBoxWeight_KG;

    curRow.forEach((element) => {
      // console.log("this is element -> ", element);
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
          // console.log("element.field .. default-> ", element.field);
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
      // console.log("addid curBoxWeight_KG ->", curBox.curBoxWeight_KG);
      // console.log("addid curBoxesCount ->", curBox.curBoxesCount);
      // console.log("addid curBoxDims ->", curBox.curBoxDims);
      boxes.push(curBox);
    }
    curBoxesCount = 0;
  }
  console.log("inside getBoxes... returning boxes -> ", boxes);
  return boxes;
}

////////////////////////////////////////////

function calculate_FOB_AIR_FreightPart(boxes, rate, params) {
  console.log("inside calculate_FOB_AIR_FREIGHTPART.. rate is -> ", rate);
  let numOfBoxes = boxes.length;

  let VolumeWeight;
  let indexBox;
  let curBox;
  let WEIGHT_MASTER;
  let boxesRatedArray = [];
  let totalFreightUSD = 0;

  let currencyFreight = JSON.parse(rate.airRate)[2];

  let freightNetoBoxes = 0;

  for (indexBox = 0; indexBox < numOfBoxes; indexBox++) {
    // VolumeWeight = getVolumeWeight()
    VolumeWeight = 0;

    curBox = boxes[indexBox];

    console.log("curbox -> ", curBox);
    let weightHelper = Number(curBox.curBoxWeight_KG.replace(" kg", ""));

    //by the weight of the current box, we take the actual rate
    let curRating = getRelevantQuoteForWeight(rate, WEIGHT_MASTER);
    let userDelta = params.user.userDeltaUSD;

    if (currencyFreight.toUpperCase() === "EUR") {
      userDelta = params.user.userDeltaUSD * params.exchanges.usdToEur;
    }

    if (currencyFreight.toUpperCase() === "NIS") {
      userDelta = params.user.userDeltaUSD * params.exchanges.usdToNis;
    }
    curRating += userDelta;

    let runningHelper =
      curRating * WEIGHT_MASTER * Number(curBox.curBoxesCount);
    let boxesRatedArrayHelper = {
      curBox: curBox,
      curRating: curRating,
      numerOfBoxes: curBox.curBoxesCount,
      netoForThisBoxUSD: runningHelper,
      userDelta: userDelta,
      WEIGHT_MASTER: WEIGHT_MASTER,
    };

    boxesRatedArray.push(boxesRatedArrayHelper);
    totalFreightUSD += runningHelper;
    runningHelper = 0;
  }

  return {
    FOBPart_currency: currencyFreight,
    boxesRatedArray: boxesRatedArray,
    totalFreightPartUSD: totalFreightUSD,
  };
}

/////////////////////////////////////////////////////////

// fobPart = {FOBPart_currency, boxesRatedArray, totalFreightPart }
function calculate_FOB_AIR_LocalPart(boxes, rate, params, fobPart) {
  let localCharges = JSON.parse(rate.localCharges);
  let LocalsAirFixTable = localCharges.LocalsAirFixTable;
  let LocalsAirByWeightTable = localCharges.LocalsAirByWeightTable;

  let mandatory;
  let notMandatory;

  // fixPart = {    localsMandatory, localsNotMandatory, totalMandatory,totalNotMandatory }
  let fixPart = getFixLocalsAir(LocalsAirFixTable);

  // byWeightPart = {    localsMandatory, localsNotMandatory, totalMandatory,totalNotMandatory }
  let byWeightPart = getByWeightLocalsAir(LocalsAirByWeightTable);

  let yataHelper = (Number(localCharges.yata) * fobPart.totalFreightPart) / 100;
  let yata = {
    amount: yataHelper,
    currency: fobPart.FOBPart_currency,
    yataRequested: localCharges.yata,
  };
  console.log("999111 -> ", yata);

  let localAir = {
    fixPart: fixPart,
    byWeightPart: byWeightPart,
    yata: yata,
  };

  return localAir;
}

///////////////////////////////////////////////////////

function getFixLocalsAir(LocalsAirFixTable) {
  let totalMandatory = { eur: 0, nis: 0, usd: 0 },
    totalNotMandatory = { eur: 0, nis: 0, usd: 0 };
  let localsMandatory = [],
    localsNotMandatory = [];

  let mandatory, currency, amount, FixRuleName;
  for (
    let indexLocalRule = 1;
    indexLocalRule < LocalsAirFixTable.length - 1;
    indexLocalRule++
  ) {
    let row = LocalsAirFixTable[indexLocalRule];
    row.forEach((element) => {
      console.log("** ", element.field, " ", element.value, "(field, value)");
      switch (element.field) {
        case "amount":
          amount = Number(element.value);
          break;

        case "FixRuleName":
          FixRuleName = element.value;
          break;

        case "currency":
          currency = element.value;
          break;

        case "mandatory":
          if (element.value.toString().toUpperCase() === "Y") mandatory = true;
          else mandatory = false;

          break;

        default:
          break;
      }
    }); // Done iterating through the row

    //making sure its not an empty row
    if (FixRuleName.length > 0) {
      if (mandatory) {
        let localRuleHelper = {
          FixRuleName: FixRuleName,
          amount: amount,
          currency: currency,
        };

        localsMandatory.push(localRuleHelper);

        switch (currency.toUpperCase()) {
          case "EUR":
            totalMandatory.eur += amount;
            break;

          case "USD":
            totalMandatory.usd += amount;
            break;

          case "NIS":
            totalMandatory.nis += amount;
            break;

          default:
            break;
        }
      } else {
        //Means no mandatory
        let localRuleHelper = {
          FixRuleName: FixRuleName,
          amount: amount,
          currency: currency,
        };

        localsNotMandatory.push(localRuleHelper);
        switch (currency.toUpperCase()) {
          case "EUR":
            totalNotMandatory.eur += amount;
            break;

          case "USD":
            totalNotMandatory.usd += amount;
            break;

          case "NIS":
            totalNotMandatory.nis += amount;
            break;

          default:
            break;
        }
      }
    }
  }

  return {
    localsMandatory: localsMandatory,
    localsNotMandatory: localsNotMandatory,
    totalMandatory: totalMandatory,
    totalNotMandatory: totalNotMandatory,
  };
}

function getByWeightLocalsAir(LocalsAirByWeightTable) {
  let totalMandatory = { eur: 0, nis: 0, usd: 0 },
    totalNotMandatory = { eur: 0, nis: 0, usd: 0 };
  let localsMandatory = [],
    localsNotMandatory = [];

  return {
    localsMandatory: localsMandatory,
    localsNotMandatory: localsNotMandatory,
    totalMandatory: totalMandatory,
    totalNotMandatory: totalNotMandatory,
  };
}

/////////////////////////////////////////

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

  // console.log("this is airRateHelper ->", airRateHelper);
  // console.log("this is weightsArray -> ", weightsArray);

  for (index = 0; index < weightsArray.length; index++) {
    // console.log("weightsArray[index] -> ", Number(weightsArray[index]))

    if (WEIGHT_MASTER >= Number(weightsArray[index])) {
      index_keeper = index;
      ans = Number(actualRates[index]);
    }
  }
  // console.log("returning from getRelevantQuoteForWeight.. index_keeper -> ", index_keeper)
  // console.log("returning from getRelevantQuoteForWeight.. WEIGHT_MASTER -> ", WEIGHT_MASTER)
  console.log("returning from getRelevantQuoteForWeight.. ans -> ", ans);
  return ans;
}

//this functions checks for the total weight of these boxes,
//then decideds who is master Weight
//volume OR physycal
function getRelevantRateByMasterWeight(boxes, rate) {
  let shippmentTotalWeight = getShippmentTotalWeight_KG(boxes);
  // let VolumeWeight = getVolumeWeight()
  let VolumeWeight = 0;
  let WEIGHT_MASTER;

  if (shippmentTotalWeight > VolumeWeight) {
    WEIGHT_MASTER = shippmentTotalWeight;
  } else {
    WEIGHT_MASTER = VolumeWeight;
  }

  return getRelevantQuoteForWeight(rate, WEIGHT_MASTER);
}
