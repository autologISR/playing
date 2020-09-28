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
  if (event.httpMethod === "POST" && event.body.length > 0) {
    let curRate = JSON.parse(event.body).submmisionHelper;
    console.log("this is curRate -> ", curRate);

    let FobRateFixed = initialParams(curRate);

    let numOfIterations =
      FobRateFixed.FreightTransportOCEANFCL.oceanFCLTable.length - 1;
    let numOfPortInRate = 0;

    console.log("numOfIterations", numOfIterations);

    for (
      let indexOfPorts = 1;
      indexOfPorts <= numOfIterations;
      indexOfPorts++
    ) {
      let curRowPort =
        FobRateFixed.FreightTransportOCEANFCL.oceanFCLTable[indexOfPorts];

      let curRowToAppend = getRowToUpdate_FOB_OceanFCL(
        curRowPort,
        FobRateFixed,
        indexOfPorts
      );
      if (curRowToAppend.portFrom.length > 0) {
        console.log("HANDLER -> curRow To Append -> ", curRowToAppend);
        await putItemInSimplifiedTabel_OceanFCL(curRowToAppend)
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

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

function fixRateForSubmission(FobRateFixed) {
  let itemHelper = {
    id: FobRateFixed.rateID,
    rateName: FobRateFixed.GeneralInfo.rateName,
    freightForwarderName: FobRateFixed.GeneralInfo.freightForwarderName,
    carrierName: FobRateFixed.GeneralInfo.carrierName,
    rateType: "FOBImportOCEANFCL",
    validFrom: FobRateFixed.GeneralInfo.validFrom,
    validTo: FobRateFixed.GeneralInfo.validTo,
    originCharges: "",
    freightTransportCharges: JSON.stringify(
      FobRateFixed.FreightTransportOCEANFCL
    ),
    localCharges: JSON.stringify(FobRateFixed.locals),
  };
  return itemHelper;
}

function putItemInSimplifiedTabel_OceanFCL(curRowToAppend) {
  const params = {
    TableName: "IMPORTRatesSimplified-73q7nlgeevdp7fm4c6zv7mppee-dev",
    Item: curRowToAppend,
  };
  return docClient.put(params).promise();
}

function getRowToUpdate_FOB_OceanFCL(row, FobRateFixed, idHelperIndex) {
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

function Ignore_Getrow_OceanFCL(row, FobRateFixed, idHelperIndex) {
  let portFrom = "";
  let portTo = "";
  let transitTime = 0;
  let route = "";
  let DV20 = "";
  let DV40 = "";
  let HC40 = "";
  let otherContainers = [];

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

      case "DV20":
        DV20 = element.value;
        break;

      case "DV40":
        DV40 = element.value;
        break;

      case "HC40":
        HC40 = element.value;
        break;

      default:
        if (curField != "rowIndex") {
          otherContainers.push(element);
          break;
        }
    } // end of switch
  });

  let idHelper = FobRateFixed.rateID.concat(idHelperIndex);

  let rowToUpdate = {
    rateHash: "FOBImportOCEANFCL",
    id: idHelper,
    rateID: FobRateFixed.rateID,

    dv20: DV20,
    dv40: DV40,
    hq40: HC40,
    otherContainers: JSON.stringify(otherContainers),

    rateName: FobRateFixed.GeneralInfo.rateName,
    freightForwarderName: FobRateFixed.GeneralInfo.freightForwarderName,
    carrierName: FobRateFixed.GeneralInfo.carrierName,

    validFrom: FobRateFixed.GeneralInfo.validFrom,
    validTo: FobRateFixed.GeneralInfo.validTo,

    portFrom: portFrom,
    portTo: portTo,
    fobCharges: JSON.stringify(
      FobRateFixed.FreightTransportOCEANFCL.oceanFCLFreightFix
    ),
    localCharges: JSON.stringify(FobRateFixed.locals),
  };

  return rowToUpdate;
}

function initialParams(curRate) {
  console.log("entered InitialParams");
  let rateID = curRate.rateID;
  let GeneralInfo = curRate.GeneralInfo;
  let oceanFCLTable = JSON.parse(curRate.FreightTransportOCEANFCL.oceanFCLTable)
    .grid;
  let oceanFCLFreightFix = JSON.parse(
    curRate.FreightTransportOCEANFCL.oceanFCLFreightFix
  ).grid;
  let limits_HEAVY = {};

  let locals = {
    LocalsAirFixTable: JSON.parse(curRate.LocalsOCEANFCL.LocalsOceanFCLFixTable)
      .grid,
    LocalsOceanFCLByContainerTypeTable: JSON.parse(
      curRate.LocalsOCEANFCL.LocalsOceanFCLByContainerTypeTable
    ).grid,
    thc20: curRate.LocalsOCEANFCL.thc20,
    thc40: curRate.LocalsOCEANFCL.thc40,
  };

  let defaultPort = {
    portDefaultDestinationIsrael:
      curRate.FreightTransportOCEANFCL.portDefaultDestinationIsrael,
    trainTransIsraelAmount:
      curRate.FreightTransportOCEANFCL.trainTransIsraelAmount,
  };

  let OceanFCLFobFixed = {
    rateHash: "FOBImportOCEANFCL",
    rateID: rateID,
    GeneralInfo: curRate.GeneralInfo,
    FreightTransportOCEANFCL: {
      oceanFCLTable: oceanFCLTable,
      oceanFCLFreightFix: oceanFCLFreightFix,
      limits_HEAVY: limits_HEAVY,
    },
    limits: limits_HEAVY,
    locals: locals,
    defaultPort: defaultPort,
  };
  console.log(
    "1 -> , returning OceanFCLFobFixed To Handler From Initial.. ",
    OceanFCLFobFixed
  );
  return OceanFCLFobFixed;
}
