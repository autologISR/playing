var AWS = require("aws-sdk");
AWS.config.update({ region: "eu-west-1" });
const docClient = new AWS.DynamoDB.DocumentClient({ region: "eu-west-1" });

exports.handler = async (event) => {
  if (event.httpMethod === "POST" && event.body.length > 0) {
    let curRate = JSON.parse(event.body).submmisionHelper;
    console.log("this is curRate -> ", curRate);

    let FobRateFixed = initialParams(curRate);
    console.log("2 -> ", FobRateFixed);

    let numOfIterations =
      FobRateFixed.FreightTransportOCEANLCL.oceanLCLTable.length - 1;
    let numOfPortInRate = 0;

    console.log("numOfIterations", numOfIterations);

    for (
      let indexOfPorts = 1;
      indexOfPorts <= numOfIterations;
      indexOfPorts++
    ) {
      let curRowPort =
        FobRateFixed.FreightTransportOCEANLCL.oceanLCLTable[indexOfPorts];

      let curRowToAppend = getRowToUpdate_FOB_OceanLCL(
        curRowPort,
        FobRateFixed,
        indexOfPorts
      );

      if (curRowToAppend.portFrom.length > 0) {
        console.log("HANDLER -> curRow To Append -> ", curRowToAppend);
        await putItemInSimplifiedTabel_OceanLCL(curRowToAppend)
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
    }

    //making item for input rateSubmmision
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
    body: JSON.stringify("Bad"),
  };
  return response;
};
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

function fixRateForSubmission(FobRateFixed) {
  let itemHelper = {
    id: FobRateFixed.rateID,
    rateName: FobRateFixed.GeneralInfo.rateName,
    freightForwarderName: FobRateFixed.GeneralInfo.freightForwarderName,
    carrierName: FobRateFixed.GeneralInfo.carrierName,
    rateType: "FOBImportOCEANLCL",
    validFrom: FobRateFixed.GeneralInfo.validFrom,
    validTo: FobRateFixed.GeneralInfo.validTo,
    originCharges: "",
    freightTransportCharges: JSON.stringify(
      FobRateFixed.FreightTransportOCEANLCL
    ),
    localCharges: JSON.stringify(FobRateFixed.locals),
  };
  return itemHelper;
}

function putItemInSimplifiedTabel_OceanLCL(curRowToAppend) {
  const params = {
    TableName: "IMPORTRatesSimplified-73q7nlgeevdp7fm4c6zv7mppee-dev",
    Item: curRowToAppend,
  };
  return docClient.put(params).promise();
}

function getRowToUpdate_FOB_OceanLCL(row, FobRateFixed, idHelperIndex) {
  // console.log(row)
  // console.log(FobRateFixed)
  // console.log(idHelperIndex)

  let defPort = FobRateFixed.defaultPort.portDefaultDestinationIsrael;
  if (defPort === "Ignore") {
    let ans = Ignore_Getrow_OceanFCL(row, FobRateFixed, idHelperIndex);
    return ans;
  }
  // let ans = defaultPort_Getrow_OceanFCL(row, FobRateFixed, idHelperIndex,defPort )
  // return ans
}

/////////////////////////////////////////////////////////////////

//Ignore means each pport is assingned to its value..
//ignoring defalt port
function Ignore_Getrow_OceanFCL(row, FobRateFixed, idHelperIndex) {
  let portFrom = "";
  let portTo = "";
  let transitTime = 0;
  let route = "";
  let weightMeasure = 0;
  let weightMeasureCurrency = "";

  row.forEach((element) => {
    let curField = element.field;
    switch (curField) {
      case "portFrom":
        portFrom = element.value;
        break;

      case "portTo":
        portTo = element.value;
        break;

      case "portFrom":
        portFrom = element.value;
        break;

      case "transitTime":
        transitTime = element.value;
        break;

      case "route":
        route = element.value;
        break;

      case "weightMeasure":
        weightMeasure = element.value;
        break;

      case "weightMeasureCurrency":
        weightMeasureCurrency = element.value;
        break;

      default:
        break;
    } // end of switch
  });

  let idHelper = FobRateFixed.rateID.concat(idHelperIndex);
  let lclHelper = {
    lclPrice: weightMeasure,
    currency: weightMeasureCurrency,
    FreightLCL_limits: FobRateFixed.FreightTransportOCEANLCL.FreightLCL_limits,
  };

  let rowToUpdate = {
    rateHash: "FOBImportOCEANLCL",
    id: idHelper,
    rateID: FobRateFixed.rateID,

    lcl: JSON.stringify(lclHelper),
    rateName: FobRateFixed.GeneralInfo.rateName,
    freightForwarderName: FobRateFixed.GeneralInfo.freightForwarderName,
    carrierName: FobRateFixed.GeneralInfo.carrierName,

    validFrom: FobRateFixed.GeneralInfo.validFrom,
    validTo: FobRateFixed.GeneralInfo.validTo,

    portFrom: portFrom,
    portTo: portTo,

    fobCharges: JSON.stringify(FobRateFixed.FreightTransportOCEANLCL),
    localCharges: JSON.stringify(FobRateFixed.locals),
  };

  return rowToUpdate;
}

//////////////////////////////////////////

function initialParams(curRate) {
  console.log("entered InitialParams");
  let rateID = curRate.rateID;
  let GeneralInfo = curRate.GeneralInfo;
  let oceanLCLTable = JSON.parse(curRate.FreightTransportOCEANLCL.oceanLCLTable)
    .grid;

  let FreightLCL_limits = {
    limitHeight: curRate.FreightTransportOCEANLCL.limitHeight,
    limitWeightShippment:
      curRate.FreightTransportOCEANLCL.limitHeight.limitWeightShippment,
    limitWeightBox: curRate.FreightTransportOCEANLCL.limitWeightBox,
    oceanLCLRateRatio: curRate.FreightTransportOCEANLCL.oceanLCLRateRatio,
  };

  let locals = {
    LocalsOceanLCLFixTable: JSON.parse(
      curRate.LocalsOCEANLCL.LocalsOceanLCLFixTable
    ).grid,

    LocalsOceanLCLByByWeightTable: JSON.parse(
      curRate.LocalsOCEANLCL.LocalsOceanLCLByByWeightTable
    ).grid,
  };

  let defaultPort = {
    portDefaultDestinationIsrael:
      curRate.FreightTransportOCEANLCL.portDefaultDestinationIsrael,
    trainTransIsraelAmount:
      curRate.FreightTransportOCEANLCL.trainTransIsraelAmount,
  };

  let OceanLCLFobFixed = {
    rateHash: "FOBImportOCEANLCL",
    rateID: rateID,
    GeneralInfo: curRate.GeneralInfo,
    FreightTransportOCEANLCL: {
      oceanLCLTable: oceanLCLTable,
      FreightLCL_limits: FreightLCL_limits,
      defaultPort: defaultPort,
    },
    limits: FreightLCL_limits,
    locals: locals,
    defaultPort: defaultPort,
  };
  console.log(
    "1 -> , returning OceanFCLFobFixed To Handler From Initial.. ",
    OceanLCLFobFixed
  );
  return OceanLCLFobFixed;
}
