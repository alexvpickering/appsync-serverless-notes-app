const AWS = require("aws-sdk");
const config = require("../config.json");
const { Bucket } = require(`../../${config.name}-client/src/outputs/s3.json`);

module.exports.graphqlHandler = (event, context, callback) => {
  if (event.field === "content") {
    getS3Content(callback);
  } else {
    callback(null, event);
  }
};

const getS3Content = callback => {
  const s3 = new AWS.S3();
  s3.getObject({ Bucket, Key: "item.json" }, function(error, data) {
    if (error != null) {
      console.log("Failed to retrieve an object: " + error);
    } else {
      console.log("Loaded " + data.ContentLength + " bytes");
      // Convert Body from a Buffer to a String
      let result = data.Body.toString("utf-8"); // Use the encoding necessary
      console.log(result);

      callback(null, result);
    }
  });
};
