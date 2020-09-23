var AWS = require("aws-sdk");
AWS.config.update({ region: "eu-west-1" });
const docClient = new AWS.DynamoDB.DocumentClient({ region: "eu-west-1" });

exports.handler = async (event) => {
  if (event.Records[0].eventName === "INSERT") {
    console.log(event.Records[0].dynamodb.NewImage);

    let rate = event.Records[0].dynamodb.NewImage;
    let extraID = event.Records[0].eventID;
    let sharedInfo = getSharedInfo(rate, extraID);
    // sharedInfo = {rateHash,id rateID,rateName,freightForwarderName,carrierName,validFrom,validTo  }
    //rateHah === rateType

    let FOBImportAIRLCL_proccessing;
    let numOfIterations;
    let index = 0;

    switch (sharedInfo.rateHash) {
      case "FOBImportAIRLCL":
        console.log("Inside switch.. entered FOBImportAIRLCL");

        console.log(
          "entering FOBImportAIRLCL_proccessing...",
          "rate -> ",
          rate
        );
        FOBImportAIRLCL_proccessing = GET_FOBImportAIRLCL_Details(
          rate,
          sharedInfo
        );
        // FOBImportAIRLCL_proccessing is of shape {airTableFix, sharedInfoFix, localChargesFix, fobRules}

        numOfIterations = FOBImportAIRLCL_proccessing.airTableFix.length;
        // console.log("airTableFix -> ", FOBImportAIRLCL_proccessing.airTableFix)
        // console.log("sharedInfoFix -> ", FOBImportAIRLCL_proccessing.sharedInfoFix)
        // console.log("localChargesFix -> ", FOBImportAIRLCL_proccessing.localChargesFix)

        //numOfIterations - number of ports in this rate
        console.log("numOfIterations -> ", numOfIterations);

        for (index = 0; index < numOfIterations; index++) {
          let curRow = getRowToUpdate_FOB_AIRLCL(
            FOBImportAIRLCL_proccessing.airTableFix[index],
            FOBImportAIRLCL_proccessing.sharedInfoFix,
            index,
            FOBImportAIRLCL_proccessing.localChargesFix,
            FOBImportAIRLCL_proccessing.fobRules
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

  return sharedInfo;
}

function getRowToUpdate_FOB_AIRLCL(
  row,
  sharedInfo,
  idHelperIndex,
  localCharges,
  fobRules
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
    portTo: portTo,
    fobCharges: JSON.stringify(fobRules),
    localCharges: JSON.stringify(localCharges),
  };

  // console.log(rowToUpdate)
  return rowToUpdate;
}

//////////////////////////////////////////////////////
////////////////HELPERS///////////////////////////////
//////////////////////////////////////////////////////

function GET_FOBImportAIRLCL_Details(rate, sharedInfo) {
  let freightTransportCharges = JSON.parse(rate.freightTransportCharges.S);
  console.log(
    "FUNCTION GET_FOBImportAIRLCL_Details !! freightTransportCharges --> ",
    freightTransportCharges
  );

  let freightPart = JSON.parse(rate.freightTransportCharges.S);

  console.log("rate -> ", rate);
  let localChargesPart = JSON.parse(rate.localCharges.S).additionalCharges;

  let airTable = JSON.parse(rate.freightTransportCharges.S).airTable;
  let helperxxx = new Array(airTable);
  let realAirTable = JSON.parse(helperxxx[0]);

  let airTableRules = JSON.parse(rate.freightTransportCharges.S).rules;
  let helperyyy = new Array(airTableRules);
  let realAirTableRules = JSON.parse(helperyyy[0]);

  let indexRules = 0;
  let ansRules = [];
  for (
    indexRules = 0;
    indexRules < realAirTableRules.grid.length;
    indexRules++
  ) {
    ansRules.push(realAirTableRules.grid[indexRules]);
  }

  console.log(
    "FUNCTION GET_FOBImportAIRLCL_Details !!ansRules   -> ",
    ansRules
  );

  //fixed Air Tabel
  let airTableFixedHelper = fixAirTable(realAirTable);
  // console.log("airTableFixed -> ", airTableFixed)

  let returnToHandler = {
    airTableFix: airTableFixedHelper,
    sharedInfoFix: sharedInfo,
    localChargesFix: localChargesPart,
    fobRules: ansRules,
  };
  return returnToHandler;
}

//helper method, slices the first rows of airTable, until the first empty row
function fixAirTable(airTable) {
  let firstEmptyRow = findFirstEmptyRowInAirTable(airTable);
  let sliced = sliceAirTable(airTable, firstEmptyRow - 1);

  // console.log("this is sliced -> ", sliced)
  return sliced;
}

//helper method, findS First Empty Row In Air Table
function findFirstEmptyRowInAirTable(airTable) {
  // console.log("inside findFirstEmptyRowInAirTable, this is table recived ", AirTable)
  let i = 1;
  let firstRow = 10000;
  console.log(
    "findFirstEmptyRowInAirTable -> this is airTable -> ",
    airTable.grid
  );
  for (i = 1; i < airTable.grid.length; i++) {
    let curRow = airTable.grid[i];
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
    ans.push(airTable.grid[index]);
    index++;
  }
  return ans;
}
