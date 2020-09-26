
var AWS = require("aws-sdk");
AWS.config.update({ region: "eu-west-1" });
const documentClient = new AWS.DynamoDB.DocumentClient({ region: "eu-west-1" });

exports.handler = async (event) => {
 
  //eslint-disable-line
  // console.log("xxyyxx -> ",event.Records[0].dynamodb.NewImage.info.S);
  
  // console.log("pendingid -> ", pendingId)
  if(event.Records[0].eventName === "INSERT"){
    try{
      
      let record = event.Records[0].dynamodb.NewImage
      let requestID = JSON.parse(record.info.S).requestID 
      let tableName = event.Records[0].dynamodb.NewImage.__typename.S
    
      console.log("this is tableName -> ", tableName)
      switch (tableName) {
        case 'ShipmentsOnGoing':
            let pendingId1 = JSON.parse(event.Records[0].dynamodb.NewImage.info.S).pendingiD
            await updatePendingTable(pendingId1).then(x=>{
                  console.log("x -> ", x)
                  })
          break;
          
        case 'DeclinedRFQ':
           let pendingId2 = JSON.parse(event.Records[0].dynamodb.NewImage.info.S).pendingiD
            await updatePendingTable(pendingId2).then(x=>{
                  console.log("x -> ", x)
                  })
          break;
          // DeclinedRFQ(event.Records[0].dynamodb.NewImage)
          break
          
        default:
          break
      }
    } catch(err){
      console.log("error -> ", err)
    }
}
  return Promise.resolve("Successfully processed DynamoDB record");
};
  



//actually deleting the pending from pending table
async function updatePendingTable(PendingID){
  console.log("requestID -> ", PendingID)
  console.log("starting to delete..")
    
  return(
       documentClient.delete({
          TableName: 'PendingRequests-73q7nlgeevdp7fm4c6zv7mppee-dev',
          Key: {
            id: PendingID 
            }
           })
            .promise()
      )
}
 
  // var params = {
  //     TableName : 'PendingRequests-73q7nlgeevdp7fm4c6zv7mppee-dev',
  //     Key: {
  //       id: PendingID,
  //       NumberRangeKey: 1
  //     }
  // };