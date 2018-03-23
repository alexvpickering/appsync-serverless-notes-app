// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
var config = require("../config.json");
const S3Outputs = require(`../../${config.name}-client/src/outputs/s3.json`);

// Set the region
AWS.config.update({ region: S3Outputs.Region });

// Create S3 service object
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

// call S3 to retrieve upload file to specified bucket

const S3Objects = [
  { content: "I am S3 Object 1" },
  { content: "I am S3 Object 2" },
  { content: "I am S3 Object 3" },
  { content: "I am S3 Object 4" }
];

S3Objects.forEach((S3Object, i) => {
  const uploadParams = {
    Bucket: S3Outputs.Bucket,
    Key: `${i + 1}.json`,
    Body: JSON.stringify(S3Object)
  };

  // call S3 to retrieve upload file to specified bucket
  s3.upload(uploadParams, function(err, data) {
    if (err) {
      console.log("Error", err);
    }
    if (data) {
      console.log("Upload Success", data.Location);
    }
  });
});
