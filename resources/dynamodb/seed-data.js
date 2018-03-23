// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
var config = require("../config.json");
/* prettier-ignore */
const { TableName } = require(`../../${config.name}-client/src/outputs/dynamodb.json`);

AWS.config.update({ region: "us-east-2" });

// Create the DynamoDB service object
ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08" });

var params = {
  RequestItems: {
    [TableName]: [
      {
        PutRequest: {
          Item: {
            id: { S: "1" },
            meta: { S: "this is item 1" }
          }
        }
      },
      {
        PutRequest: {
          Item: {
            id: { S: "2" },
            meta: { S: "this is item 2" }
          }
        }
      },
      {
        PutRequest: {
          Item: {
            id: { S: "3" },
            meta: { S: "this is item 3" }
          }
        }
      },
      {
        PutRequest: {
          Item: {
            id: { S: "4" },
            meta: { S: "this is item 4" }
          }
        }
      }
    ]
  }
};

// Call DynamoDB to add the item to the table
ddb.batchWriteItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});
