var AWS = require("aws-sdk");
AWS.config.update({ region: "eu-west-1" });
const docClient = new AWS.DynamoDB.DocumentClient({ region: "eu-west-1" });

exports.handler = async (event) => {
  console.log("event -> ", event);
  if (event.Records[0].eventName === "INSERT") {
    console.log("entered First If");
    console.log("NewImage -> ", event.Records[0].dynamodb.NewImage);

    let rate = event.Records[0].dynamodb.NewImage;
    let extraID = event.Records[0].eventID;
    let sharedInfo = getSharedInfo(rate, extraID);
    // sharedInfo = {rateHash,id rateID,rateName,freightForwarderName,carrierName,validFrom,validTo  }
    //rateHah === rateType
    console.log("this is shared Info from Handler -> ", sharedInfo);

    let FOBImportAIR_proccessing;
    let numOfIterations;
    let index = 0;

    switch (sharedInfo.rateHash) {
      case "FOBImportAIR":
        console.log("Inside switch.. entered FOBImportAIRLCL");

        console.log(
          "entering FOBImportAIRLCL_proccessing...",
          "rate -> ",
          rate
        );
        FOBImportAIR_proccessing = GET_FOBImportAIR_Details(rate, sharedInfo);
        // FOBImportAIRLCL_proccessing is of shape {airTableFix,  sharedInfoFix,  localCharges, freightRulesAndLimits}

        numOfIterations = FOBImportAIR_proccessing.airTableFix.length;
        console.log("FOBImportAIR_proccessing -> ", FOBImportAIR_proccessing);
        // console.log("sharedInfoFix -> ", FOBImportAIRLCL_proccessing.sharedInfoFix)
        // console.log("localChargesFix -> ", FOBImportAIRLCL_proccessing.localChargesFix)

        //numOfIterations - number of ports in this rate
        console.log("numOfIterations -> ", numOfIterations);

        for (index = 0; index < numOfIterations; index++) {
          let curRow = getRowToUpdate_FOB_AIR(
            FOBImportAIR_proccessing.airTableFix[index],
            FOBImportAIR_proccessing.sharedInfoFix,
            index,
            FOBImportAIR_proccessing.localCharges,
            FOBImportAIR_proccessing.freightRulesAndLimits
          );
          console.log("HANDLER -> curRow To Append -> ", curRow);

          await putItemInSimplifiedTabel_AIRLCL(curRow)
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
        break;

      default:
        break;
    }
  }
  return Promise.resolve("Successfully processed DynamoDB record");
};

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

function putItemInSimplifiedTabel_AIRLCL(curRow) {
  const params = {
    TableName: "IMPORTRatesSimplified-73q7nlgeevdp7fm4c6zv7mppee-dev",
    Item: curRow,
  };

  return docClient.put(params).promise();
}

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

function getSharedInfo(rate, extraID) {
  // console.log("rate -> ", rate)
  var sharedInfo = {
    rateHash: rate.rateType.S,
    id: extraID,
    rateID: rate.id.S,

    rateName: rate.rateName.S,
    freightForwarderName: rate.freightForwarderName.S,
    carrierName: rate.carrierName.S,

    // PointsOfDestination: record.dynamodb.NewImage.pointsOfDestination,
    validFrom: rate.validFrom.S,
    validTo: rate.validTo.S,
  };

  console.log("line 105 - returning sharedInfo -> ", sharedInfo);
  return sharedInfo;
}

///////////////////////////////////////////////////////////////
////////////////HELPERS FOB AIR////////////////////////////////
///////////////////////////////////////////////////////////////

function GET_FOBImportAIR_Details(rate, sharedInfo) {
  let freightTransportCharges = JSON.parse(rate.freightTransportCharges.S);

  // let freightPart = JSON.parse(rate.freightTransportCharges.S);

  let airTable = JSON.parse(JSON.parse(rate.freightTransportCharges.S).airTable)
    .grid;
  let FreightPart = JSON.parse(rate.freightTransportCharges.S);
  let freightRulesAndLimits = {
    limitHeight: FreightPart.limitHeight,
    limitWeightShippment: FreightPart.limitWeightShippment,
    limitWeightBox: FreightPart.limitWeightBox,
    airRateRatio: FreightPart.airRateRatio,
  };

  let localChargesFixPart = JSON.parse(
    JSON.parse(rate.localCharges.S).LocalsAirFixTable
  ).grid;
  let localChargesByWeightPart = JSON.parse(
    JSON.parse(rate.localCharges.S).LocalsAirByWeightTable
  ).grid;
  let Yata = JSON.parse(JSON.parse(rate.localCharges.S).yata);

  let localChargesPart = {
    localChargesFixPart: localChargesFixPart,
    localChargesByWeightPart: localChargesByWeightPart,
    Yata: Yata,
  };

  // console.log("localChargesFixPart - ", localChargesFixPart)
  // console.log("localChargesByWeightPart - ", localChargesByWeightPart)
  // console.log("Yata - ", Yata)
  // console.log("214 -- airTable -> ", airTable)

  //fixed Air Tabel
  let airTableFixedHelper = fixAirTable(airTable);
  console.log("airTableFixed -> ", airTableFixedHelper);

  let returnToHandler = {
    sharedInfoFix: sharedInfo,
    airTableFix: airTableFixedHelper,
    freightRulesAndLimits: freightRulesAndLimits,
    localCharges: localChargesPart,
  };
  return returnToHandler;
}

//helper method, slices the first rows of airTable, until the first empty row
function fixAirTable(airTable) {
  let firstEmptyRow = findFirstEmptyRowInAirTable(airTable);
  let sliced = sliceAirTable(airTable, firstEmptyRow - 1);

  console.log("this is sliced -> ", sliced);
  return sliced;
}

//helper method, findS First Empty Row In Air Table
function findFirstEmptyRowInAirTable(airTable) {
  // console.log("inside findFirstEmptyRowInAirTable, this is table recived ", AirTable)
  let i = 1;
  let firstRow = 10000;
  console.log("findFirstEmptyRowInAirTable -> this is airTable -> ", airTable);
  for (i = 1; i < airTable.length; i++) {
    let curRow = airTable[i];
    // console.log("curRow -> ", curRow)

    curRow.forEach((element) => {
      if (element.field === "portFrom" && element.value === "") {
        if (i < firstRow) {
          firstRow = i;
          return;
        }
      }
    });
  }

  console.log(
    "findFirstEmptyRowInAirTable -> first empty row in airTable-> ",
    firstRow
  );
  return firstRow;
}

//slices the airTable
//return ARRAY of first rows until first empty row
function sliceAirTable(airTable, lastRow) {
  let ans = [];
  let index = 1;
  while (index <= lastRow) {
    ans.push(airTable[index]);
    index++;
  }
  console.log("this is sliced -> ", ans);
  return ans;
}

function getRowToUpdate_FOB_AIR(
  row,
  sharedInfo,
  idHelperIndex,
  localCharges,
  freightRulesAndLimits
) {
  let portFrom = "";
  let portTo = "";
  let tt = 0;
  let route = "";
  let minWeight = 0;

  let weightsArray = [];
  let actualRates = [];
  row.forEach((element) => {
    let curField = element.field;
    switch (curField) {
      case "portFrom":
        portFrom = element.value;
        break;

      case "portTo":
        portTo = element.value;
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

  // airRateHelper = [weightsArray,actualRates]
  let airRateHelper = new Array(2);
  airRateHelper[0] = weightsArray;
  airRateHelper[1] = actualRates;

  let idHelper = sharedInfo.id.concat(idHelperIndex);

  let rowToUpdate = {
    rateHash: sharedInfo.rateHash,
    id: idHelper,
    rateID: sharedInfo.rateID,

    airRate: JSON.stringify(airRateHelper),

    rateName: sharedInfo.rateName,
    freightForwarderName: sharedInfo.freightForwarderName,
    carrierName: sharedInfo.carrierName,

    validFrom: sharedInfo.validFrom,
    validTo: sharedInfo.validTo,

    portFrom: portFrom,
    portTo: "TLV",
    fobCharges: JSON.stringify(freightRulesAndLimits),
    localCharges: JSON.stringify(localCharges),
  };

  console.log(rowToUpdate);
  return rowToUpdate;
}
