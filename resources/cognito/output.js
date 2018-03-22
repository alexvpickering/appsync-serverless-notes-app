var exec = require("child_process").exec;
var config = require("../config.json");

function handler(data, serverless, options) {
  console.log("Received Stack Output", data);
  // create test user
  exec(
    `
      aws cognito-idp sign-up \
      --region us-east-2 \
      --client-id ${data.UserPoolClientId} \
      --username ${config.email} \
      --password ${config.password} && \

    aws cognito-idp admin-confirm-sign-up \
      --region us-east-2 \
      --user-pool-id ${data.UserPoolId} \
      --username ${config.email}
  `
  );
}

module.exports = { handler };
