const AWS = require("aws-sdk");
const config = require("../config.json");
const { Bucket } = require(`../../${config.name}-client/src/outputs/s3.json`);

module.exports.graphqlHandler = (event, context, callback) => {
  // console.log(JSON.stringify(event, undefined, 2));
  if (event.field === "content") {
    getS3Content(callback, event);
  } else {
    callback(null, event);
  }
};

const getS3Content = (callback, event) => {
  const s3 = new AWS.S3();
  s3.getObject({ Bucket, Key: `${event.context.source.id}.json` }, function(
    error,
    data
  ) {
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
