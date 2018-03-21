var AWS = require("aws-sdk");

exports.graphqlHandler = (event, context, callback) => {
  console.log("Received field {}", JSON.stringify(event.field, null, 2));

  if (event.field === "content") {
    getS3Content(callback);
  } else {
    callback(null, event);
  }
};

const getS3Content = callback => {
  var s3 = new AWS.S3();
  s3.getObject(
    { Bucket: "notes-app-s3-prod-assets2", Key: "item.json" },
    function(error, data) {
      if (error != null) {
        console.log("Failed to retrieve an object: " + error);
      } else {
        console.log("Loaded " + data.ContentLength + " bytes");
        // Convert Body from a Buffer to a String
        let result = data.Body.toString("utf-8"); // Use the encoding necessary
        console.log(result);

        callback(null, result);
      }
    }
  );
};
