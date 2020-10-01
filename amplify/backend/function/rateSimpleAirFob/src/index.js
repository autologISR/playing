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
  console.log(event);

  if (event.httpMethod === "POST" && event.body.length > 0) {
    let curRate = JSON.parse(event.body).submmisionHelper;
    console.log("this is curRate -> ", curRate);

    let FobRateFixed = initialParams(curRate);
    let numOfIterations = FobRateFixed.airTable.length - 1;
    let numOfPortInRate = 0;

    console.log("numOfIterations", numOfIterations);

    for (
      let indexOfPorts = 1;
      indexOfPorts <= numOfIterations;
      indexOfPorts++
    ) {
      let curRowToAppend = getRowToUpdate_FOB_AIR(
        FobRateFixed.airTable[indexOfPorts],
        FobRateFixed,
        indexOfPorts
      );

      if (curRowToAppend.portFrom.length > 0) {
        console.log("HANDLER -> curRow To Append -> ", curRowToAppend);
        await putItemInSimplifiedTabel_AIR(curRowToAppend)
          .then((res) => {
            console.log(
              "all fine.. respons from putItemInSimplifiedTabel_AIRLCL ->",
              res
            );
          })
          .catch((err) => {
            console.log("error -> ", err);
          });
      }
    } // end of For_LOOP.. now submitting rate itself
    let rateFixed = fixRateForSubmission(FobRateFixed);
    console.log("this is rateFixed -> ", rateFixed);

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(rateFixed),
    };
    return response;
  }

  const response = {
    statusCode: 217,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify("notGood"),
  };
  return response;
};

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

function fixRateForSubmission(FobRateFixed) {
  let itemHelper = {
    id: FobRateFixed.rateID,
    rateName: FobRateFixed.GeneralInfo.rateName,
    freightForwarderName: FobRateFixed.GeneralInfo.freightForwarderName,
    carrierName: FobRateFixed.GeneralInfo.carrierName,
    rateType: "FOBImportAIR",
    validFrom: FobRateFixed.GeneralInfo.validFrom,
    validTo: FobRateFixed.GeneralInfo.validTo,
    originCharges: "",
    freightTransportCharges: JSON.stringify({
      FobRateFixed: FobRateFixed.airTable,
      limits: FobRateFixed.limits,
    }),
    localCharges: JSON.stringify(FobRateFixed.locals),
  };
  return itemHelper;
}

function putItemInSimplifiedTabel_AIR(curRow) {
  const params = {
    TableName: "IMPORTRatesSimplified-73q7nlgeevdp7fm4c6zv7mppee-dev",
    Item: curRow,
  };
  return docClient.put(params).promise();
}

function getRowToUpdate_FOB_AIR(row, FobRateFixed, idHelperIndex) {
  console.log("222 -> ", FobRateFixed.airTable);
  let portFrom = "";
  let portTo = "";
  let tt = 0;
  let route = "";
  let minWeight = 0;

  let weightsArray = [];
  let actualRates = [];
  row.forEach((element) => {
    let curField = element.field;
    console.log("this is curField -> ", curField);
    switch (curField) {
      case "portFrom":
        portFrom = element.value;
        break;

      case "transitTime":
        if (element.value && element.value.length && element.value > 0) {
          tt = element.value;
        }
        break;

      case "route":
        if (element.value && element.value.length > 0) {
          route = element.value;
        }
        break;

      case "minimumWeight":
        if (element.value && element.value > 0) {
          minWeight = element.value;
        }
        break;

      default:
        if (curField != "rowIndex") {
          let helper = element.field.replace("from", "");
          weightsArray.push(helper);
          actualRates.push(element.value);
          break;
        }
    } // end of switch
  });

  // airRateHelper = [weightsArray, actualRates, currency]
  let airRateHelper = new Array(2);
  airRateHelper[0] = weightsArray;
  airRateHelper[1] = actualRates;
  airRateHelper[2] = FobRateFixed.airTableCurrency;

  let idHelper = FobRateFixed.rateID.concat(idHelperIndex);

  let rowToUpdate = {
    rateHash: FobRateFixed.rateHash,
    id: idHelper,
    rateID: FobRateFixed.rateID,

    airRate: JSON.stringify(airRateHelper),

    rateName: FobRateFixed.GeneralInfo.rateName,
    freightForwarderName: FobRateFixed.GeneralInfo.freightForwarderName,
    carrierName: FobRateFixed.GeneralInfo.carrierName,

    validFrom: FobRateFixed.GeneralInfo.validFrom,
    validTo: FobRateFixed.GeneralInfo.validTo,
    limits: JSON.stringify(FobRateFixed.limits),

    portFrom: portFrom,
    portTo: "TLV",
    fobCharges: "",
    localCharges: JSON.stringify(FobRateFixed.locals),
  };

  return rowToUpdate;
}

function initialParams(curRate) {
  console.log("entered InitialParams");
  let rateID = curRate.rateID;
  let GeneralInfo = curRate.GeneralInfo;
  let airTable = JSON.parse(curRate.FreightTransportAIR.airTable).grid;
  let limits = {
    limitHeight: curRate.FreightTransportAIR.limitHeight,
    limitWeightShippment: curRate.FreightTransportAIR.limitWeightShippment,
    limitWeightBox: curRate.FreightTransportAIR.limitWeightBox,
    airRateRatio: curRate.FreightTransportAIR.airRateRatio,
  };

  let locals = {
    LocalsAirFixTable: JSON.parse(curRate.LocalsAIR.LocalsAirFixTable).grid,
    LocalsAirByWeightTable: JSON.parse(curRate.LocalsAIR.LocalsAirByWeightTable)
      .grid,
    yata: curRate.LocalsAIR.yata,
  };

  let AirFobFixed = {
    rateHash: "FOBImportAIR",
    rateID: rateID,
    GeneralInfo: GeneralInfo,
    airTable: airTable,
    airTableCurrency: curRate.FreightTransportAIR.CURRENCY_HELPER,
    limits: limits,
    locals: locals,
  };
  console.log(
    "1 -> , returning AirFobFixed To Handler From Initial.. ",
    AirFobFixed
  );
  return AirFobFixed;
}
