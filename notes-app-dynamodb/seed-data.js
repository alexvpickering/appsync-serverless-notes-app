// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-2" });
const { TableName } = require("../notes-app-client/src/outputs/dynamodb.json");

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
