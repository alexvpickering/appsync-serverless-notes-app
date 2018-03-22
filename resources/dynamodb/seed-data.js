// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
var config = require("../config.json");
/* prettier-ignore */
const { TableName } = require(`../../${config.name}-client/src/outputs/dynamodb.json`);

AWS.config.update({ region: "us-east-2" });

// Create the DynamoDB service object
ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08" });

var params = {
  TableName,
  Item: {
    id: { S: "1234" },
    meta: { S: "some added info" }
  }
};

console.log(params);

// Call DynamoDB to add the item to the table
ddb.putItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});
