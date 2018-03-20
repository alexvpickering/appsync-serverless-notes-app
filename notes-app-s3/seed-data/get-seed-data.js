var AWS = require("aws-sdk");

var s3 = new AWS.S3();
s3.getObject(
  { Bucket: "notes-app-s3-prod-assets2", Key: "item.json" },
  function(error, data) {
    if (error != null) {
      console.log("Failed to retrieve an object: " + error);
    } else {
      console.log("Loaded " + data.ContentLength + " bytes");
      // Convert Body from a Buffer to a String
      let objectData = data.Body.toString("utf-8"); // Use the encoding necessary
      console.log(objectData);
      // do something with data.Body
    }
  }
);
