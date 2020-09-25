
var AWS = require("aws-sdk");
AWS.config.update({ region: "eu-west-1" });
const documentClient = new AWS.DynamoDB.DocumentClient({ region: "eu-west-1" });

exports.handler = async (event) => {
 
  
  //eslint-disable-line
  console.log(event.Records[0]);
  if(event.Records[0].eventName === "INSERT"){
    try{
      
      let record = event.Records[0].dynamodb.NewImage
      let requestID = JSON.parse(record.info.S).requestID 
      let tableName = event.Records[0].dynamodb.NewImage.__typename.S
    
      console.log("this is tableName -> ", tableName)
      switch (tableName) {
        case 'ShipmentsOnGoing':
            await updatePendingTable(0).then(x=>{
                  console.log("x -> ", x)
                  })
          
          break;
        case 'DeclinedRFQ':
          DeclinedRFQ(event.Records[0].dynamodb.NewImage)
          break
        default:
          break
      }
    } catch(err){
      console.log("error -> ", err)
    }
    
    
 
  // }
  return Promise.resolve("Successfully processed DynamoDB record");
};
  
  //also appends offer accepted
function ShipmentsOnGoing(record){
  
  console.log("this is record -> " , record)
  
  updatePendingTable(requestID)
  
}

function DeclinedRFQ(record){
   let pendingId = ""
  updatePendingTable(pendingId)
}

//actually deleting the pending from pending table
async function updatePendingTable(requestID){
  console.log("requestID -> ", requestID)
  
  var params = {
      TableName : 'PendingRequests-73q7nlgeevdp7fm4c6zv7mppee-dev',
      Key: {
        id: "123",
        NumberRangeKey: 1
      }
  };

  
  console.log("starting to delete..")
    
  return(documentClient.delete({
    TableName: 'PendingRequests-73q7nlgeevdp7fm4c6zv7mppee-dev',
    Key: {
      id: '123' 
    }
  })
  .promise()
  )
}